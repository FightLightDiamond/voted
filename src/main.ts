import { join } from 'path';
import { NestFactory } from '@nestjs/core';
// import { Logger } from '@nestjs/common';
// import {
//   MicroserviceOptions,
//   RedisOptions,
//   Transport,
// } from '@nestjs/microservices';
// import { TcpOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

// // Create a logger instance
// const logger = new Logger('Main');
//
// // Create microservice options object
// const microserviceOptions: TcpOptions = {
//   transport: Transport.TCP,
//   options: {
//     host: '127.0.0.1',
//     port: 8877,
//   },
// };
//
// // Create microservice options object
// const microserviceOptionsRedis: RedisOptions = {
//   transport: Transport.REDIS,
//   options: {
//     url: 'redis://localhost:6379',
//   },
// };

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, microserviceOptions);
  // await app.listen().then(() => {
  //   logger.log('Microservice is listening ...')
  // });
  //
  // const app1 = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, microserviceOptionsRedis);
  // await app1.listen().then(() => {
  //   logger.log('Microservice Redis is listening ...')
  // });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'static'));
  await app.listen(4000);
}
void bootstrap();
