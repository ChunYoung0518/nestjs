import { Controller, Get } from '@nestjs/common';

@Controller({ host: 'admin.cats.com' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin Page';
  }
}
