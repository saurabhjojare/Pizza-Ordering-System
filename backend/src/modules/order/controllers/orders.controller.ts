import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, } from '@nestjs/common';
import { role } from 'src/common/enums/role.enum';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrdersService } from '../orders.service';
import { OrderEntity } from '../entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN, role.CUSTOMER)
  @Post()
  createOrder(@Body() dto: CreateOrderDto): Promise<void> {
    return this.ordersService.createOrder(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN, role.CUSTOMER)
  @Get('my')
  getMyOrders(@Query('userId') userId?: number): Promise<OrderEntity[]> {
    return this.ordersService.findOrders(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN)
  @Get()
  getAllOrders(): Promise<OrderEntity[]> {
    return this.ordersService.findOrders();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN, role.CUSTOMER)
  @Patch(':id/cancel')
  cancelOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ordersService.cancelOrder(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN)
  @Patch(':id/deliver')
  deliverOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ordersService.deliverOrder(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN)
  @Delete(':id')
  deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ordersService.deleteOrder(id);
  }
}