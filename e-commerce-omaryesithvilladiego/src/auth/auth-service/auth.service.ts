import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/users/dtos/user.dto';
import { UserRepository } from 'src/users/user.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository:UserRepository, private readonly jsonWebTokenService: JwtService) {}
 signinUser =  async (crededntials: LoginUserDto) => {
    const {email,password} = crededntials
    try {
      const userFound:User = await this.userRepository.findUserByEmail(email)
      if(!userFound) throw new UnauthorizedException('Credenciales invalidas')
      const validPassword:Boolean = await bcrypt.compare(password,userFound.password)
    if(!validPassword) throw new UnauthorizedException('Credenciales invalidas')
    const payload = {
      id:userFound.id,
      email:userFound.email,
      isAdmin:userFound.isAdmin
      }

      const token = this.jsonWebTokenService.sign(payload)

      return {
        message:'Login exitoso',
        token,
        
      }
    } catch (error) {
        throw new BadRequestException(error.message)
    }
    

  };

  async signup(user: Omit<CreateUserDto, 'confirmPassword'> ){
    let {email,password, name,address,city,country,phone} = user

    try {
      if(!email || !password) throw new BadRequestException('Email y password obligatorias para crear un usuario')
      
      const userFound = await this.userRepository.findUserByEmail(email)
      
      if(userFound) throw new NotFoundException('Email registered')

      const hashPassword = await bcrypt.hash(password,10)
      password = hashPassword
    if(!hashPassword) throw new BadRequestException('Hubo un error al hashear la password')
      const userCreated = await this.userRepository.createUserRepository({name,address,city,password,country,phone,email})
      if(!userCreated) throw new BadRequestException('Hubo un erro al guardar el usuario')
      return userCreated
    } catch (error) {
      throw new BadRequestException(error.message)
    }
   

    
   }
}
