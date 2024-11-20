import { Type } from 'class-transformer'
import { ArrayMinSize, ArrayUnique, IsArray, IsNotEmpty,IsUUID, ValidateNested } from 'class-validator'
import {v4 as uuid} from 'uuid'

class CreateOrderProducts {
    /**
     * Debe ser un uuid valido y no puede estar vacio
     * @example 550e8400-e29b-41d4-a716-446655440000
     */
    @IsNotEmpty({message:'Debe haber por lo menos un producto en el carrito'})
    @IsUUID()
    
    id!:string
}

export class createOrderDto {

   
    
    /**
     * Debe ser un uuid valido y no puede estar vacio
     * @example 550e8400-e29b-41d4-a716-446655440000
     */
    @IsNotEmpty({message:'El id del usuario no puede estar vacio'})
    @IsUUID()
    idUser?:string

    
    @IsArray()
    @ArrayMinSize(1, { message: 'El array de productos no puede estar vacío' })
    @ValidateNested({each:true})
    @ArrayUnique((product: CreateOrderProducts) => product.id)
    @Type(() => CreateOrderProducts)
    products?:CreateOrderProducts[]; 
}