import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/App/app.module';
import { setupSwagger } from './config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as responseTime from 'response-time';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  setupSwagger(app);

   // Validation pipe setup
   app.useGlobalPipes(new ValidationPipe({
    transform: true, // Automatically transform payloads to DTO instances
    whitelist: true, // Strip properties that do not have any decorators
  }));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(helmet());
  app.use(responseTime());

  // Swagger setup
  setupSwagger(app);



  await app.listen(3000);
}
bootstrap();
