import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, } from '@nestjs/common';
import { role } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { PizzaService } from '../pizza.service';
import { CreatePizzaDto } from '../dto/create-pizza.dto';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { PizzaEntity } from '../entities/pizza.entity';
import { UpdatePizzaDto } from '../dto/update-pizza.dto';

@Controller('pizzas')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN)
  @Post()
  createPizza(@Body() dto: CreatePizzaDto): Promise<void> {
    return this.pizzaService.createPizza(dto);
  }

  @Get()
  getAllPizzas(): Promise<PizzaEntity[]> {
    return this.pizzaService.getAllPizzas();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN, role.CUSTOMER)
  @Get(':id')
  getPizzaById(@Param('id', ParseIntPipe) id: number): Promise<PizzaEntity> {
    return this.pizzaService.getPizzaById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN)
  @Patch(':id')
  updatePizza(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePizzaDto): Promise<void> {
    return this.pizzaService.updatePizza(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN)
  @Delete(':id')
  deletePizza(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.pizzaService.deletePizza(id);
  }
}