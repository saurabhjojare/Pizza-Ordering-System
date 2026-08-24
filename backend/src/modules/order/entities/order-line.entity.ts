import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from '../../order/entities/order.entity';
import { PizzaEntity } from '../../pizza/entities/pizza.entity';

@Entity('order_line')
export class OrderLineEntity {
  @PrimaryGeneratedColumn()
  order_line_id!: number;

  @Column()
  order_id!: number;

  @Column()
  pizza_id!: number;

  @Column()
  quantity!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  line_total!: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderLines, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: OrderEntity;

  @ManyToOne(() => PizzaEntity, (pizza) => pizza.pizza_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pizza_id' })
  pizza!: PizzaEntity;
}
