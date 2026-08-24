import { OrderLineEntity } from 'src/modules/order/entities/order-line.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pizza')
export class PizzaEntity {
  @PrimaryGeneratedColumn()
  pizza_id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ type: 'enum', enum: ['Vegetarian', 'Non-Vegetarian'] })
  type!: string;

  @Column()
  imageUrl!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @OneToMany(() => OrderLineEntity, orderLine => orderLine.pizza)
  orderLines!: OrderLineEntity[];

  @CreateDateColumn()
  created_at!: Date;
}
