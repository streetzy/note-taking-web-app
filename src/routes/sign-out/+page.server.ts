import {
  delete_session_token_cookie,
  invalidate_session,
} from "$lib/server/session";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoadEvent } from "./$types";

export async function load(event: PageServerLoadEvent) {
  if (event.locals.session === null) {
    throw fail(401, {
      message: "Not authenticated",
    });
  }

  await invalidate_session(event.locals.session.id);
  delete_session_token_cookie(event);
  throw redirect(302, "/");
}
