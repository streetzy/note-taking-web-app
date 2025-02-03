import { User } from "$lib/models/models.js";
import {
  delete_password_reset_session_token_cookie,
  invalidate_user_password_reset_sessions,
  validate_password_reset_session_request,
} from "$lib/server/password-reset";
import {
  create_session,
  generate_session_token,
  invalidate_user_sessions,
  set_session_token_cookie,
} from "$lib/server/session.js";
import { update_user_password } from "$lib/server/user.js";
import { fail, redirect, type RequestEvent } from "@sveltejs/kit";

export async function load(event: RequestEvent) {
  const { session } = await validate_password_reset_session_request(event);
  console.log(session);

  if (session === null) {
    return redirect(302, "/forgot-password");
  }

  return {};
}

export const actions = {
  default: action,
};

async function action(event: RequestEvent) {
  const { session } = await validate_password_reset_session_request(event);

  if (session === null) {
    return fail(401, {
      message: "Not authenticated",
    });
  }

  const form_data = await event.request.formData();
  const code = form_data.get("code");
  const password = form_data.get("password");
  const confirmed_password = form_data.get("password");
  if (typeof code !== "string") {
    return fail(400, {
      message: "Invalid or missing fields",
    });
  }

  if (code === "") {
    return fail(400, {
      message: "Please enter the code",
    });
  }

  if (code !== session.code) {
    return fail(400, {
      message: "Incorrect code",
    });
  }

  if (typeof password !== "string") {
    return fail(400, {
      message: "Invalid or missing fields",
    });
  }

  if (password !== confirmed_password) {
    return fail(400, {
      message: "Passwords don't match",
    });
  }

  await invalidate_user_password_reset_sessions(session.user_id);
  await invalidate_user_sessions(session.user_id);
  await update_user_password(session.user_id, password);

  const _session = await create_session(session.user_id);
  set_session_token_cookie(
    event,
    _session.token,
    new Date(_session.expires_at * 1000)
  );
  delete_password_reset_session_token_cookie(event);

  return redirect(302, "/login");
}
