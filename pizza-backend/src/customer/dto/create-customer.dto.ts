import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string; 

  @IsNotEmpty()
  @IsEmail()
  email_address: string;
}
