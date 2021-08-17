import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAllCats(): string {
    return 'These are the cats the app has!';
  }
}
