import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesDbService } from './categories-db.service';
import { Category } from 'src/entities/cotegorie.entity';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly categoriesDbService: CategoriesDbService) {}

  getCategories = async (): Promise<Category[]> => {
    try {
      const categories = await this.categoriesDbService.getCategories();
      if (!categories)
        throw new BadRequestException(
          'Hubo un error al obtener las categorias',
        );
      return categories;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  };

  addCategories = async () => {
    try {
      return this.categoriesDbService.addCategories()
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  
}
