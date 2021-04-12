import { Injectable } from '@nestjs/common';
import { RESTDataSource } from 'apollo-datasource-rest';
import { Post } from './entities/post.entity';
@Injectable()
export class PostsService extends RESTDataSource {
  private _URL = 'https://jsonplaceholder.typicode.com/posts';
  constructor() {
    super();
    this.baseURL = this._URL;
  }
  async findAll() {
    const result = await this.get<Post[]>('/');
    return result;
  }

  async findOne(id: number) {
    const result = await this.get<Post>(`/${id}`);
    return result;
  }
}
