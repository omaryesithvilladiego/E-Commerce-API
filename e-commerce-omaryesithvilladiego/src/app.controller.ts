import { Controller, Get } from '@nestjs/common';
import { HOME_PAGE } from './utils/homePage';
import { ApiExcludeController } from '@nestjs/swagger';


@ApiExcludeController()
@Controller()
export class AppController {


@Get()
getIndex ():string {
    return HOME_PAGE
}


}
