import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { createOrderDto } from './dtos/createOrder.dto';
import { Products } from 'src/entities/product.entity';
import { OrderDetails } from 'src/entities/order-detail.entity';
import { GetOrderDto } from './dtos/getOrderDto.dto';

@Injectable()
export class OrderDbService {
    private productsFounds: Products[]
    constructor(@InjectRepository(Orders) private orderRepositoryDb: Repository<Orders>, @InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Products) private productRepository:Repository<Products>, @InjectRepository(OrderDetails) private orderDeatilRepository: Repository<OrderDetails>) {
        this.productsFounds = []
    }

    addOrder = async (order: createOrderDto):Promise<any> => {
        
        let total = 0
        const {idUser,products} = order

        const date = new Date();
        const [month, day, year] = [
            date.getMonth(),
            date.getDate(),
            date.getFullYear(),
        ];

        try {
            //  1. Buscar un usuario por id
            const userFound: User = await this.userRepository.findOneBy({ id: idUser })
            if (!userFound) throw new BadRequestException('No se pudo obtener el usuario')

            //  2. Crear un registro en la tabla order con el usuario encontrado
            const newOrder: Orders = this.orderRepositoryDb.create({
                date: `${month}/${day}/${year}`,
                user:userFound
            })
            const orderSaved: Orders = await this.orderRepositoryDb.save(newOrder)
            if(!orderSaved) throw new BadRequestException('Hubo un error al guardar la orden')

             //  3. Buscar los productos recibidor en la request por id
             // * No se muestran productos con stock igual a 0
             // ** Actualizar total de compra
                // ** Reducir el stock de cada producto especifico
             const productsArray = await Promise.all(
                products.map(async (element) => {
                    const producFound:Products = await this.productRepository.findOneBy({
                       id: String(element.id)
                    })

                    if(!producFound) throw new Error('Hubo un error al encontrar el producto con id ' + element.id)

                    if(producFound.stock > 0) {
                        await this.productRepository.update({
                            id:producFound.id
                        },{stock:producFound.stock - 1})

                        total+=Number(producFound.price)

                      
                    }

                  
                    return producFound
                })
             )  
             const productsStock:Products[] = productsArray.filter((product) => product.stock > 0)


            // Construye y registra un detalle de compra con los productos seleccionados.
           


             const newOrderDetail = this.orderDeatilRepository.create({
                price:total,
                products: productsStock
             })
             
             const orderDetailCreated:OrderDetails = await this.orderDeatilRepository.save(newOrderDetail)
             if(!orderDetailCreated) throw new BadRequestException('Hubo un erro al crear el detalle de compra')

             await this.orderRepositoryDb.update(
                {id:orderSaved.id},{order_detail: orderDetailCreated}
             )

              // Devuelve la orden de compra con el precio y id del detalle de compra.
              return this.orderRepositoryDb.findOne({
                where:{id:orderSaved.id},
                relations:['order_detail']
                // relations:['order_detail','order_detail.products'] //Asi me traigo las relaciones de la relacion
              })

        } catch (error) {
            throw new BadRequestException(error.message)
        }

        



    }

    getOrder = async (idObject:GetOrderDto):Promise<Orders>  => {
        
        if(!idObject) throw new BadRequestException('Hubo un error al obtener el id')
        const {id} = idObject

        try {
            const order = await this.orderRepositoryDb.findOne({
                where:{id:id},relations:['order_detail','order_detail.products']
            })
            if(!order) throw new BadRequestException('Hubo un eror el encontrar la orden')
            return order
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
