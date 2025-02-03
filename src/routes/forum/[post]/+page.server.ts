import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { get_post } from "$lib/server/post";
import { get_comments, add_comment_to_post } from "$lib/server/comment";

export const load: PageServerLoad = async ({ params, locals }) => {
  const post_info = await get_post(params.post);

  const comments = await get_comments(params.post);

  return { post_info, comments };
};

export const actions = {
  default: async ({ params, locals, request }) => {
    if (locals.user === null) {
      throw redirect(302, "/login");
    }

    const form_data = await request.formData();
    const comment = form_data.get("comment");

    if (typeof comment !== "string") {
      return fail(400, {
        error: "Invalid or missing field",
      });
    }

    if (comment.length === 0) {
      return fail(400, {
        error: "Can't be empty",
      });
    }

    await add_comment_to_post(
      locals.user.id,
      locals.user.username,
      params.post,
      comment
    );

    throw redirect(302, `/forum/${params.post}`);
  },
};
