import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { appConfig } from './configs/configs.constants';
import { HttpExceptionFilter } from './shared/fillter/http-exception.filter';
import { NftService } from './modules/nft/nft.service';
import { OrderService } from './modules/order/order.service';
import { listenPolkadot } from './utils/listenPolkadot';
import { ListingService } from './modules/listing/listing.service';
import { OfferService } from './modules/offer/offer.service';
import { OrderTradingService } from './modules/orderTrading/orderTrading.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const nftService = app.get<NftService>(NftService);
  const orderService = app.get<OrderService>(OrderService);
  const listingService = app.get<ListingService>(ListingService);
  const offerService = app.get<OfferService>(OfferService);
  const orderTradingService = app.get<OrderTradingService>(OrderTradingService);
  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API with NestJS')
    .setDescription('API developed throughout the API with NestJS course')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(appConfig.port);
  listenPolkadot(
    nftService,
    orderService,
    listingService,
    offerService,
    orderTradingService,
  ).catch(console.error);
}
bootstrap();
