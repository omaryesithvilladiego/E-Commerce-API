import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/cotegorie.entity';
import { Products } from 'src/entities/product.entity';
import { data } from 'src/utils/data';
import { Not, Repository } from 'typeorm';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { CreateProductDto } from './dtos/createProduct.dto';

@Injectable()
export class ProductDbService {
    constructor(@InjectRepository(Products) private productRepository: Repository<Products>, @InjectRepository(Category) private categoryRepository: Repository<Category>) {

    }

    addProduct = async (product: CreateProductDto): Promise<Products> => {
        const { name, description, stock, price, category } = product
        try {
            const categoryFound = await this.categoryRepository.findOneBy({ name: category })
            if (!categoryFound) throw new NotFoundException('No existe la categoria que desea asociar al producto')
            const productCreated: Products = this.productRepository.create({
                name,
                description,
                stock,
                price,
                category: categoryFound
            })
            const productSaved:Products = await this.productRepository.save(productCreated)
            if(!productSaved) throw new NotFoundException('Hubo un error al guardar el producto')
            return productSaved
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    getProduts = async (page: number, limit: number): Promise<Products[]> => {
        const start = (page - 1) * limit

        const end = page + limit
        try {
            const products = await this.productRepository.find({ relations: ['category'] })
            if(!products) throw new BadRequestException('Hubo un error al obtener los productos')  
            const viewProduct = products.slice(start, end)          
            return viewProduct
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    addproducts = async (): Promise<String> => {
        const categories: Category[] = await this.categoryRepository.find()

        try {
            data?.map(async (element) => {
                const category: Category = categories.find((category) => category.name === element.category)


                const newProduct = this.productRepository.create({
                    name: element.name,
                    description: element.description,
                    imgUrl: element.imgUrl,
                    price: element.price,
                    stock: element.stock,
                    category: category
                })

                this.productRepository.createQueryBuilder()
                    .insert()
                    .into(Products)
                    .values(newProduct)
                    .orUpdate(['description', 'imgUrl', 'price', 'stock'], ['name'])
                    .orIgnore('name')
                    .execute()
            })
            return 'Prodcutos agregados'
        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    getProductById = async (idProduct: string): Promise<Products> => {
        try {
            const productFound = await this.productRepository.findOne({
                where: {
                    id:idProduct
                }, relations:['category']
            }, )
            if (!productFound) throw new NotFoundException('El producto que intenta obtener no existe')
            return productFound
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    updateProducts = async (idProduct: string, product: UpdateProductDto): Promise<string> => {
        let categoryFound: Category
        if (!idProduct || !product) throw new NotFoundException('Todos los datos son requeridos')
        try {
            const productFound = await this.productRepository.findOneBy({ id: idProduct })
            if (!productFound) throw new NotFoundException('El producto que quiere actualizar no existe')
            if (product.category) {
                categoryFound = await this.categoryRepository.findOneBy({ name: product.category })
                if (!categoryFound) throw new NotFoundException('La categoria que quiere agregar no existe')
                const { category, ...productNoCategory } = product
                const productUpdate: any = await this.productRepository.update({ id: idProduct }, { ...productNoCategory, category: categoryFound })

                return 'Producto actualizado'
            } else {
                const { category, ...productNoCategory } = product
                await this.productRepository.update({ id: idProduct }, productNoCategory)
                return 'Producto actualizado'
            }

        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    deleteProductById = async (idProduct: string): Promise<string> => {

        try {
            if (!idProduct) throw new NotFoundException("Hubo un error al obtener el id del producto")
            const producFound = await this.productRepository.findOneBy({ id: idProduct })
            if (!producFound) throw new NotFoundException("El producto que quiere eliminar ya ha sido eliminado")
            const productDelete = await this.productRepository.delete({ id: idProduct })

            if (!productDelete) throw new BadRequestException("Hubo un error al eliminar el producto")
            return `Product con id ${producFound.id} se eliminó con exito`
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}

