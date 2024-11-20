import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { createOrderDto } from './dtos/createOrder.dto';
import { GetOrderDto } from './dtos/getOrderDto.dto';
import { Orders } from 'src/entities/order.entity';

@Injectable()
export class OrderService {

    constructor(private readonly orderReposiroty: OrderRepository ){}

    addOrder = async (order: createOrderDto) => {
        const {idUser, products} = order
        try {
            return await this.orderReposiroty.addOrder({idUser,products})
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }


    getOrder = async (idObject:GetOrderDto):Promise<Orders> => {
        const {id} = idObject
        try {
            return await this.orderReposiroty.getOrder({id})
        } catch (error) {
            throw new BadRequestException(error.message)       
        }
    }
    
}
