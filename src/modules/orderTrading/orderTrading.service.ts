import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './orderTrading.schema';
import CreateOrderDto from './dto/orderTrading.create.dto';

@Injectable()
export class OrderTradingService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(createOrder: CreateOrderDto) {
    return this.orderModel.create(createOrder);
  }
}
