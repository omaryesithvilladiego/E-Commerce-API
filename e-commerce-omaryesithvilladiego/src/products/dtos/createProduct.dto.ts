import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsDivisibleBy, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, MaxLength } from "class-validator";


export class CreateProductDto {



    /**
     * El nombre del producto debe ser un string de maximo 50 caracteres
     * @example 'Iphone 16 Pro Max'
     */
    @IsNotEmpty({message:'El nombre no puede estar vacio'})
    @MaxLength(50,{message:'El nombre no puede tener mas de 50 caracteres'})
    @IsString()
    name?:string


    /** 
     * La descripcion no puedde estar vacia
     * @example 'The best mobile device around the world'
    */
    @IsNotEmpty({message:'La descripcion no puede estar vacia'})
    @IsString()
    description?:string


    /**
     * El precio debe ser un numero con dos posiciones  decimales
     * @example '10.34'
     */
    @IsNotEmpty({message:'El precio no puede estar vacio'})
    @IsPositive({message:'El precio no puede ser un numero negativo'})
    price?:number

    /**
     * El stock del producto no puede estar vacío y debe ser un número entero no negativo
     * @example '8'
     */
    @IsInt({ message: 'El stock debe ser un número entero' })
    @IsPositive({ message: 'El stock no puede ser negativo' })
    stock?: number;



    /**
     * La categoria del producto debe ser un nombre de una categoria  previammente registrada
     * @example 'smartphone'
     */
    @IsNotEmpty({message:'La categoria  del producto no puedde estar vacia'})
    @IsString()
    category:string

}