import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDbService } from './user-db.service';
import { PaginationDto } from './dtos/pagination.dto';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';


export interface UserDto {
  email: string;
  name: string;
  password: string;
  address: string;
  phone: number;
  country?: string;
  city?: string;
}

@Injectable()
export class UserRepository {
  users: User[] = [];

  constructor(private readonly userDbService: UserDbService) {
   
  }


  getUserById = async (idUser: string):Promise<User> => {
    if (!idUser) throw new Error('No se pudo obtener el id del usuario');
    try {
     return await this.userDbService.getUserById(idUser)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  };
  findUserByEmail = async (email:string) => {
    if(!email) throw new BadRequestException('Email required')
    try {
      const userFound = await this.userDbService.findUserByEmail(email)
      return userFound
    } catch (error) {
      throw new BadRequestException(error.message)
    }

  }
  getUsers = async (pagination:PaginationDto):Promise<User[]> => {
    const {page,limit} = pagination
    try {
      return await this.userDbService.getUsers({page,limit})
    } catch (error) {
      throw new BadRequestException(error.message)
    }
   
  } 

  createUserRepository = async (
    user: Omit<CreateUserDto, 'confirmPassword'> ,
  ):Promise<Omit<User, 'password'> >  => {
   return await this.userDbService.createUser(user)
  };

  updateUserRepository = async (
    idUser: string,
    user: UpdateUserDto
  ): Promise<Omit<User, 'password'> | string | Error>  => {
    return await this.userDbService.updateUser(idUser,user)
  };

  deleteUserRepository = async (idUser: string): Promise<string>  => {
  return await this.userDbService.deleteUser(idUser)
  };
}
