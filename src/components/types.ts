export type ForumPostData = {
  title: string;
  author_name: string;
  tags: string[];
  post_id: string;
};

export type CommentData = {
  message: string;
  author_name: string;
};
