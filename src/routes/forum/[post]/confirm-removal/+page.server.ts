import { remove_post } from "$lib/server/post";
import { redirect } from "@sveltejs/kit";

export const actions = {
  submit: async ({ params, locals }) => {
    if (locals.user === null) {
      return redirect(302, "/login");
    }

    await remove_post(locals.user.id, params.post);

    return redirect(302, `/forum/my-posts`);
  },
};
