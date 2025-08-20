import {
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { AppService } from '../app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/index')
  getMyName(): string {
    return this.appService.getMyName();
  }
}

@Controller('note')
export class NoteController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(@Req() request: Request): object {
    return { key: `This action returns all notes ${request.url}` };
  }
  @Get('wc/*')
  findWc() {
    return 'This route uses a wildcard';
  }
  @Post('create')
  createNote(): object {
    return { status: 201, body: `This action creates a note` };
  }

  // TO UPDATE RESPONSE CODE
  @Post('admin')
  @HttpCode(204)
  createAdmin() {
    return 'This action adds a new note';
  }

  // TO SEND BACK HEADER TO THE REQUEST, DO THIS
  @Post('adminhead')
  @Header('Cache-Control', 'no-store')
  create() {
    return 'This action adds a new note v2';
  }

  // A REDIRECT REQUEST
  @Get('priviledgedinfo')
  @Redirect('https://nestjs.com', 301)
  accessPriviledgedInfo() {
    return 'This is unsafe';
  }

  // A CONDITIONAL REQUEST
  @Get('docs')
  @Redirect('https://google.com', 302)
  getDocs(@Query('version') vsn) {
    if (vsn && vsn == '5') {
      return { url: 'https://nestjs.com' };
    }
  }
}
