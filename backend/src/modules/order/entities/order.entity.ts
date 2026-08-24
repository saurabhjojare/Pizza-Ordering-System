import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';
import { OrderLineEntity } from './order-line.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  order_id!: number;

  @Column({ type: 'int' })
  user_id!: number;

  @Column({ type: 'varchar' })
  delivery_address!: string;

  @Column({ type: 'enum', enum: ['PLACED', 'CANCELLED', 'DELIVERED'], default: 'PLACED' })
  status!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @ManyToOne(() => UserEntity, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @OneToMany(() => OrderLineEntity, (orderLine) => orderLine.order, { cascade: true })
  orderLines!: OrderLineEntity[];
}
