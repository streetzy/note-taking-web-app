import { fail, redirect, type RequestEvent } from "@sveltejs/kit";
import {
  check_email_availability,
  verify_email_input,
} from "$lib/server/email";
import { create_user, verify_username_input } from "$lib/server/user";
import { create_session, set_session_token_cookie } from "$lib/server/session";
import { Session } from "$lib/models/models.js";
import { check_username_availability } from "$lib/server/username.js";

export const actions = {
  default: action,
};

async function action(event: RequestEvent) {
  const form_data = await event.request.formData();
  const email = form_data.get("email");
  const username = form_data.get("username");
  const password = form_data.get("password");

  if (
    typeof email !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    return fail(400, {
      error: "Invalid or missing fields",
    });
  }

  if (email === "" || password === "" || username === "") {
    return fail(400, {
      error: "Please enter the required information",
    });
  }

  if (!verify_email_input(email)) {
    return fail(400, {
      error: "Invalid email",
    });
  }

  const email_available = await check_email_availability(email);
  if (!email_available) {
    return fail(400, {
      error: "Email already in use",
    });
  }

  if (!verify_username_input(username)) {
    return fail(400, {
      error: "Invalid username",
    });
  }

  const username_available = await check_username_availability(username);
  if (!username_available) {
    return fail(400, {
      error: "Username already in use",
    });
  }

  const user = await create_user(email, username, password);
  const _session = await create_session(user.id.toHexString());
  set_session_token_cookie(
    event,
    _session.token,
    new Date(_session.expires_at * 1000)
  );

  return redirect(302, "/");
}
