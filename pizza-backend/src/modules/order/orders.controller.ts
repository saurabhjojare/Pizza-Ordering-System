import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor';

@Controller('orders')
@UseInterceptors(ResponseInterceptor)  
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const message = await this.ordersService.create(createOrderDto);
    const orderId = message.match(/Order #(\d+)/)[1];
    return this.ordersService.findOne(+orderId);
  }

  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderEntity> {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    await this.ordersService.update(+id, updateOrderDto);
    return this.ordersService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.ordersService.remove(+id);
  }
}
