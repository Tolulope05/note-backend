import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import qs from 'qs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
      bodyLimit: 10485760,
      querystringParser: (str) => qs.parse(str),
    }), // 10MB limit
  ); // NestExpressApplication for Fastify and NestFastifyApplication for Express
  await app.listen(process.env.PORT ?? 3000); // Default to port 3000 if not specified amd it listen at 127.0.0.1
  // ✅ only call getUrl after listen()
  const url = await app.getUrl();
  console.log(`🚀 Application is running on: ${url}`);
}

bootstrap();
