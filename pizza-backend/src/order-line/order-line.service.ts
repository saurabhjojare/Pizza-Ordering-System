import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderLineEntity } from './entities/order-line.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderLineService {
  constructor (
    @InjectRepository(OrderLineEntity)
    private readonly orderLineRepository: Repository<OrderLineEntity>,
  ) {}

  async create(createOrderLineDto: CreateOrderLineDto): Promise<OrderLineEntity> {
    const orderLine = this.orderLineRepository.create(createOrderLineDto);
    return this.orderLineRepository.save(orderLine);
  }

  findAll(): Promise<OrderLineEntity[]> {
    return this.orderLineRepository.find();
  }

  async findOne(id: number) {
    const orderLine = await this.orderLineRepository.findOne({where : {orderline_id : id}});
    if(!orderLine) {
      throw new NotFoundException(`OrderLine ${id} not found`);
    }
    return orderLine;
  }

  async update(id: number, updateOrderLineDto: UpdateOrderLineDto): Promise<OrderLineEntity> {
    await this.findOne(id);
    await this.orderLineRepository.update({orderline_id: id}, updateOrderLineDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const orderLine = await this.findOne(id);
    await this.orderLineRepository.remove(orderLine);
  }
}
