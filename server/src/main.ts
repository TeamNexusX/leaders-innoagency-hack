import { NestFactory } from '@nestjs/core';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as cors from 'cors'
import * as path from 'path'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors()
  app.use(express.static(path.resolve('src/static')))

  const ApiDocsConfig = new DocumentBuilder()
    .setTitle('Документация к единому сервису бронирования креативных площадок города Москвы.')
    .setDescription('Решение 1 трека | Хакатон "Лидеры цифровой трансформации 2023" | NexusX Team')
    .setVersion('1.0.0')
    .addTag('NexusX Team')
    .build()
    
  const document = SwaggerModule.createDocument(app,ApiDocsConfig)
  SwaggerModule.setup('/docs',app,document)


  await app.listen(9999,() =>{
    console.log(`Server started http://localhost:${9999}`);
  });
}
bootstrap();