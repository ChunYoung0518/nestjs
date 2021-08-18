import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundexception extends HttpException {
  constructor() {
    super('User not found -- customized exception', HttpStatus.NOT_FOUND);
  }
}
