import { Controller, Get, Param, Post, Query, Redirect } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'A cat has been created!';
  }

  @Get()
  findAll(): string {
    return 'These are the cats the app has!';
  }

  @Get(':id')
  findCatById(@Param() params): string {
    return `Returns a cat with id: ${params.id}`;
  }

  @Get('abc*z')
  findSomethingWired() {
    return 'This route uses a wildcard for handling requests starts with abc and ends with z';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
