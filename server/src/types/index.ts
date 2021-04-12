import { registerEnumType } from '@nestjs/graphql';
import { CommentsService } from '../comments/comments.service';
import { PostsService } from '../posts/posts.service';

export interface IPost {
  userId: number;
  id: number;

  title: string;
  body: string;
}
export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export enum CommentSearch {
  id = 'id',
  postId = 'postId',
  name = 'name',
  email = 'email',
  body = 'body',
}

registerEnumType(CommentSearch, {
  name: 'CommentSearch',
  description: 'Property Type of the comment to searched ',
});
export interface IDatasource {
  postsAPI: PostsService;
  commentsAPI: CommentsService;
}

export type pageItem = IComment | IPost;
export type pageItems = IComment[] | IPost[];
