import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderEntity } from "./entities/order.entity";
import { OrderLineEntity } from "./entities/order-line.entity";
import { CartEntity } from "../cart/entities/cart.entity";
import { PizzaEntity } from "../pizza/entities/pizza.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) { }

  async createOrder(dto: CreateOrderDto): Promise<void> {
    const { user_id, delivery_address, orderLines } = dto;
    const pizzaIds = [...new Set(orderLines.map(line => line.pizza_id))];

    await this.orderRepository.manager.transaction(async manager => {
      const pizzas = await manager.find(PizzaEntity, { where: { pizza_id: In(pizzaIds) } });

      if (pizzas.length !== pizzaIds.length) {
        throw new BadRequestException("One or more pizzas not found.");
      }

      const pizzaMap = new Map(pizzas.map(pizza => [pizza.pizza_id, pizza]));
      const lines = orderLines.map(({ pizza_id, quantity }) => ({ pizza_id, quantity, line_total: Number(pizzaMap.get(pizza_id)!.price) * quantity }));

      const order = await manager.save(OrderEntity, { user_id, delivery_address, status: "PLACED" });
      await manager.insert(OrderLineEntity, lines.map(line => ({ ...line, order_id: order.order_id })));
      await manager.delete(CartEntity, { user_id });
    });
  }

  findOrders(userId?: number): Promise<OrderEntity[]> {
    return this.orderRepository.find({ where: userId ? { user_id: userId } : {}, relations: ["orderLines", "orderLines.pizza", "user"] });
  }

  getOrderById(id: number): Promise<OrderEntity> {
    return this.orderRepository.findOneOrFail({ where: { order_id: id }, relations: ["orderLines", "orderLines.pizza"] });
  }

  async cancelOrder(id: number): Promise<void> {
    await this.orderRepository.update({ order_id: id, status: "PLACED" }, { status: "CANCELLED" });
    return undefined;
  }

  async deliverOrder(id: number): Promise<void> {
    await this.orderRepository.update({ order_id: id, status: "PLACED" }, { status: "DELIVERED" });
    return undefined;
  }

  async deleteOrder(id: number): Promise<void> {
    await this.orderRepository.delete(id);
    return undefined;
  }
}