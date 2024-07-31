import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { SuccessResponseDto, ErrorResponseDto } from '../../common/dto/response.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<SuccessResponseDto<{ Order: OrderEntity }> | ErrorResponseDto> {
    try {
      const message = await this.ordersService.create(createOrderDto);
      const orderId = message.match(/Order #(\d+)/)[1]; 
      const order = await this.ordersService.findOne(+orderId);
      return {
        Success: true,
        Message: `Order #${orderId} has been successfully created`,
        Data: { Order: order },
      };
    } catch (error) {
      return {
        Success: false,
        Message: 'Failed to create order',
        Error: {
          Code: HttpStatus.BAD_REQUEST,
          Message: error.message || 'Invalid data provided.',
        },
      };
    }
  }

  @Get()
  async findAll(): Promise<SuccessResponseDto<{ Orders: OrderEntity[] }>> {
    const orders = await this.ordersService.findAll();
    return {
      Success: true,
      Message: 'Successfully retrieved orders',
      Data: { Orders: orders },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SuccessResponseDto<{ Order: OrderEntity }> | ErrorResponseDto> {
    try {
      const order = await this.ordersService.findOne(+id);
      return {
        Success: true,
        Message: `Successfully retrieved order #${id}`,
        Data: { Order: order },
      };
    } catch (error) {
      return {
        Success: false,
        Message: 'Order not found',
        Error: {
          Code: HttpStatus.NOT_FOUND,
          Message: `Order #${id} does not exist.`,
        },
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<SuccessResponseDto<{ Order: OrderEntity }> | ErrorResponseDto> {
    try {
      await this.ordersService.update(+id, updateOrderDto);
      const order = await this.ordersService.findOne(+id);
      return {
        Success: true,
        Message: `Order #${id} has been successfully updated`,
        Data: { Order: order },
      };
    } catch (error) {
      return {
        Success: false,
        Message: 'Failed to update order',
        Error: {
          Code: HttpStatus.BAD_REQUEST,
          Message: error.message || 'Invalid data provided.',
        },
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SuccessResponseDto<null> | ErrorResponseDto> {
    try {
      await this.ordersService.remove(+id);
      return {
        Success: true,
        Message: `Order #${id} has been successfully deleted`,
        Data: null,
      };
    } catch (error) {
      return {
        Success: false,
        Message: 'Failed to delete order',
        Error: {
          Code: HttpStatus.NOT_FOUND,
          Message: `Order #${id} does not exist.`,
        },
      };
    }
  }
}