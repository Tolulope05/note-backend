import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { AppService } from '../providers/app.service';
import { Observable, of } from 'rxjs';
import { NoteDTO } from 'src/models/note_dto';

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
  // asynchronous data handling
  @Get('async')
  async findAPromise(): Promise<any[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [];
  }
  // synchronous data handling
  @Get('sync')
  findAllSync(): any[] {
    return this.appService.findAllSync();
  }
  //observable data handling
  @Get('obx')
  finaAnObservable(): Observable<any[]> {
    return of([]);
  }

  @Post('create-note')
  createNote(@Body() note: NoteDTO): object {
    console.log(`json: ${JSON.stringify(note)}`);
    // Here you would typically save the note to a database
    // For this example, we just return a success message
    // and the created note object
    return { status: 201, body: `This action creates a note`, note };
  }

  @Get('cats')
  findAynCall(@Query('age') age: number, @Query('breed') breed: string) {
    return {
      data: `This action returns all cats filtered by age: ${age} and breed: ${breed}`,
    };
  }
}
