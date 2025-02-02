import {
  get_filtered_posts,
  get_filtered_posts_count,
  get_post_count,
  get_posts,
} from "$lib/server/post.js";
import { redirect } from "@sveltejs/kit";

export async function load({ url, locals }) {
  const limit = Number(url.searchParams.get("limit")) || 10;
  const skip = Number(url.searchParams.get("skip")) || 0;

  const search_bar_value = url.searchParams.get("query") || "";

  let posts;
  let document_count;

  if (search_bar_value.trim() !== "") {
    posts = await get_filtered_posts(limit, skip, search_bar_value);

    document_count = await get_filtered_posts_count(search_bar_value);
  } else {
    posts = await get_posts(limit, skip);
    document_count = await get_post_count();
  }

  if (posts === null) {
    return {};
  }

  return { posts, document_count, search_bar_value };
}
