import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderLineEntity } from './entities/order-line.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderLineService {
  constructor(
    @InjectRepository(OrderLineEntity)
    private readonly orderLineRepository: Repository<OrderLineEntity>,
  ) {}

  async create(createOrderLineDto: CreateOrderLineDto): Promise<OrderLineEntity> {
    try {
      const orderLine = this.orderLineRepository.create(createOrderLineDto);
      return await this.orderLineRepository.save(orderLine);
    } catch (error) {
      throw new BadRequestException('Failed to create order line');
    }
  }

  findAll(): Promise<OrderLineEntity[]> {
    return this.orderLineRepository.find();
  }

  async findOne(id: number): Promise<OrderLineEntity> {
    const orderLine = await this.orderLineRepository.findOne({ where: { orderline_id: id } });
    if (!orderLine) {
      throw new NotFoundException(`Order line with ID ${id} not found`);
    }
    return orderLine;
  }

  async update(id: number, updateOrderLineDto: UpdateOrderLineDto): Promise<OrderLineEntity> {
    try {
      await this.findOne(id); // Ensure the order line exists
      await this.orderLineRepository.update({ orderline_id: id }, updateOrderLineDto);
      return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException('Failed to update order line');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const orderLine = await this.findOne(id);
      await this.orderLineRepository.remove(orderLine);
    } catch (error) {
      throw new NotFoundException(`Order line with ID ${id} does not exist`);
    }
  }
}
