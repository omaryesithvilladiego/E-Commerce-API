import { ApiHideProperty, PickType } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Matches, MaxLength, MinLength, Validate, IsEmpty } from "class-validator"
import { MatchPassword } from "./decorators/matchPassword.decorator"


export class CreateUserDto {


    /**
     * debe ser un string de entre 3 y 8 caracteres
     * @example 'Test User01'
     */
    @IsNotEmpty({message:'El nombre ddel usuario no puedde estar vacio'})
    @IsString({message:'El nombre de usuario debe ser un string'})
    @MinLength(8)
    @MaxLength(80)
    name:string


    /**
     * Debe ser un string y un email valido
     * @example 'testUser@example.com
     */
    @IsNotEmpty({message:'El email ddel usuario no puedde estar vacio'})
    @IsEmail()
    email:string

    /**
     * Debe ser un string de 8 a 15 craacteres con al menos una minuscula, una mayusuca, un numero y un caracter especial
     * @example 'aaBB34%$'
     */
    @IsNotEmpty({message:'La contrasena no puede estar vacia'})
    @IsStrongPassword()
    // @Matches(/^(?=.*[a-z])(?=.[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/ , {
    //     message:'la contrasena debe contener por lo menos una letra minuscula, una letra mayuscula, un numero y uno de los siguientes caracteres => !@#$%^&*'
    // })
    password:string

    /**
     * Debe ser un string de 8 a 15 craacteres con al menos una minuscula, una mayusuca, un numero y un caracter especial
     * @example 'aaBB34%$'
     */
    @IsNotEmpty({message:'La contrasena no puede estar vacia'})
    @Validate(MatchPassword, ['password'])
    confirmPassword:string


    /** 
     * Debe ser un string de 5 a 20 caracteres
     * @example 'Cra 22b nro 22c 23'
    */ 
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    address?:string

  

    /**
     * Debe ser de tipo numero
     * @example '123456789'
     */ 
    @IsNotEmpty({message:'El telefono del usuario no puede estar vacio'})
    phone:number


    /**
     * Debe ser un string de entre 4 y 20 craacteres
     * @example 'Peru'
     */
    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    country?:string

    /** 
     * Debe ser un string de entre 3 y 20 caracteres
     * @example 'Lima'
    */
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    city?:string


    /**
     * Debe estar vacio
     * @example ''
     */
    @IsEmpty()
    isAdmin?:boolean
    
}

export class LoginUserDto extends PickType(CreateUserDto, ['email','password']){}


