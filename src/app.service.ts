import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getMyName(): string {
    return 'My name is tolulope Fakunle';
  }
}
