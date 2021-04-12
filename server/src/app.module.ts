import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { PostsService } from './posts/posts.service';
import { CommentsService } from './comments/comments.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      dataSources: () => ({
        postsAPI: new PostsService(),
        commentsAPI: new CommentsService(),
      }),
      include: [PostsModule, CommentsModule],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
