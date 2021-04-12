import { Injectable } from '@nestjs/common';
import { CommentSearch } from '../types';
import { Comment } from './entities/comment.entity';
import { RESTDataSource } from 'apollo-datasource-rest';
@Injectable()
export class CommentsService extends RESTDataSource {
  private _URL = 'https://jsonplaceholder.typicode.com/comments';

  constructor() {
    super();
    this.baseURL = this._URL;
  }
  async findAll() {
    const result = await this.get<Comment[]>('/');
    return result;
  }
  async findSearch(input: string, search: CommentSearch) {
    const result = await this.get<Comment[]>(`/`, {
      per_page: 20,
      [search]: input,
    });
    return result;
  }
}
