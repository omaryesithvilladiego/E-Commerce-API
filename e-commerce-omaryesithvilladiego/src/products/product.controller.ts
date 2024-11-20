import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateProductDto } from './dtos/createProduct.dto';
import { NotFoundError } from 'rxjs';

@ApiTags('products')
@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiQuery({ name:'page', required:false })
  @ApiQuery({ name:'limit', required:false })
  async getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    try {
      if (!page || !limit) return new Error('todo los datos se requiren');
      const products = await this.productService.getAllProducts(page, limit);
      if(!products) throw new NotFoundException('Hubo un error al obtener los productos')
      if(products.length === 0) throw new NotFoundException('No hay productos agregados')
      return products
      
    } catch (error) {
      return  error
    }
   
  }

  @Get('/seeder')
  async addProducts() {
    try {
      return await this.productService.addProductos()
    } catch (error) {
      return new BadRequestException(error.message)
    }
  }
  

  @UseGuards(AuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  @ApiBearerAuth()
  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    try {
      const response = await this.productService.createNewProduct(product);
      if(!response) throw new NotFoundException('Hubo un error al crear el producto')
      return response
      
    } catch (error) {
      return  new BadRequestException(error.message)
    }
  }

  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Put(':id')
  async updateProductById(
    @Param('id', ParseUUIDPipe) idProduct: string,
    @Body() product: UpdateProductDto,
  ) {

    try {
      const response = await this.productService.updateProduct (idProduct, product);
      if(!response) throw new NotFoundException('Hubo un error al actualziar el producto')
      return response

    } catch (error) {
      return new BadRequestException(error.message)
    }
  }


  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async deleteProductById(@Param('id', ParseUUIDPipe) idproduct: string) {
    try {
      const response = await this.productService.deleteProduct(idproduct);
      if(!response) throw new NotFoundException('Hubo un error al eliminar el producto')
      return response
    } catch (error) {
      return new BadRequestException(error.message) 
    }
  }


  @HttpCode(200)
  @Get(':id')
  async getProductById(@Param('id', ParseUUIDPipe) productId: string) {
    try {
      const productFound = await this.productService.getProductById(productId);
      if(!productFound) throw new NotFoundException('Hubo un error al obtener el usuario')
      return productFound
    } catch (error) {
      return new BadRequestException(error.message)
    }
  }

}
