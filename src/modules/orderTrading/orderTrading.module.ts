import { Module } from '@nestjs/common';
import { OrderTradingService } from './orderTrading.service';
import { OrderTradingController } from './orderTrading.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderTradingSchema } from './orderTrading.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderTradingSchema }]),
  ],
  providers: [OrderTradingService],
  controllers: [OrderTradingController],
  exports: [OrderTradingService, MongooseModule],
})
export class OrderTradingModule {}
