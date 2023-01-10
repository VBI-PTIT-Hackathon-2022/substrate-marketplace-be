import { Module } from '@nestjs/common';
import { OrderTradingService } from './orderTrading.service';
import { OrderTradingController } from './orderTrading.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderTrading, OrderTradingSchema } from './orderTrading.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderTrading.name, schema: OrderTradingSchema },
    ]),
  ],
  providers: [OrderTradingService],
  controllers: [OrderTradingController],
  exports: [OrderTradingService, MongooseModule],
})
export class OrderTradingModule {}
