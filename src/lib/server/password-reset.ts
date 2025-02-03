import { Password_reset_session, Session, User } from "$lib/models/models";
import { generateRandomOTP } from "$lib/utils/utils";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import type { RequestEvent } from "@sveltejs/kit";
import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "$env/static/private";
import { generate_session_token } from "./session";
import type { _IUser } from "./user";

export async function create_password_reset_session(
  user_id: string,
  email: string
) {
  const token = generate_session_token();
  const session = new Password_reset_session({
    user: user_id,
    token: token,
    email,
    code: generateRandomOTP(),
    expires_at: Math.floor(Date.now() / 1000) + 10 * 60,
  });
  await session.save();
  return session;
}

export async function validate_password_reset_session_token(token: string) {
  const session_data = await Password_reset_session.findOne({ token }).exec();
  if (!session_data) {
    return { session: null, user: null };
  }

  const user_data = await User.findById(session_data.user).exec();
  if (!user_data) {
    return { session: null, user: null };
  }

  if (Date.now() / 1000 >= session_data.expires_at) {
    await Password_reset_session.findByIdAndDelete(session_data._id).exec();
    return { session: null, user: null };
  }

  if (Date.now() / 1000 >= session_data.expires_at - 60 * 60 * 24 * 15) {
    session_data.expires_at = Date.now() / 1000 + 60 * 60 * 24 * 30;
    await session_data.save();
  }

  const session: _IPasswordResetSession = {
    id: session_data._id.toString(),
    user_id: session_data.user.toString(),
    email: session_data.email,
    code: session_data.code,
    expires_at: new Date(session_data.expires_at * 1000),
  };

  const user: _IUser = {
    id: user_data._id.toString(),
    email: user_data.email.toString(),
    username: user_data.username.toString(),
    avatar_image: user_data.avatar_image.toObject(),
  };

  return { session, user };
}

export async function invalidate_password_reset_session(pw_session_id: string) {
  await Password_reset_session.findByIdAndDelete(pw_session_id).exec();
}

export async function invalidate_user_password_reset_sessions(user_id: string) {
  await Password_reset_session.deleteMany({ user: user_id }).exec();
}

export async function validate_password_reset_session_request(
  event: RequestEvent
) {
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

export function set_password_reset_session_token_cookie(
  event: RequestEvent,
  token: string,
  expires_at: Date
) {
  event.cookies.set("password_reset_session", token, {
    expires: expires_at,
    sameSite: "lax",
    httpOnly: true,
    path: "/",
    secure: import.meta.env.PROD || false,
  });
}

export function delete_password_reset_session_token_cookie(
  event: RequestEvent
) {
  event.cookies.set("password_reset_session", "", {
    maxAge: 0,
    sameSite: "lax",
    httpOnly: true,
    path: "/",
    secure: import.meta.env.PROD || false,
  });
}

export function send_password_reset_email(email: string, code: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Password reset",
    text: `Hi, here's your password reset code: ${code}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export interface _IPasswordResetSession {
  id: string;
  user_id: string;
  code: string;
  email: string;
  expires_at: Date;
}
