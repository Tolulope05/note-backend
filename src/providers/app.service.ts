import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  findAll(): any[] | PromiseLike<any[]> {
    return ['Hello', 'HI', 'TEST'];
  }
  findAllSync(): any[] {
    return ['Whats up', 'Baddie', 'Broke'];
  }
  getHello(): string {
    return 'Hello World!';
  }

  getMyName(): string {
    return 'My name is tolulope Fakunle';
  }
}
