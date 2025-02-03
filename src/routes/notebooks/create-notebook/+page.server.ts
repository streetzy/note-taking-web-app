import { create_notebook } from "$lib/server/notebooks.js";
import { redirect, fail, type RequestEvent } from "@sveltejs/kit";

export const actions = {
  submit: action,
};

async function action(event: RequestEvent) {
  if (event.locals.session === null || event.locals.user === null) {
    return fail(401, {
      message: "Not authenticated",
    });
  }

  const form_data = await event.request.formData();
  const notebook_name = form_data.get("notebook-name");

  if (typeof notebook_name !== "string") {
    return fail(400, {
      message: "Invalid or missing fields",
    });
  }

  if (notebook_name.length === 0) {
    return fail(400, {
      message: "Notebook must have a name",
    });
  }

  create_notebook(notebook_name, event.locals.user.id);

  return redirect(302, "/notebooks");
}
