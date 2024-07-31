import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import { SuccessResponseDto, ErrorResponseDto } from 'src/common/dto/response.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<SuccessResponseDto<{ Customer: CustomerEntity }> | ErrorResponseDto> {
    try {
      const customer = await this.customersService.create(createCustomerDto);
      return {
        Success: true,
        Message: `Customer with ID ${customer.customer_id} added`,
        Data: { Customer: customer },
      };
    } catch (error) {
      return {
        Success: false,
        Message: 'Failed to add customer',
        Error: {
          Code: HttpStatus.BAD_REQUEST,
          Message: 'Invalid data provided.',
        },
      };
    }
  }

  @Get()
  async findAll(): Promise<SuccessResponseDto<{ Customers: CustomerEntity[] }>> {
    const customers = await this.customersService.findAll();
    return {
      Success: true,
      Message: 'Successfully retrieved customers',
      Data: { Customers: customers },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SuccessResponseDto<{ Customer: CustomerEntity }> | ErrorResponseDto> {
    try {
      const customer = await this.customersService.findOne(+id);
      return {
        Success: true,
        Message: 'Successfully retrieved customer',
        Data: { Customer: customer },
      };
    } catch (error) {
      return {
        Success: false,
        Message: 'Customer not found',
        Error: {
          Code: HttpStatus.NOT_FOUND,
          Message: `Customer with ID ${id} does not exist.`,
        },
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<SuccessResponseDto<{ Customer: CustomerEntity }> | ErrorResponseDto> {
    try {
      const customer = await this.customersService.update(+id, updateCustomerDto);
      return {
        Success: true,
        Message: `Customer with ID ${customer.customer_id} updated`,
        Data: { Customer: customer },
      };
    } catch (error) {
      return {
        Success: false,
        Message: 'Failed to update customer',
        Error: {
          Code: HttpStatus.BAD_REQUEST,
          Message: 'Invalid data provided.',
        },
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SuccessResponseDto<null> | ErrorResponseDto> {
    try {
      await this.customersService.remove(+id);
      return {
        Success: true,
        Message: `Customer with ID ${id} deleted`,
        Data: null,
      };
    } catch (error) {
      return {
        Success: false,
        Message: 'Failed to delete customer',
        Error: {
          Code: HttpStatus.NOT_FOUND,
          Message: `Customer with ID ${id} does not exist.`,
        },
      };
    }
  }
}