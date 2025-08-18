import { Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
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
  @Post('admin')
  @HttpCode(204)
  createAdmin() {
    return 'This action adds a new cat';
  }
}
