import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto, LoginUserDto } from 'src/users/dtos/user.dto';
import { Repository } from 'typeorm';
import { AuthService } from './auth-service/auth.service';


@Injectable()
export class AuthRepository {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private readonly authService:AuthService) {}

  signinUser = async (credentials: LoginUserDto) => {
    const response = 'Email o password incorrectos';
    const { email, password } = credentials;
    if (!email || !password) return 'No se obtuvieron las credenciales';

    const userFound = this.userRepository.find({
      where:{
        email: email,
        password: password
      }
    })
    // const userFound = this.userRepository.users.find(
    //   (user) => user.email === email || user.password === password,
    // );
    if (!userFound) return response;
    return userFound;
  };

  signup = async (user:Omit<CreateUserDto,'confirmPassword'>):Promise<Omit<User, 'password'>>  => {
    try {
      return await this.authService.signup(user)
    } catch (error) {
      throw error
    }
  }



}
