import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, RequestEvent } from "./$types";
import { update_notebook_name } from "$lib/server/notebooks";

export const load: PageServerLoad = async ({ params, locals }) => {
  if (locals.user === null) {
    return redirect(302, "login");
  }

  return { notebook_id: params.notebook };
};

export const actions = {
  submit: action,
};

async function action(event: RequestEvent) {
  const form_data = await event.request.formData();
  const renamed_notebook = form_data.get("renamed-notebook");

  if (event.locals.user === null) {
    return redirect(302, "/login");
  }

  if (typeof renamed_notebook !== "string") {
    return fail(400, { message: "Invalid input" });
  }

  update_notebook_name(
    event.locals.user!.id,
    event.params.notebook,
    renamed_notebook
  );

  return redirect(302, "/notebooks");
}
