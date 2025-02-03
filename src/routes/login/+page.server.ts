import { verify_email_input } from "$lib/server/email";
import { verify_password_hash } from "$lib/server/password.js";
import {
  create_session,
  generate_session_token,
  set_session_token_cookie,
} from "$lib/server/session.js";
import {
  get_user_from_email,
  get_user_password_hash,
} from "$lib/server/user.js";
import { fail, redirect, type RequestEvent } from "@sveltejs/kit";

export const actions = {
  default: action,
};

async function action(event: RequestEvent) {
  const form_data = await event.request.formData();
  const email = form_data.get("email");
  const password = form_data.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return fail(400, {
      message: "Invalid or missing fields",
    });
  }

  if (!verify_email_input(email)) {
    return fail(400, {
      message: "Invalid email",
    });
  }

  const user = await get_user_from_email(email);

  if (user === null) {
    return fail(400, {
      message: "Account doesn't exist",
    });
  }

  const password_hash = await get_user_password_hash(user.id.toHexString());
  const valid_pw = await verify_password_hash(
    password_hash.toString(),
    password
  ); // again, we do not mention me using String instead of string and then just being lazy
  if (!valid_pw) {
    return fail(400, {
      message: "Invalid password",
    });
  }

  const _session = await create_session(user.id.toHexString());
  set_session_token_cookie(
    event,
    _session.token,
    new Date(_session.expires_at * 1000)
  );
  return redirect(302, "/");
}
