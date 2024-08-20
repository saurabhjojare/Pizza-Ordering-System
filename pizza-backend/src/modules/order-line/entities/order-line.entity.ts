import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from '../../order/entities/order.entity';
import { PizzaEntity } from '../../pizza/entities/pizza.entity';

@Entity('order_line')
export class OrderLineEntity {
  @PrimaryGeneratedColumn()
  orderline_id: number;

  @Column({ nullable: false })
  order_id: number;

  @Column({ nullable: false })
  pizza_id: number;

  @Column({ nullable: false })
  size: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  total_amount: number;

  @ManyToOne(() => OrderEntity, order => order.orderLines, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => PizzaEntity, pizza => pizza.pizza_id)
  @JoinColumn({ name: 'pizza_id' })
  pizza: PizzaEntity;
}