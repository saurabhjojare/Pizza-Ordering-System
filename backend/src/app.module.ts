import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConnection } from './database/dabaase-connection';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/order/orders.module';
import { PizzaModule } from './modules/pizza/pizza.module';
import { UsersModule } from './modules/user/users.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConnection),
    UsersModule,
    OrdersModule,
    PizzaModule,
    AuthModule,
    CartModule
  ],
})
export class AppModule { }