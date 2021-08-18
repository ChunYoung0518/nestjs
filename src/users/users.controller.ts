import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundexception } from './exception/user.notfoundexception';
import { HttpExceptionFilter } from './exception/http-exception.filter';

@Controller('users')
// apply the exception filter as controller-scoped
// @UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseFilters(HttpExceptionFilter)
  // also can use an filter instance, but not suggested as using a class reduces memory usage.
  // @UseFilters(new HttpExceptionFilter())
  create(@Body() createUserDto: CreateUserDto) {
    throw new UserNotFoundexception();
    // return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    //example of overriding the entire exception response body
    // throw new HttpException(
    //   { status: HttpStatus.FORBIDDEN, error: 'Customized error message' },
    //   HttpStatus.FORBIDDEN,
    // );

    //thorw customized exception
    throw new UserNotFoundexception();

    // return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
