import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const corsOptions = {
  origin: ['http://localhost:3000', 'https://etq-amsterdam.vercel.app'],
  credentials: true,
  secure: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Fasion BE')
    .setDescription('The fashion API description')
    .setVersion('1.0')
    .addTag('fashion')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors(corsOptions);
  app.use(cookieParser());
  await app.listen(3001);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
