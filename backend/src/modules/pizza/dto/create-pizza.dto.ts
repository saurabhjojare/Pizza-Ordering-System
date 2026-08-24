import { IsNotEmpty, IsNumber, IsString, IsUrl, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePizzaDto {
  @IsNotEmpty({ message: 'Pizza name is required' })
  @IsString({ message: 'Pizza name must be a string' })
  name!: string;

  @IsNotEmpty({ message: 'Pizza type is required' })
  @IsString({ message: 'Pizza type must be a string' })
  @IsIn(['Vegetarian', 'Non-Vegetarian'], { message: 'Pizza type must be either Vegetarian or Non-Vegetarian' })
  type!: string;

  @IsNotEmpty({ message: 'Pizza image URL is required' })
  @IsUrl({}, { message: 'Pizza image URL must be a valid URL' })
  imageUrl!: string;

  @IsNotEmpty({ message: 'Pizza description is required' })
  @IsString({ message: 'Pizza description must be a string' })
  description!: string;

  @IsNotEmpty({ message: 'Pizza price is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Pizza price must be a number' })
  price!: number;
}