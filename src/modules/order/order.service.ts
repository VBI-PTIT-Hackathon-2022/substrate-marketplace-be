import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import CreateOrderDto from './dto/ordercreate.dto';
import UpdateOrderDto from './dto/order.update.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(createOrder: CreateOrderDto) {
    return this.orderModel.create(createOrder);
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      await this.orderModel.findByIdAndUpdate(id, updateOrderDto);
      return {
        data: {
          success: true,
        },
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteOrder(borrower: string, tokenId: string) {
    try {
      await this.orderModel.findOneAndDelete({
        tokenId: tokenId,
        borrower: borrower,
      });
      return {
        data: {
          success: true,
        },
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
