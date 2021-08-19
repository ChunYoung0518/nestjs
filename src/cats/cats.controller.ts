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
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './interface/Cat';
import { JoiValidationPipe } from './pipe/joi.validation.pipe';
import Joi from 'joi';
import { ValidationPipe } from './pipe/validation.pipe';
import { RolesGuard } from './guard/roles.guard';

//customized decorator for role authorization
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller('cats')
@UseGuards(RolesGuard)
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
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
