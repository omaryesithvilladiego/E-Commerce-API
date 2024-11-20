import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/cotegorie.entity';
import { data } from 'src/utils/data';
import { Repository } from 'typeorm'



@Injectable()
export class CategoriesDbService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

    getCategories = async (): Promise<Category[]> => {
        try {
            const categories = await this.categoryRepository.find({});
            if (!categories) throw new BadRequestException('Hubo un error al obtener las categorias');
            if (categories.length <= 0) throw new BadRequestException('No hay categorias agregadas');
            return categories;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    };

    addCategories = async (): Promise<string> => {
        try {
            data?.map(async (element) => {
                return this.categoryRepository
                    .createQueryBuilder()
                    .insert()
                    .into(Category)
                    .values({ name: element.category })
                    .orIgnore()
                    .execute();
            });
            return 'Categorías agregadas';
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    };
}
