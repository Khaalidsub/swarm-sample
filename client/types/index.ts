export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  image?: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export enum CommentSearch {
  name = "name",
  email = "email",
  body = "body",
}
