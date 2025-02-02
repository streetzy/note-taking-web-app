import { Post, User } from "$lib/models/models";

export async function get_post(post_id: string) {
  const post = await Post.findById(post_id).exec();

  const post_info: {
    title: string;
    content: string;
    author_name: string;
    created_at: string;
    tags: string[];
  } = {
    title: post.title,
    content: post.content,
    author_name: post.author_name,
    created_at: new Date(post.created_at).toISOString().split("T")[0],
    tags: post.tags,
  };

  return post_info;
}

export async function get_filtered_posts(
  limit: number,
  skip: number,
  search_bar_value: string
) {
  const trimmed_search = search_bar_value.trim();
  const regex_search = new RegExp(trimmed_search, "i");
  const filtered_posts = await Post.find({
    $or: [
      { title: regex_search },
      { content: regex_search },
      { author_name: regex_search },
      { tags: regex_search },
    ],
  })
    .limit(limit)
    .skip(skip)
    .exec();

  const filtered_post_info: {
    post_id: string;
    title: string;
    author_name: string;
    tags: string[];
  }[] = filtered_posts.map(
    (filtered_post: {
      _id: string;
      title: string;
      author_name: string;
      tags: string[];
    }) => {
      return {
        post_id: filtered_post._id.toString(),
        title: filtered_post.title,
        author_name: filtered_post.author_name,
        tags: filtered_post.tags,
      };
    }
  );
  return filtered_post_info;
}

export async function get_filtered_posts_count(search_bar_value: string) {
  const trimmed_search = search_bar_value.trim();
  const regex_search = new RegExp(trimmed_search, "i");
  const filtered_post_count = await Post.countDocuments({
    $or: [
      { title: regex_search },
      { content: regex_search },
      { author_name: regex_search },
      { tags: regex_search },
    ],
  }).exec();

  return filtered_post_count;
}

export async function get_posts(limit: number, skip: number) {
  const posts = await Post.find({}).limit(limit).skip(skip).exec();

  const posts_info: {
    post_id: string;
    title: string;
    author_name: string;
    tags: string[];
  }[] = posts.map(
    (post: {
      _id: string;
      title: string;
      author_name: string;
      tags: string[];
    }) => {
      return {
        post_id: post._id.toString(),
        title: post.title,
        author_name: post.author_name,
        tags: post.tags,
      };
    }
  );

  return posts_info;
}

export async function get_post_count() {
  return await Post.countDocuments();
}

export async function get_user_posts(
  username: string,
  limit: number,
  skip: number
) {
  const user_posts = await Post.find({ author_name: username })
    .limit(limit)
    .skip(skip)
    .exec();

  const posts_info: {
    post_id: string;
    title: string;
    author_name: string;
    tags: string[];
  }[] = user_posts.map(
    (post: {
      _id: string;
      title: string;
      author_name: string;
      tags: string[];
    }) => {
      return {
        post_id: post._id.toString(),
        title: post.title,
        author_name: post.author_name,
        tags: post.tags,
      };
    }
  );

  return posts_info;
}

export async function get_user_post_count(username: string) {
  return await Post.countDocuments({ author_name: username }).exec();
}

export async function create_post(
  user_id: string,
  title: string,
  content: string,
  tags: string[]
) {
  const user = await User.findById(user_id).exec();

  if (!user) return null;

  let created_at = Date.now();

  const post_data = new Post({
    title: title,
    content: content,
    author_id: user_id,
    author_name: user.username,
    tags: tags,
    created_at: created_at,
  });

  await post_data.save();

  user.posts.push(post_data._id);
  await user.save();
}

export async function update_post_info(
  user_id: string,
  post_id: string,
  title: string,
  content: string,
  tags: string[]
) {
  // under the assumption that if nothing is changed on the frontend side, the original info is kept and send as the updated info
  const post = await Post.findById(post_id).exec();

  if (!post) return null;
  if (post.author_id.toString() !== user_id) return null;

  console.log(title, content, tags);

  await Post.findByIdAndUpdate(post_id, {
    title: title,
    content: content,
    tags: tags,
  });
}

export async function remove_post(user_id: string, post_id: string) {
  const post = await Post.findById(post_id).exec();

  if (!post) return null;
  if (post.author_id.toString() !== user_id) return null;

  await Post.findByIdAndDelete(post_id).exec();
}
