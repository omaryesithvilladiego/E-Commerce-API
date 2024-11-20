import { BadRequestException, Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { createOrderDto } from './dtos/createOrder.dto';
import { OrderService } from './order.service';
import { GetOrderDto } from './dtos/getOrderDto.dto';
import { Orders } from 'src/entities/order.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/roles.enum';


@ApiTags('orders')
@Controller('/orders')
@ApiBearerAuth()
export class OrderController {
    constructor(private readonly orderService: OrderService){}


    @Role(Roles.USER, Roles.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    async addOrder(@Body() order:createOrderDto ) {
        const {idUser, products} = order
        if(!idUser || !products) return new BadRequestException('Para hacer la compra debe proporcionar el id del usuario y los productos')
        try {
            return await this.orderService.addOrder({idUser,products})
        } catch (error) {
            return error.message
        }
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Role(Roles.ADMIN,Roles.USER)
    @Get(':id')
    async getOrder (@Param('id', ParseUUIDPipe) idObject:string) {
        const id = {id:idObject}        
        try {
            return await this.orderService.getOrder(id)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    
}
