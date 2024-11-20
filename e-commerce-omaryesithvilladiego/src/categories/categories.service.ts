import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Category } from 'src/entities/cotegorie.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getCategories = async (): Promise<Category[]> => {
    try {
      const categories = await this.categoriesRepository.getCategories();
      if (!categories)
        throw new BadRequestException(
          'Hubo un error al obtener las categorias',
        );
      return categories;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  };

  addCategories = () => {
    try {
      return this.categoriesRepository.addCategories()
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
