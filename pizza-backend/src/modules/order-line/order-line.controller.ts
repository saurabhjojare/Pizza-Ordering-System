import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { OrderLineService } from './order-line.service';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';
import { OrderLineEntity } from './entities/order-line.entity';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor';

@Controller('order-line')
@UseInterceptors(ResponseInterceptor)  
export class OrderLineController {
  constructor(private readonly orderLineService: OrderLineService) { }

  @Post()
  async create(@Body() createOrderLineDto: CreateOrderLineDto): Promise<OrderLineEntity> {
    const orderLine = await this.orderLineService.create(createOrderLineDto);
    return orderLine;
  }

  @Get()
  async findAll(): Promise<OrderLineEntity[]> {
    return this.orderLineService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderLineEntity> {
    return this.orderLineService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderLineDto: UpdateOrderLineDto): Promise<OrderLineEntity> {
    await this.orderLineService.update(+id, updateOrderLineDto);
    return this.orderLineService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.orderLineService.remove(+id);
  }
}
