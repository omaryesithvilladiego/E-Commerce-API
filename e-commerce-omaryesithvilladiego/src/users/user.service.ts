import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto, UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';
import { PaginationDto } from './dtos/pagination.dto';
import { CreateUserDto } from './dtos/user.dto';
import { createOrderDto } from 'src/orders/dtos/createOrder.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public getUsers = async (pagination:PaginationDto): Promise<User[]> => {
    const {page,limit} = pagination
    try {
      return await this.userRepository.getUsers({page, limit})
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  };

  public getUserById = async (idUser: string) => {
    try {
      return await this.userRepository.getUserById(idUser);
    } catch (error) {
      throw new BadRequestException(error.message) 
    }
  } 

  createUser = async (user: CreateUserDto):Promise<Omit<User, 'password'> | Error | number> => await this.userRepository.createUserRepository(user);

    
  updateUser = async (
    idUser: string,
    user: UpdateUserDto,
  ):Promise<Omit<User, 'password'> | string | Error>  => {
    return await this.userRepository.updateUserRepository(idUser, user);
  };

  deleteUserService = async (idUser: string): Promise<string> => {
    return await this.userRepository.deleteUserRepository(idUser);
  };
}
