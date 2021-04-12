import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql';
import { Post, PostsConnection } from './entities/post.entity';
import { IDatasource } from '../types';
import { paginateResults } from '../util';
@Resolver(() => Post)
export class PostsResolver {
  constructor() {}

  @Query(() => PostsConnection, { name: 'posts' })
  async findAll(
    @Args('after', { nullable: true }) after: number,
    @Context('dataSources') { postsAPI }: IDatasource,
  ) {
    const posts = await postsAPI.findAll();
    return this.paginateComments(posts, after);
  }

  @Query(() => Post, { name: 'post' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Context('dataSources') { postsAPI }: IDatasource,
  ) {
    return postsAPI.findOne(id);
  }

  paginateComments(posts: Post[], after: number) {
    const paginateComments = paginateResults({
      after: after,
      pageSize: 20,
      results: posts,
    });
    const postsConnected = {
      totlaCount: posts.length,
      posts: paginateComments,
      cursor: paginateComments.length
        ? paginateComments[paginateComments.length - 1].id
        : null,
      hasMore: paginateComments.length
        ? paginateComments[paginateComments.length - 1].id !==
          posts[paginateComments.length]?.id
        : false,
    } as PostsConnection;
    return postsConnected;
  }
}
