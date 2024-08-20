import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Controller('customers')
@UseInterceptors(ResponseInterceptor)  // Apply the interceptor at the controller level
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    return this.customersService.create(createCustomerDto);
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
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<CustomerEntity> {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.customersService.remove(+id);
  }
}
