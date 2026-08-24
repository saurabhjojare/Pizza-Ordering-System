import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { OrderEntity } from '../../order/entities/order.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  address!: string;

  @Column({ unique: true })
  phone_number!: string;

  @Column({ unique: true })
  email_address!: string;

  @Column()
  password!: string;

  @Column({ default: 'customer' })
  role!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders!: OrderEntity[];
}