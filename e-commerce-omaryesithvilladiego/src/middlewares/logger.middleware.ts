import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private date: Date;
  constructor() {
    this.date = new Date();
  }
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      req.method + ' Require from ' + req.originalUrl + ' at ' + this.date,
    );

    next();
  }
}
