import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzaService } from './pizza.service';
import { PizzaEntity } from './entities/pizza.entity';
import { PizzaController } from './controllers/pizza.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PizzaEntity])],
  controllers: [PizzaController],
  providers: [PizzaService],
  exports: [PizzaService],
})
export class PizzaModule { }