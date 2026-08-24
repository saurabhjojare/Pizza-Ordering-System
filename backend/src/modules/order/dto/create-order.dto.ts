import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

import { CreateOrderLineDto } from './create-order-line.dto';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'User ID is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'User ID must be a number' })
  user_id!: number;

  @IsNotEmpty({ message: 'Delivery address is required' })
  @IsString({ message: 'Delivery address must be a string' })
  delivery_address!: string;

  @IsNotEmpty({ message: 'Order lines are required' })
  @IsArray({ message: 'Order lines must be an array' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderLineDto)
  orderLines!: CreateOrderLineDto[];
}