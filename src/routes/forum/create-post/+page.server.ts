import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { create_post } from "$lib/server/post";

export const load: PageServerLoad = async ({ params, locals }) => {};

export const actions = {
  default: async ({ params, locals, request }) => {
    if (locals.user === null) {
      return redirect(302, "/login");
    }

    const form_data = await request.formData();
    const post_name = form_data.get("post-name");
    const post_description = form_data.get("post-description");
    const qol_tag = form_data.get("qol-tag");
    const bug_tag = form_data.get("bug-tag");
    const help_tag = form_data.get("help-tag");
    const tags = [];

    if (typeof post_name !== "string" || typeof post_description !== "string") {
      return fail(400, {
        message: "Invalid or missing fields",
      });
    }

    if (post_name.length === 0 || post_description.length === 0) {
      return fail(400, {
        message: "Can't be empty",
      });
    }

    if (qol_tag) tags.push("#qol");
    if (bug_tag) tags.push("#bug");
    if (help_tag) tags.push("#help");

    await create_post(
      locals.user.id,
      post_name.trim(),
      post_description.trim(),
      tags
    );

    return redirect(302, `/forum`);
  },
};
