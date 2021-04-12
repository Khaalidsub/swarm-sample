import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { paginateResults } from '../util';
import { CommentSearch, IDatasource } from '../types';
import { Comment, CommentsConnection } from './entities/comment.entity';
@Resolver(() => Comment)
export class CommentsResolver {
  constructor() {}

  @Query(() => CommentsConnection, { name: 'comments' })
  async findAll(
    @Context('dataSources') { commentsAPI }: IDatasource,
    @Args('after', { nullable: true }) after: number,
  ) {
    const comments = await commentsAPI.findAll();
    return this.paginateComments(comments, after);
  }

  @Query(() => CommentsConnection, { name: 'commentsBySearch' })
  async findBySearch(
    @Args('CommentSearch', { type: () => CommentSearch }) search: CommentSearch,
    @Args('input') input: string,
    @Args('after', { nullable: true }) after: number,
    @Context('dataSources') { commentsAPI }: IDatasource,
  ) {
    const comments = await commentsAPI.findSearch(input, search);
    return this.paginateComments(comments, after);
  }

  paginateComments(comments: Comment[], after: number) {
    const paginateComments = paginateResults({
      after: after,
      pageSize: 20,
      results: comments,
    });
    const commentsConnected = {
      totlaCount: comments.length,
      comments: paginateComments,
      cursor: paginateComments.length
        ? paginateComments[paginateComments.length - 1].id
        : null,
      hasMore: paginateComments.length
        ? paginateComments[paginateComments.length - 1].id !==
          comments[paginateComments.length]?.id
        : false,
    } as CommentsConnection;
    return commentsConnected;
  }
}
