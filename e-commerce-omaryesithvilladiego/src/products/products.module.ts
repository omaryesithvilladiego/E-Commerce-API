import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductDbService } from './product-db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/product.entity';
import { Category } from 'src/entities/cotegorie.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Products,Category])],
  providers: [ProductService, ProductRepository, ProductDbService, ProductDbService],
  controllers: [ProductController],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply any middleware here
  }
}
