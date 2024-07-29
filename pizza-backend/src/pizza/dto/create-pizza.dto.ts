import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreatePizzaDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    image: string;
}
