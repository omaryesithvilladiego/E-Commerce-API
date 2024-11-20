import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_PORT } from './helpers/development-env';
import { STEP_API } from './utils/stepApi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors()
  app.useGlobalPipes(new ValidationPipe());
  const swaggerOptions = new DocumentBuilder()
    .setTitle('NestJS Api - E-commerce FST53 Omar Villadiego')
    .setDescription(STEP_API)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);
  
  console.log(`Server running on port http://localhost:${APP_PORT}`);
  await app.listen(APP_PORT);
}

bootstrap();
