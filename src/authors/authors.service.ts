import { Injectable } from '@nestjs/common';
import { authors } from './data';

@Injectable()
export class AuthorsService {
  async countAll(): Promise<number> {
    return authors.length;
  }
}
