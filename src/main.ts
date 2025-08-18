import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true, bodyLimit: 10485760 }), // 10MB limit
  );
  console.log(`Application is running on: ${await app.getUrl()}`);
  await app.listen(process.env.PORT ?? 3000); // Default to port 3000 if not specified amd it listen at 127.0.0.1
}

bootstrap();
