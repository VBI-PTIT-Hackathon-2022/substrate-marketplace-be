import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Listing, ListingDocument } from './listing.schema';
import CreateListingDto from './dto/listing.create.dto';
import UpdateListingDto from './dto/listring.update.dto';
import { QueryParamDto } from '../entity/query-param.dto';

@Injectable()
export class ListingService {
  constructor(
    @InjectModel(Listing.name) private listingModel: Model<ListingDocument>,
  ) {}

  async createListing(createListing: CreateListingDto) {
    return this.listingModel.create(createListing);
  }

  async updateListing(id: string, updateListingDto: UpdateListingDto) {
    try {
      await this.listingModel.findByIdAndUpdate(id, updateListingDto);
      return {
        data: {
          success: true,
        },
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  getList(walletAddress: string, query: QueryParamDto) {
    const pageSize = +query.pageSize || 20;
    const pageIndex = +query.pageIndex || 1;
    let condition;
    if (!query.tokenId) {
    } else {
      if (query.isTrading == 'false') {
        condition = {
          tokenId: query.tokenId,
          isTrading: false,
        };
      } else {
        condition = {
          tokenId: query.tokenId,
          isTrading: true,
        };
      }
    }
    return this.listingModel.aggregate([
      {
        $match: {
          maker: walletAddress,
          ...condition,
        },
      },
      {
        $skip: (pageIndex - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
    ]);
  }

  getListing(message: string) {
    return this.listingModel.find([{ message: message }]);
  }

  async cancel(message: string) {
    try {
      await this.listingModel.deleteOne({ message: message });
    } catch (error) {
      throw new BadRequestException();
    }
    return {
      data: {
        Delete: true,
      },
    };
  }

  async cancelListing(tokenId: string) {
    try {
      await this.listingModel.deleteOne({ tokenId: tokenId });
    } catch (error) {
      throw new BadRequestException();
    }
    return {
      data: {
        Delete: true,
      },
    };
  }

  getNft(query: QueryParamDto) {
    const pageSize = +query.pageSize || 20;
    const pageIndex = +query.pageIndex || 1;
    let condition;
    if (query.tokenId) {
      condition = {
        tokenId: query.tokenId,
      };
    }
    return this.listingModel.aggregate([
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
    ]);
  }
}
