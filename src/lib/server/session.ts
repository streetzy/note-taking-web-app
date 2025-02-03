import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { User, Session, type IUser } from "$lib/models/models";
import type { RequestEvent } from "@sveltejs/kit";
import type { _IUser } from "./user";

export async function validate_session_token(token: string) {
  const session_data = await Session.findOne({ token })
    .populate({
      path: "user",
      select: "email username",
    })
    .exec();

  if (!session_data) {
    return { session: null, user: null };
  }

  const user_data = await User.findById(session_data.user).exec();

  if (!user_data) {
    return { session: null, user: null };
  }

  const session: _ISession = {
    id: session_data._id.toString(),
    user_id: session_data.user.toString(),
    expires_at: new Date(session_data.expires_at * 1000),
  };

  const user: _IUser = {
    id: user_data._id.toString(),
    email: user_data.email.toString(),
    username: user_data.username.toString(),
    avatar_image: user_data.avatar_image.toObject(),
  };

  if (Date.now() >= session.expires_at.getTime()) {
    await Session.findByIdAndDelete(session.id);
    return { session: null, user: null };
  }

  if (Date.now() >= session.expires_at.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    session_data.expires_at = Math.floor(session.expires_at.getTime() / 1000);
    await session_data.save();
  }

  return { session, user };
}

export async function invalidate_session(session_id: string) {
  await Session.findByIdAndDelete(session_id).exec();
}

export async function invalidate_user_sessions(user_id: string) {
  await Session.deleteMany({ user: user_id }).exec();
}

export function set_session_token_cookie(
  event: RequestEvent,
  token: string,
  expires_at: Date
) {
  event.cookies.set("session", token, {
    httpOnly: true,
    path: "/",
    secure: import.meta.env.PROD || false,
    sameSite: "lax",
    expires: expires_at,
  });
}

export function delete_session_token_cookie(event: RequestEvent) {
  event.cookies.set("session", "", {
    httpOnly: true,
    path: "/",
    secure: import.meta.env.PROD || false,
    sameSite: "lax",
    maxAge: 0,
  });
}

export function generate_session_token() {
  const token_bytes = new Uint8Array(20);
  crypto.getRandomValues(token_bytes);
  const token = encodeBase32LowerCaseNoPadding(token_bytes).toLowerCase();
  return token;
}
export async function create_session(user_id: string) {
  const token = generate_session_token();
  const session = new Session({
    user: user_id,
    token,
    expires_at: Math.floor(
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).getTime() / 1000
    ),
  });

  await session.save();
  return session;
}

export interface _ISession {
  id: string;
  expires_at: Date;
  user_id: string;
}
