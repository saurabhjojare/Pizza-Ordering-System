import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { OrderLineService } from './order-line.service';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';
import { OrderLineEntity } from './entities/order-line.entity';
import { SuccessResponseDto, ErrorResponseDto } from '../../common/dto/response.dto'; // Adjust import path

@Controller('order-line')
export class OrderLineController {
  constructor(private readonly orderLineService: OrderLineService) {}

  @Post()
  async create(@Body() createOrderLineDto: CreateOrderLineDto): Promise<SuccessResponseDto<{ OrderLine: OrderLineEntity }> | ErrorResponseDto> {
    try {
      const orderLine = await this.orderLineService.create(createOrderLineDto);
      return {
        Success: true,
        Message: 'Order line successfully created',
        Data: { OrderLine: orderLine },
      };
    } catch (error) {
      return {
        Success: false,
        Message: 'Failed to create order line',
        Error: {
          Code: HttpStatus.BAD_REQUEST,
          Message: error.message || 'Invalid data provided',
        },
      };
    }
  }

  @Get()
  async findAll(): Promise<SuccessResponseDto<{ OrderLines: OrderLineEntity[] }>> {
    const orderLines = await this.orderLineService.findAll();
    return {
      Success: true,
      Message: 'Successfully retrieved order lines',
      Data: { OrderLines: orderLines },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SuccessResponseDto<{ OrderLine: OrderLineEntity }> | ErrorResponseDto> {
    try {
      const orderLine = await this.orderLineService.findOne(+id);
      return {
        Success: true,
        Message: `Successfully retrieved order line ${id}`,
        Data: { OrderLine: orderLine },
      };
    } catch (error) {
      return {
        Success: false,
        Message: 'Order line not found',
        Error: {
          Code: HttpStatus.NOT_FOUND,
          Message: `Order line with ID ${id} does not exist.`,
        },
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderLineDto: UpdateOrderLineDto): Promise<SuccessResponseDto<{ OrderLine: OrderLineEntity }> | ErrorResponseDto> {
    try {
      await this.orderLineService.update(+id, updateOrderLineDto);
      const updatedOrderLine = await this.orderLineService.findOne(+id);
      return {
        Success: true,
        Message: `Order line ${id} successfully updated`,
        Data: { OrderLine: updatedOrderLine },
      };
    } catch (error) {
      return {
        Success: false,
        Message: 'Failed to update order line',
        Error: {
          Code: HttpStatus.BAD_REQUEST,
          Message: error.message || 'Invalid data provided',
        },
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SuccessResponseDto<null> | ErrorResponseDto> {
    try {
      await this.orderLineService.remove(+id);
      return {
        Success: true,
        Message: `Order line ${id} successfully deleted`,
        Data: null,
      };
    } catch (error) {
      return {
        Success: false,
        Message: 'Failed to delete order line',
        Error: {
          Code: HttpStatus.NOT_FOUND,
          Message: `Order line with ID ${id} does not exist.`,
        },
      };
    }
  }
}
