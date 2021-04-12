import { HttpModule, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';

@Module({
  imports: [HttpModule],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
