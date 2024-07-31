import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderLineEntity } from '../order-line/entities/order-line.entity';
import { PizzaEntity } from '../pizza/entities/pizza.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderLineEntity) private readonly orderLineRepository: Repository<OrderLineEntity>,
    @InjectRepository(PizzaEntity) private readonly pizzaRepository: Repository<PizzaEntity>,
  ) {}

  private readonly validSizes = ['regular', 'medium', 'large'];

  calculateTotalLineAmount(pizza: PizzaEntity, size: string, quantity: number): number {
    if (!this.validSizes.includes(size)) {
      throw new BadRequestException('Invalid pizza size');
    }

    let price;
    switch (size) {
      case 'regular':
        price = pizza.regularPrice;
        break;
      case 'medium':
        price = pizza.mediumPrice;
        break;
      case 'large':
        price = pizza.largePrice;
        break;
      default:
        throw new BadRequestException('Invalid pizza size');
    }

    return price * quantity;
  }

  async create(createOrderDto: CreateOrderDto): Promise<string> {
    const { customer_id, delivery_address, status, pizza } = createOrderDto;

    const order = this.orderRepository.create({
      customer_id,
      delivery_address,
      total_amount: 0,
      status,
    });

    const savedOrder = await this.orderRepository.save(order);

    let totalAmount = 0;
    for (const line of pizza) {
      const pizzaEntity = await this.pizzaRepository.findOne({ where: { pizza_id: line.pizza_id } });
      if (!pizzaEntity) {
        throw new NotFoundException(`Pizza with ID ${line.pizza_id} not found`);
      }

      const lineAmount = this.calculateTotalLineAmount(pizzaEntity, line.size, line.quantity);
      totalAmount += lineAmount;

      const orderLine = this.orderLineRepository.create({
        order_id: savedOrder.order_id,
        pizza_id: pizzaEntity.pizza_id,
        size: line.size,
        quantity: line.quantity,
        total_amount: lineAmount,
      });

      await this.orderLineRepository.save(orderLine);
    }

    savedOrder.total_amount = totalAmount;
    await this.orderRepository.save(savedOrder);

    return `Order #${savedOrder.order_id} has been successfully created.`;
  }

  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({ relations: ['orderLines'] });
  }

  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { order_id: id },
      relations: ['orderLines'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<string> {
    const order = await this.orderRepository.preload({
      order_id: id,
      ...updateOrderDto,
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    await this.orderRepository.save(order);
    return `Order #${id} has been successfully updated.`;
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
