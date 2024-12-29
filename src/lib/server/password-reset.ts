import { Password_reset_session, Session, User } from "$lib/models/models";
import { generateRandomOTP } from "$lib/utils/utils";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import type { RequestEvent } from "@sveltejs/kit";
import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "$env/static/private";

export async function create_password_reset_session(token: string, user_id: string, email: string) {
    const wanted_session = await Session.findOne({ token })

    const session = new Password_reset_session({
        id: wanted_session._id,
        user_id,
        email,
        expires_at: new Date(Date.now() + 1000 * 60 * 10),
        code: generateRandomOTP()
    });
    await session.save();
    return session;
}

export async function validate_password_reset_session_token(token: string) {
    const wanted_session = await Session.findOne({ token });
    const session = await Password_reset_session.findById(wanted_session._id).exec();
    if (!session) {
        return { session: null, user: null};
    }

    const user = await User.findById(session.user).exec();
    if (!user) {
        return { session: null, user: null };
    }

    if (Date.now() >= session.expires_at * 1000) {
        await Password_reset_session.findByIdAndDelete(wanted_session._id).exec();
        return { session: null, user: null };
    }

    return {
        session: {
            id: session._id.toString(),
            user_id: session.user.toString(),
            email: session.email,
            expires_at: new Date(session.expires_at * 1000),
            code: session.code
        },

        user: {
            id: user._id.toString(),
            email: user.email,
            username: user.username
        }
    }
}

export async function invalidate_user_password_reset_sessions(user_id: string) {
    await Password_reset_session.deleteMany({ user: user_id}).exec();
}

export async function validate_password_reset_session_request(event: RequestEvent ) {
    const token = event.cookies.get("password_reset_session") ?? null;
    if (!token) {
        return { session: null, user: null };
    }

    const result = await validate_password_reset_session_token(token);

    if (result.session === null) {
        delete_password_reset_session_token_cookie(event);
    }
    return result;
}

export function set_password_reset_session_token_cookie(event: RequestEvent, token: string, expires_at: Date) {
    event.cookies.set("password_reset_session", token, {
        expires: expires_at,
        sameSite: "lax",
        httpOnly: true,
        path: "/",
        secure: !import.meta.env.DEV
    });
}

export function delete_password_reset_session_token_cookie(event: RequestEvent) {
    event.cookies.set("password_reset_session", "", {
        maxAge: 0,
        sameSite: "lax",
        httpOnly: true,
        path: "/",
        secure: !import.meta.env.DEV
    })
}

export function send_password_reset_email(email: string, code: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    });

    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: "Password reset",
        text: `Hi, here's your password reset code: ${code}`
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    })
}