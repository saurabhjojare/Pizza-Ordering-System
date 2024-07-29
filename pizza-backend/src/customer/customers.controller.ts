import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Controller('customers')
export class CustomersController {
  
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<{ message: string; customer: CustomerEntity }> {
    const customer = await this.customersService.create(createCustomerDto);
    return { message: `Customer with ID ${customer.customer_id} added`, customer };
  }

  @Get()
  async findAll(): Promise<CustomerEntity[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CustomerEntity> {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<{ message: string; customer: CustomerEntity }> {
    const customer = await this.customersService.update(+id, updateCustomerDto);
    return { message: `Customer with ID ${customer.customer_id} updated`, customer };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const message = await this.customersService.remove(+id);
    return { message };
  }
}