import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth-service/auth.service';
import { AuthRepository } from './auth.repository';
import { AuthValidateMiddleware } from 'src/middlewares/auth-validate.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/users/user.repository';
import { UserDbService } from 'src/users/user-db.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository,UserRepository,UserDbService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthValidateMiddleware).forRoutes('auth/signin');
  }
}
