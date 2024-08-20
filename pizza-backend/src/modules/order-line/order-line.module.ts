import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLineService } from './order-line.service';
import { OrderLineController } from './order-line.controller';
import { OrderLineEntity } from './entities/order-line.entity';
import { OrderEntity } from '../order/entities/order.entity';
import { PizzaEntity } from '../pizza/entities/pizza.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderLineEntity, OrderEntity, PizzaEntity]),
  ],
  controllers: [OrderLineController],
  providers: [OrderLineService],
})
export class OrderLineModule {}
