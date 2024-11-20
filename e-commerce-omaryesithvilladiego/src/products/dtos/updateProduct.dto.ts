import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {



    /**
     * Debe ser un string de 5 a 50 caracteres
     * @example "Samsung Galaxy S23"
     */
    @IsString()
    @IsOptional()
    name: string;


    /**
     * Debe ser un string de 10 a 60 caracteres
     * @example "The best smartphone in the world"
     */
    @IsOptional()
    @IsString()
    description: string;

    /**
     * debe ser de tipo numerico decimal
     * @example 10.20
     */
    @IsOptional()
    @IsNumber()
    price: number;


    /**
     * Debe ser un entero no decimal
     * @example 10
     */
    @IsOptional()
    @IsNumber()
    stock: number;

    /**
     * Debe pasar el nombre de la categoria y debe estar disponible en las categorias
     * @example "smartphone"
     */
    @IsOptional()
    @IsString()
    category: string;
   
  }