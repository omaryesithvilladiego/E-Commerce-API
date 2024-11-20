import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import {v2 as cloudinary} from 'cloudinary'
import toStream = require('buffer-to-stream')
@Injectable()
export class FileUploadRepository {

    //hacer la carga de archivos a cloudinary
    uploadImage = async (file:Express.Multer.File):Promise<UploadApiResponse> => {
        return new Promise((resolve,reject) => {
            const upload = cloudinary.uploader.upload_stream({
                resource_type:'auto'
            },(error,result) => error? reject(error): resolve(result)) 
            toStream(file.buffer).pipe(upload)
        })
        
    }
}
