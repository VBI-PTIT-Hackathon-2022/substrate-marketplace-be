import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import CreateOrderDto from './dto/ordercreate.dto';
import UpdateOrderDto from './dto/order.update.dto';
import { QueryParamDto } from '../entity/query-param.dto';

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

  getOrder(query: QueryParamDto) {
    const pageSize = +query.pageSize || 5;
    const pageIndex = +query.pageIndex || 1;
    let condition;
    if (query.tokenId) {
      condition = {
        tokenId: query.tokenId,
      };
    }
    return this.orderModel
      .aggregate([
        {
          $match: {
            ...condition,
          },
        },
        {
          $skip: (pageIndex - 1) * pageSize,
        },
        {
          $limit: pageSize,
        },
      ])
      .sort({ created_at: -1 })
      .limit(1);
  }
}
