import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class AuthValidateMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    if (!req.body) return 'Se requieren datos';
    const { email, password } = req.body;
    if (!email || !password) return 'Todos los datos son requeridos';
    next();
  }
}
