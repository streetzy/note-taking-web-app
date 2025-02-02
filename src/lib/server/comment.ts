import { Comment, Post } from "$lib/models/models";

export async function add_comment_to_post(
  user_id: string,
  username: string,
  post_id: string,
  message: string
) {
  const post = await Post.findById(post_id).exec();

  if (!post) return null;

  const comment_data = new Comment({
    author_id: user_id,
    author_name: username,
    parent_post: post_id,
    message: message,
  });

  await comment_data.save();

  post.comments.push(comment_data._id);
  await post.save();
}

export async function get_comments(post_id: string) {
  const post = await Post.findById(post_id).exec();

  if (!post) return;

  const comments = await Comment.find({ parent_post: post_id }).exec();

  const post_comments = comments.map((comment) => {
    return {
      author_name: comment.author_name,
      message: comment.message,
    };
  });

  return post_comments;
}
