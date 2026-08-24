import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { PizzaEntity } from './entities/pizza.entity';

@Injectable()
export class PizzaService {
  constructor(
    @InjectRepository(PizzaEntity)
    private readonly pizzaRepository: Repository<PizzaEntity>,
  ) { }

  async createPizza(dto: CreatePizzaDto): Promise<void> {
    await this.pizzaRepository.save(dto);
  }

  getAllPizzas(): Promise<PizzaEntity[]> {
    return this.pizzaRepository.find();
  }

  getPizzaById(id: number): Promise<PizzaEntity> {
    return this.pizzaRepository.findOneOrFail({ where: { pizza_id: id } });
  }

  async updatePizza(id: number, dto: UpdatePizzaDto): Promise<void> {
    await this.pizzaRepository.update(id, dto);
  }

  async deletePizza(id: number): Promise<void> {
    await this.pizzaRepository.delete(id);
  }
}