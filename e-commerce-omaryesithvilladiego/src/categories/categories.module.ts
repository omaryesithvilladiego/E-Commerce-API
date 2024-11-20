import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { CategoriesDbService } from './categories-db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/cotegorie.entity';
import { ApiTags } from '@nestjs/swagger';



@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository, CategoriesDbService],
})
export class CategoriesModule {}
