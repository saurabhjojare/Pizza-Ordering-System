import { Module } from '@nestjs/common';
import { CustomersModule } from './customer/customers.module';
import { dataSourceOptions } from 'database/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './order/orders.module';
import { OrderLineModule } from './order-line/order-line.module';
import { PizzaModule } from './pizza/pizza.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
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
