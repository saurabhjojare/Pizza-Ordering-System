import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { CustomerEntity } from '../../customer/entities/customer.entity'; 
import { OrderLineEntity } from '../../order-line/entities/order-line.entity'; 

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column({ type: 'boolean' })  
  status: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })  
  total_amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  order_time: Date; 

  @Column({ type: 'int' })  
  customer_id: number;

  @Column({ type: 'varchar' })
  delivery_address: string;

  @ManyToOne(() => CustomerEntity, customer => customer.orders, {onDelete : 'CASCADE'})
  @JoinColumn({ name: 'customer_id' }) 
  customer: CustomerEntity;

  @OneToMany(() => OrderLineEntity, orderLine => orderLine.order, { cascade: true })
  orderLines: OrderLineEntity[];
}
