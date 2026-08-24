import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartService } from './cart.service';
import { CartController } from './controllers/cart.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CartEntity])],
    controllers: [CartController],
    providers: [CartService],
})

export class CartModule { }