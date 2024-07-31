import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderLineDto } from './create-order-line.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderLineDto extends PartialType(CreateOrderLineDto) {
  @IsOptional()
  @IsNumber()
  order_id?: number;

  @IsOptional()
  @IsNumber()
  pizza_id?: number;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  total_amount?: number;  
}
