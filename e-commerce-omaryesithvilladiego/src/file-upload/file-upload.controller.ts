import { ClassSerializerInterceptor, Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './dtos/file-upload.dto';
import { PipesConsumer } from '@nestjs/core/pipes';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/roles.enum';
import { MinSizeValidationPipe } from './pipes/MinSizeValidation.pipe';


@ApiBearerAuth()
@Role(Roles.ADMIN)
@UseGuards(AuthGuard,RolesGuard)
@Controller('/files')
@ApiTags('files')
export class FileUploadController {

    constructor(private readonly UploadFileService: FileUploadService){

    }

    @Post("/uploadImage/:id")
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload file',
        type: FileUploadDto,
      })
    @UsePipes(MinSizeValidationPipe)
    @UseInterceptors( FileInterceptor('file'))
    uploadImage(@Param("id", ParseUUIDPipe) idProduct:string,@UploadedFile(new ParseFilePipe({
        validators:[
            new MaxFileSizeValidator({
                maxSize:2000000,
                message:'File is to large'
            }),
            new FileTypeValidator({
                fileType:/gif|jpg|png|jpeg|webp|svg/
            })
        ]
    })
    ) file:Express.Multer.File) {
        return this.UploadFileService.uploadImage(file,idProduct)
    }
}
