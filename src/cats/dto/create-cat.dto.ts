import { Cat } from '../interface/Cat';

export class CreateCatDto implements Cat {
  age: number;
  breed: string;
  name: string;
}
