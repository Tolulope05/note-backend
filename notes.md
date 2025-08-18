#Fastify handles redirect responses slightly differently than Express. To do a proper redirect with Fastify, return both the status code and the URL, as follows:#
@Get()
index(@Res() res) {
  res.status(302).redirect('/login');
} 

@Get('login')
  login(@Res() res) {
    res.status(200).send('Login Page');
  }
}

Get('/notes')
  async getNotes(@Res() res) {
    const notes = await this.notesService.findAll();
    res.status(200).send(notes);
    }
}
    import { NestFactory } from '@nestjs/core';


#Route Config#
You can use the route config feature of Fastify with the @RouteConfig() decorator.
@RouteConfig({ output: 'hello world' })
@Get()
index(@Req() req) {
  return req.routeConfig.output;
}

DT: string, boolean, number, array, object, enum, null and undefined, 