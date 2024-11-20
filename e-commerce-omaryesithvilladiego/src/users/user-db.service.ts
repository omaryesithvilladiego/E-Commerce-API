import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from './dtos/pagination.dto';
import { CreateUserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UserDbService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {

  }

  createUser = async (user: Omit<CreateUserDto, 'confirmPassword'> ):Promise<Omit<User, 'password'>>  => {
    const {name,email,password,phone,country,address,city} = user
    try {
      const userCreated = this.userRepository.create({
        name,
        email,
        password,
        phone,
        country,
        address,
        city
        })
      
      const userSaved = await this.userRepository.save(userCreated)
      if(userSaved) {
        const {password,...userNoPassword} = userSaved
        return userNoPassword

      }  else {        throw new NotFoundException('Hubo un error al crear el usuario')
    }
    } catch (error) {
        throw error.message
    }
  
  } 

  getUsers = async (pagination:PaginationDto):Promise<User[]> => {
    const {page,limit} = pagination
    const start = (page - 1) * limit
   const end = start + limit
    try {
      const users:User[] = await this.userRepository.find()
      if(!users) throw new NotFoundException('Hubo un error al obtener los usuarios')
      const userNoPassword:User[] = users.map(({password,...user}) => user)

      return userNoPassword.slice(start,end)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  getUserById = async (id:string):Promise<User> => {
    if(!id) throw new BadRequestException('Hubo un error al obtener el id del usuario')
    try {
      const user = await this.userRepository.findOne({
        where:{
          id
        },relations:['orders']
      },)
      if(!user) throw new NotFoundException('Hubo un error al obtener el usuario requerido')
      return user
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  updateUser = async (idUser:string,user: UpdateUserDto):Promise<Omit<User, 'password'> | Error | string> => {
      try {
        const {confirmPassword, ...userNoPasswordConfirm} = user
        if(!user) throw new NotFoundException('No se obtuvo ningun usuario por parametro')
        await this.userRepository.update({
         id:idUser 
        },
        userNoPasswordConfirm
        )
        return 'Usuario actualizado correctamente'
      } catch (error) {
        throw new BadRequestException(error.message)
      }
  }

  deleteUser = async (idUser:string):Promise<string> => {
    try {
      const userFound = await this.userRepository.findOneBy({id:idUser})
      if(!userFound) throw new BadRequestException('El usuario que desea elminar ya se encuentra eliminado')
      const userDeleted = await this.userRepository.delete({
        id:idUser
      },)
      
      return 'El usuario de elimino satisfactoriamente'
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  findUserByEmail = async (email:string): Promise<User> => {
    try {
      if(!email) throw new BadRequestException('Email required')
      const userFound:Promise<User> = this.userRepository.findOneBy({
        email:email
      })
      if(!userFound) throw new NotFoundException('Husuario no encontrado')
      return userFound
    } catch (error) {
      throw new BadGatewayException(error.message)
    }
  }  
}
