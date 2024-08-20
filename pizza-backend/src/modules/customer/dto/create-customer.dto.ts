import { IsNotEmpty, IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  @Length(1, 50, { message: 'First name must be between 1 and 50 characters' })
  first_name: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  @Length(1, 50, { message: 'Last name must be between 1 and 50 characters' })
  last_name: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  @Length(1, 255, { message: 'Address must be between 1 and 255 characters' })
  address: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString()
  @Matches(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits' })
  phone_number: string;

  @IsNotEmpty({ message: 'Email address is required' })
  @IsEmail({}, { message: 'Email address must be a valid email' })
  @Length(1, 255, { message: 'Email address must be between 1 and 255 characters' })
  email_address: string;
}