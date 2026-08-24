import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderLineDto {
    @IsNotEmpty({ message: 'Pizza ID is required' })
    @IsNumber({}, { message: 'Pizza ID must be a number' })
    pizza_id!: number;

    @IsNotEmpty({ message: 'Quantity is required' })
    @IsNumber({}, { message: 'Quantity must be a number' })
    quantity!: number;
}