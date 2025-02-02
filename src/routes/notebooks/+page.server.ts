import { User } from "$lib/models/models";
import { get_user_notebooks } from "$lib/server/notebooks";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoadEvent } from "./$types";

export async function load(event: PageServerLoadEvent) {
  if (event.locals.user === null) {
    return redirect(302, "/login");
  }

  const user_notebooks = await get_user_notebooks(event.locals.user.id);

  if (user_notebooks === null) {
    return {};
  }

  return { user_notebooks };
}
