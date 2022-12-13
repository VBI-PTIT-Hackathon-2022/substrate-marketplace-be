import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { QueryParamDto } from '../entity/query-param.dto';
import { UserService } from '../user/user.service';
import CreateNftDto, { AddNftDto, SetUriNftDto } from './dto/nft.create.dto';

import { Nft, NftDocument } from './nft.schema';
import UpdateNftDto from './dto/nft.update.dto';

@Injectable()
export class NftService {
  constructor(
    @InjectModel(Nft.name) private nftModel: Model<NftDocument>,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async createNft(data: CreateNftDto[]) {
    const nft = await this.nftModel.insertMany(data);
    return {
      data: nft,
    };
  }

  async getNFTWithUser(id: string, query: QueryParamDto) {
    const pageSize = +query.pageSize || 20;
    const pageIndex = +query.pageIndex || 1;
    let condition;
    if (query.tokenId) {
      condition = {
        tokenId: query.tokenId,
      };
    }
    const nft = await this.nftModel.aggregate([
      {
        $match: {
          userId: id,
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
    return nft;
  }

  async getNFTRented(walletAddress: string) {
    const nft = await this.nftModel.aggregate([
      {
        $match: {
          custodian: walletAddress,
        },
      },
    ]);
    return nft;
  }

  async addNft(data: AddNftDto) {
    const user = await this.userService.getOne(data.walletAddress);
    if (user) {
      data.userId = user._id;
      data.walletAddress = data.walletAddress;
      return this.nftModel.create(data);
    }
  }

  async update(tokenId, data: UpdateNftDto) {
    try {
      await this.nftModel.findOneAndUpdate({ tokenId: tokenId }, data);
      return {
        success: true,
      };
    } catch (error) {
      throw new BadRequestException('bad request exception');
    }
  }

  async getNft(tokenId: string) {
    return this.nftModel.findOne({ tokenId: tokenId });
  }

  async getAllNft() {
    return this.nftModel.find();
  }

  async getNftOwned(walletAddress: string) {
    const nfts = this.nftModel.find({
      $or: [
        {
          walletAddress: walletAddress,
        },
        {
          custodian: walletAddress,
        },
      ],
    });
    console.log('get owned nft ', nfts);
    return nfts;
  }

  async setUri(setUriNftDto: SetUriNftDto) {
    const uri = this.hex_to_ascii(setUriNftDto.uri);
    try {
      const { data } = await lastValueFrom(
        this.httpService.get<any>(uri.slice(1)).pipe(),
      );
      return this.nftModel.findOneAndUpdate(
        { tokenId: setUriNftDto.tokenId },
        data,
      );
    } catch (error) {}
  }
  hex_to_ascii(str1: string) {
    const hex = str1.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }
}
