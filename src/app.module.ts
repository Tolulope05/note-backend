import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController, NoteController } from './controllers/app.controller';
import { AppService } from './providers/app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [],
  controllers: [AppController, NoteController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // applies to all routes
  }
}
