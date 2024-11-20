import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth-service/auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dtos/user.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('auths')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  // @Get()
  // getCredentials() {
  //   return 'Obteniendo todas la crendenciales...';
  // }


  @Post('/signup')
  async signup(@Body() user: CreateUserDto) {
    try {
      const userCreated = await this.authService.signup(user)
      if(!userCreated) throw new BadRequestException('Hubo un error al crear el usuario')
      return userCreated
    } catch (error) {
      return error.message
    }
  }

  @Post('/signin')
  signinUser(@Body() credentials: LoginUserDto) {
    if (!credentials) return 'todos los datos son requeridos';
    return this.authService.signinUser(credentials);
  }
}
