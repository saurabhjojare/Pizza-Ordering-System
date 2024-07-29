import { Injectable } from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PizzaEntity } from './entities/pizza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PizzaService {

  constructor(
    @InjectRepository(PizzaEntity)
    private pizzaRepository: Repository<PizzaEntity>,
  )  {}

  async create(createPizzaDto: CreatePizzaDto): Promise<PizzaEntity> {
    const pizza = this.pizzaRepository.create(createPizzaDto);
    return await this.pizzaRepository.save(pizza);
  }

  async findAll(): Promise<PizzaEntity[]> {
    return await this.pizzaRepository.find();
  }

  async findOne(id: number) : Promise<PizzaEntity> {
    return await this.pizzaRepository.findOneBy({ pizza_id: id });
  }

  async update(id: number, updatePizzaDto: UpdatePizzaDto) : Promise<PizzaEntity> {
    await this.pizzaRepository.update(id, updatePizzaDto)
    return this.pizzaRepository.findOneBy ({pizza_id : id});
  }

  async remove(id: number) {
    return await this.pizzaRepository.delete(id);
  }
}
