import { IsNotEmpty, IsNumber, IsBoolean, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderLineDto } from '../../order-line/dto/create-order-line.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;

  @IsNotEmpty()
  @IsString({ message: 'Delivery address must be a string' })
  delivery_address: string;

  @IsNotEmpty({ message: 'Total amount is required' })
  @IsNumber({}, { message: 'Total amount must be a number' })
  total_amount: number;

  @IsNotEmpty({ message: 'Status is required' })
  @IsBoolean({ message: 'Status must be a boolean' })
  status: boolean;

  @IsNotEmpty({ message: 'Pizza details are required' })
  @IsArray({ message: 'Pizza must be an array' })
  @ValidateNested({ each: true, message: 'Each item in pizza must be a valid CreateOrderLineDto' })
  @Type(() => CreateOrderLineDto)
  pizza: CreateOrderLineDto[];
}
