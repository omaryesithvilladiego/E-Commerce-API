import { BadRequestException, Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('categories')
@Controller('/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}


  @Get('/seeder')
  addCategories() {
    try {
      return this.categoriesService.addCategories()
    } catch (error) {
      return new BadRequestException(error.message)
    }
  } 




  @Get()
  async getCategories() {
    try {
      const categories = await this.categoriesService.getCategories();
      if (!categories)
        throw new BadRequestException(
          'Hubo un error al obtener las categorias',
        );
      return categories;
    } catch (error) {
      return error.message;
    }
  }
}
