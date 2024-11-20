import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateUserDto } from './dtos/updateUser.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(201)
  @Get()
  @ApiQuery({ name:'page', required:false })
  @ApiQuery({ name:'limit', required:false })
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    try {
      
        return await this.userService.getUsers({page,limit});

    } catch (error) {
      return new BadRequestException(error.message)
    }
  }


  @Role(Roles.ADMIN,Roles.USER)
  @UseGuards(AuthGuard,RolesGuard)
  @HttpCode(200)
  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) idUser: string) {
    if (!idUser) return new NotFoundException('No se obtubo ningun id por parametro');
    try {
      return await this.userService.getUserById(idUser);

    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


 /* Post is now in auth module  =>> signup **/ 

  // @HttpCode(201)
  // @Post()
  // async createUser(@Body() user: CreateUserDto) {
  //   if (!user) return new NotFoundException('No se obtuvo el usuario');
  //   try {
  //     return await this.userService.createUser(user);
  //   } catch (error) {
  //     return error.message
  //   }
   
  // }

  @Role(Roles.ADMIN, Roles.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  async updateUserById(@Param('id', ParseUUIDPipe)  idUser: string , @Body() user: UpdateUserDto) {
    return await this.userService.updateUser(idUser, user);
  }

  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async deleteUserById(@Param('id', ParseUUIDPipe) idUser: string) {
    return await this.userService.deleteUserService(idUser);
  }
}
