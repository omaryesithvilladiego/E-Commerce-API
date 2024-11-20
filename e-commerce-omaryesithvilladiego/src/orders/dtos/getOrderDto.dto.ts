import { IsUUID } from "class-validator";

export class GetOrderDto {

    /**
     * Debe ser un uui valido
     * @example "ee97b535-c542-4a0e-a6bd-fd2e1fee2856"
     */
    @IsUUID('all', {message:'No es un uuid valido'})
    id?:string
}