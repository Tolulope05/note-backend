import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const start = Date.now();
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${res.statusCode} [${duration}ms]`);
    next();
  }
}
