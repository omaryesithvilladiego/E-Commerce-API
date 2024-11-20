import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDbService } from './product-db.service';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { Products } from 'src/entities/product.entity';
import { CreateProductDto } from './dtos/createProduct.dto';




@Injectable()
export class ProductRepository {
  
 
  constructor(private readonly producBDrepository: ProductDbService) {
   
  }

  addProducts = async ():Promise<String> => {
    try {
      return await this.producBDrepository.addproducts()
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  getProducts = async (page: number, limit: number): Promise<Products[]>  => {
    try {
      return await this.producBDrepository.getProduts(page,limit)
    } catch (error) {
      throw error
    }   
  };

  getProducById = async (id: string) => {
    return await this.producBDrepository.getProductById(id)
  };

  async createNewProduct(productData: CreateProductDto): Promise<Products> {

    return await this.producBDrepository.addProduct(productData)
  }

  updateProduct = async (productId: string, product:UpdateProductDto ) => {
return await this.producBDrepository.updateProducts(productId,product)
  };

  deleteProduct = async (idProduct: string): Promise<string> => {
   return this.producBDrepository.deleteProductById(idProduct)
  };
}
