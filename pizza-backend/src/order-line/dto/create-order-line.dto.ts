import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderLineDto {
  @IsNotEmpty()
  @IsNumber()
  pizza_id: number;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
