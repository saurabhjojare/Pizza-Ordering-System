import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>,
    ) { }

    async createCart(dto: CreateCartDto): Promise<void> {
        const cart = await this.cartRepository.findOne({
            where: { user_id: dto.user_id, pizza_id: dto.pizza_id },
            select: ['cart_id'],
        });

        if (cart) {
            await this.cartRepository.increment({ cart_id: cart.cart_id }, 'quantity', dto.quantity);
        }
        else {
            await this.cartRepository.save(dto);
        }
    }

    getUserCart(userId: number): Promise<CartEntity[]> {
        return this.cartRepository.findBy({ user_id: userId });
    }

    getCartItem(id: number): Promise<CartEntity> {
        return this.cartRepository.findOneByOrFail({ cart_id: id });
    }

    async updateCartItem(id: number, dto: UpdateCartDto): Promise<void> {
        await this.cartRepository.update(id, dto);
    }

    async deleteCartItem(id: number): Promise<void> {
        await this.cartRepository.delete(id);
    }
}