import { Cat } from '../interface/Cat';
import { IsInt, IsString } from 'class-validator';

export class CreateCatDto implements Cat {
  @IsInt()
  age: number;

  @IsString()
  breed: string;

  @IsString()
  name: string;
}
