import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  UsePipes,
  UseGuards,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './interface/Cat';
import { JoiValidationPipe } from './pipe/joi.validation.pipe';
import Joi from 'joi';
import { ValidationPipe } from './pipe/validation.pipe';
import { RolesGuard } from './guard/roles.guard';
import { LoggingInterceptor } from './interception/logging.interceptor';
import { TransformInterceptor } from './interception/transform.interceptor';
import { User } from './decorator/user.decorator';

//customized decorator for role authorization
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

class UserEntity {
  id: number;
  firstName: string;
  lastName: string;
  roles: [];
}

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  // @UsePipes(
  //   new JoiValidationPipe(Joi.object().keys({ name: Joi.string().min(3) })),
  // )
  // @SetMetadata('roles', ['admin'])//not suggested, see the below best practice
  @Roles('admin') //best practise
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  //async findOne(@Param('id', ParseIntPipe) id: number) {
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @User() user: UserEntity,
    @User('firstName') firstName: string,
  ) {
    console.log(user);
    console.log(`${firstName} send a delete request`);
    return this.catsService.remove(+id);
  }
}
