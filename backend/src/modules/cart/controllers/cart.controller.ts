import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, } from '@nestjs/common';
import { role } from 'src/common/enums/role.enum';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { CartService } from '../cart.service';
import { CartEntity } from '../entities/cart.entity';
import { CreateCartDto } from '../dto/create-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(role.CUSTOMER, role.ADMIN)
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post()
    createCart(@Body() dto: CreateCartDto): Promise<void> {
        return this.cartService.createCart(dto);
    }

    @Get('user/:userId')
    getUserCart(@Param('userId', ParseIntPipe) userId: number): Promise<CartEntity[]> {
        return this.cartService.getUserCart(userId);
    }

    @Get(':id')
    getCartItem(@Param('id', ParseIntPipe) id: number): Promise<CartEntity> {
        return this.cartService.getCartItem(id);
    }

    @Patch(':id')
    updateCartItem(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCartDto): Promise<void> {
        return this.cartService.updateCartItem(id, dto);
    }

    @Delete(':id')
    deleteCartItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.cartService.deleteCartItem(id);
    }
}