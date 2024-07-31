import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { SuccessResponseDto, ErrorResponseDto } from '../../common/dto/response.dto';
import { PizzaEntity } from './entities/pizza.entity';

@Controller('pizzas')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Post()
  async create(@Body() createPizzaDto: CreatePizzaDto): Promise<SuccessResponseDto<{ Pizza: PizzaEntity[] }> | ErrorResponseDto> {
    try {
      const pizza = await this.pizzaService.create(createPizzaDto);
      return {
        Success: true,
        Message: 'Successfully created pizza',
        Data: { Pizza: [pizza] },
      };
    } catch (error) {
      throw new HttpException({
        Success: false,
        Message: 'Failed to create pizza',
        Error: {
          Code: HttpStatus.BAD_REQUEST,
          Message: 'Pizza name is mandatory.',
        },
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<SuccessResponseDto<{ Pizza: PizzaEntity[] }>> {
    const pizzas = await this.pizzaService.findAll();
    return {
      Success: true,
      Message: 'Successfully retrieved pizzas',
      Data: { Pizza: pizzas },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SuccessResponseDto<{ Pizza: PizzaEntity }> | ErrorResponseDto> {
    const pizza = await this.pizzaService.findOne(+id);
    if (pizza) {
      return {
        Success: true,
        Message: 'Successfully retrieved pizza',
        Data: { Pizza: pizza },
      };
    } else {
      return {
        Success: false,
        Message: 'Pizza not found',
        Error: {
          Code: HttpStatus.NOT_FOUND,
          Message: 'Pizza with the given ID does not exist.',
        },
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePizzaDto: UpdatePizzaDto): Promise<SuccessResponseDto<{ Pizza: PizzaEntity }> | ErrorResponseDto> {
    try {
      const pizza = await this.pizzaService.update(+id, updatePizzaDto);
      return {
        Success: true,
        Message: 'Successfully updated pizza',
        Data: { Pizza: pizza },
      };
    } catch (error) {
      return {
        Success: false,
        Message: 'Failed to update pizza',
        Error: {
          Code: HttpStatus.BAD_REQUEST,
          Message: 'Invalid data provided.',
        },
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SuccessResponseDto<null> | ErrorResponseDto> {
    try {
      await this.pizzaService.remove(+id);
      return {
        Success: true,
        Message: 'Successfully deleted pizza',
        Data: null,
      };
    } catch (error) {
      return {
        Success: false,
        Message: 'Failed to delete pizza',
        Error: {
          Code: HttpStatus.BAD_REQUEST,
          Message: 'Failed to delete pizza with the given ID.',
        },
      };
    }
  }
}