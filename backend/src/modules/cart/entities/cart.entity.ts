import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn, } from 'typeorm';
import { PizzaEntity } from '../../pizza/entities/pizza.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Entity('cart')
@Unique(['user_id', 'pizza_id'])
export class CartEntity {
    @PrimaryGeneratedColumn()
    cart_id!: number;

    @Column()
    user_id!: number;

    @Column()
    pizza_id!: number;

    @Column({ type: 'int' })
    quantity!: number;

    @ManyToOne(() => PizzaEntity, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pizza_id' })
    pizza!: PizzaEntity;

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}