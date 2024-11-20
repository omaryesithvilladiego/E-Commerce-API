import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderDbService } from './order-db.service';
import { createOrderDto } from './dtos/createOrder.dto';
import { GetOrderDto } from './dtos/getOrderDto.dto';
import { Orders } from 'src/entities/order.entity';

@Injectable()
export class OrderRepository {

    constructor(private readonly orderServiceDB: OrderDbService){

    }
    
    addOrder = async (order: createOrderDto) => {
        const {idUser, products} = order
        try {
            return await this.orderServiceDB.addOrder({idUser,products})
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }


    getOrder = async (idObject:GetOrderDto): Promise<Orders> => {
        const {id} = idObject
        try {
            return await this.orderServiceDB.getOrder({id})
        } catch (error) {
            throw new BadRequestException(error.message)
        }


    }
}
