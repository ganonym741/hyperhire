import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionMiddleware } from '@core/common/middleware/exception.middleware';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaModel } from './@entities';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {

    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    },
    logger: ['error', 'warn', 'log', 'debug', 'verbose', 'fatal'],
  });

  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new ExceptionMiddleware());
  

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        throw new BadRequestException({
          message: 'Validation error',
          error_detail: errors.map((err) => {
            return {
              field: err.property,
              message: Object.values(err.constraints).join(', '),
            };
          }),
        });
      },
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: false,
      // transformOptions: { enableImplicitConversion: true },
    })
  );
  

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Hyper Hire')
      .setDescription('Endpoint assignmnet of hyperhire')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [...PrismaModel.extraModels],
    });

    SwaggerModule.setup('/docs', app, document);
  }
  
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
