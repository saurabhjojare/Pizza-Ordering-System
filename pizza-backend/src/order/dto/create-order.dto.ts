import { IsNotEmpty, IsNumber, IsBoolean, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderLineDto } from 'src/order-line/dto/create-order-line.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;

  @IsNotEmpty()
  @IsString()
  delivery_address: string;

  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderLineDto)
  pizza: CreateOrderLineDto[];
}
