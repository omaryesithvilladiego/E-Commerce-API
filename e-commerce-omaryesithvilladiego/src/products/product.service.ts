import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { CreateProductDto } from './dtos/createProduct.dto';
import { Products } from 'src/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async getAllProducts(page: number, limit: number): Promise<Products[]>  {
    return await this.productsRepository.getProducts(page, limit);
  }

  getProductById = (id: string) => {
    if (!id) return new Error('No se pudo obtener el id');
    return this.productsRepository.getProducById(id);
  };

  createNewProduct = async (product: CreateProductDto) => {
    return await this.productsRepository.createNewProduct(product);
  };

  updateProduct = async (idProduct: string, product: UpdateProductDto) => {
    return await this.productsRepository.updateProduct(idProduct, product);
  };
  deleteProduct = async (idProduct:string) => {
    return await this.productsRepository.deleteProduct(idProduct);
  };
  addProductos = async ():Promise<String> => {
    try {
      return await this.productsRepository.addProducts()
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
