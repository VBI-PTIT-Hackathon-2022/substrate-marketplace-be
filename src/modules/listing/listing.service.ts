import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Listing, ListingDocument } from './listing.schema';
import CreateListingDto from './dto/listingcreate.dto';
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
    const pageSize = +query.pageSize || 5;
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
          lender: walletAddress,
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

  async cancel(tokenId: string) {
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
    const pageSize = +query.pageSize || 5;
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
        $lookup: {
          from: 'nfts',
          localField: 'tokenId',
          foreignField: 'tokenId',
          as: 'nfts',
        },
      },
      {
        $project: {
          nfts: 1,
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
