import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { PizzaEntity } from './entities/pizza.entity';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor';

@Controller('pizzas')
@UseInterceptors(ResponseInterceptor) 
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) { }

  @Post()
  async create(@Body() createPizzaDto: CreatePizzaDto): Promise<PizzaEntity> {
    return this.pizzaService.create(createPizzaDto);
  }

  @Get()
  async findAll(): Promise<PizzaEntity[]> {
    return this.pizzaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PizzaEntity> {
    return this.pizzaService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePizzaDto: UpdatePizzaDto): Promise<PizzaEntity> {
    await this.pizzaService.update(+id, updatePizzaDto);
    return this.pizzaService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.pizzaService.remove(+id);
  }
}
