import { verify_email_input } from "$lib/server/email.js";
import {
  create_password_reset_session,
  invalidate_user_password_reset_sessions,
  send_password_reset_email,
  set_password_reset_session_token_cookie,
} from "$lib/server/password-reset.js";
import { generate_session_token } from "$lib/server/session.js";
import { get_user_from_email } from "$lib/server/user.js";
import { fail, redirect, type RequestEvent } from "@sveltejs/kit";

export const actions = {
  default: action,
};

async function action(event: RequestEvent) {
  const form_data = await event.request.formData();
  const email = form_data.get("email");
  if (typeof email !== "string") {
    return fail(400, {
      message: "Invalid or missing fields",
      email: "",
    });
  }

  if (!verify_email_input(email)) {
    return fail(400, {
      message: "Invalid email",
      email,
    });
  }

  const user = await get_user_from_email(email);
  if (user === null) {
    return fail(400, {
      message: "User doesn't exist",
      email,
    });
  }

  invalidate_user_password_reset_sessions(user.id.toHexString());

  const session = await create_password_reset_session(
    user.id.toHexString(),
    user.email.toString()
  );
  send_password_reset_email(session.email.toString(), session.code.toString()); // we don't talk about the .toString() incident, nothing happened here

  set_password_reset_session_token_cookie(
    event,
    session.token,
    new Date(session.expires_at * 1000)
  );
  throw redirect(302, "/forgot-password-success");
}
