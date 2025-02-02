import { get_user_post_count, get_user_posts } from "$lib/server/post";
import { redirect } from "@sveltejs/kit";

export async function load({ url, locals }) {
  if (locals.user === null) {
    return redirect(302, "/login");
  }

  const limit = Number(url.searchParams.get("limit")) || 10;
  const skip = Number(url.searchParams.get("skip")) || 0;

  const posts = await get_user_posts(locals.user.username, limit, skip);

  if (posts === null) {
    return {};
  }

  const document_count = await get_user_post_count(locals.user.username);

  return { posts, document_count };
}
