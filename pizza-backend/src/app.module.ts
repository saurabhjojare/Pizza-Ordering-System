import { Module } from '@nestjs/common';
import { CustomersModule } from './modules/customer/customers.module';
import { dataSourceOptions } from './database/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './modules/order/orders.module';
import { OrderLineModule } from './modules/order-line/order-line.module';
import { PizzaModule } from './modules/pizza/pizza.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register([]),
    CustomersModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), 
    }),
    OrdersModule,
    OrderLineModule,
    PizzaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
