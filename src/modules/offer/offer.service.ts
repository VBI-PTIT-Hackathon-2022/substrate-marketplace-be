import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer, OfferDocument } from './offer.schema';
import { CreateOfferDto } from './dto/offer.create.dto';
import UpdateOrderDto from './dto/offer.update.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name) private orderModel: Model<OfferDocument>,
  ) {}

  async createOffer(createOffer: CreateOfferDto) {
    return this.orderModel.create(createOffer);
  }

  async updateOffer(id: string, updateOfferDto: UpdateOrderDto) {
    try {
      await this.orderModel.findByIdAndUpdate(id, updateOfferDto);
      return {
        data: {
          success: true,
        },
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteOffer(id: string) {
    try {
      await this.orderModel.findOneAndDelete({
        id: id,
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

  async getOffer(tokenId: string) {
    try {
      return await this.orderModel.find({ tokenId: tokenId });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
