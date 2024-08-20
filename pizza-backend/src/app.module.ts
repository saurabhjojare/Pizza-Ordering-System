import { Module, ValidationPipe } from '@nestjs/common';
import { CustomersModule } from './modules/customer/customers.module';
import { dataSourceOptions } from './database/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './modules/order/orders.module';
import { OrderLineModule } from './modules/order-line/order-line.module';
import { PizzaModule } from './modules/pizza/pizza.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CustomersModule,
    OrdersModule,
    OrderLineModule,
    PizzaModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
