import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderDbService } from './order-db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { Products } from 'src/entities/product.entity';
import { OrderDetails } from 'src/entities/order-detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Orders,User,Products, OrderDetails])],
  providers: [OrderRepository, OrderService, OrderDbService],
  controllers: [OrderController]
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //Add some middleware here
    // consumer.apply().forRoutes()
  }
}
