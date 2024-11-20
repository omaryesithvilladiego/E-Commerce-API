import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor(private readonly fileUpload: FileUploadRepository, @InjectRepository(Products) private productRepository: Repository<Products>) {}

    uploadImage = async  (file:Express.Multer.File, productId:string) => {

        const product:Products = await this.productRepository.findOneBy({
            id:productId
        })
        if(!product) throw new NotFoundException('El producto no existe')
        const fileUrl = (await this.fileUpload.uploadImage(file)).secure_url
        await this.productRepository.update({
            id:productId
        },{imgUrl:fileUrl})
        
        return `La imagen del producto con id ${productId} se actualizo con exito`
    }
}
