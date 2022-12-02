import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UpdateUserDto from './dto/user.update.dto';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { User, UserDocument } from './user.schema';
import { HttpService } from '@nestjs/axios';
import { NftService } from '../nft/nft.service';
import { lastValueFrom } from 'rxjs';
import { QueryParamDto } from '../entity/query-param.dto';
import CreateNftDto from '../nft/dto/nft.create.dto';

@Injectable()
export class UserService {
  wsProvider;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => NftService))
    private readonly nftService: NftService,
  ) {
    this.wsProvider = new WsProvider('ws://127.0.0.1:9944');
  }

  async getUser(walletAddress: string, query: QueryParamDto) {
    const userCurrent = await this.userModel.findOne({
      walletAddress: walletAddress,
    });
    if (!userCurrent) return [];
    const nft = await this.nftService.getNFTWithUser(userCurrent._id, query);
    return this.userModel.aggregate([
      {
        $match: {
          _id: userCurrent._id,
        },
      },
      {
        $addFields: {
          nfts: nft,
        },
      },
    ]);
  }

  async getNFTRented(walletAddress: string) {
    const userCurrent = await this.userModel.findOne({
      walletAddress: walletAddress,
    });
    if (!userCurrent) return [];
    const nft = await this.nftService.getNFTRented(walletAddress);
    return nft;
  }

  async create(walletAddress, userData: UpdateUserDto, query: QueryParamDto) {
    const userCurrent = await this.getUser(walletAddress, query);
    if (userCurrent.length > 0 || userData['name'] === undefined) {
      return userCurrent[0];
    }
    userData['walletAddress'] = walletAddress;
    const user = await this.userModel.create(userData);

    const api = await ApiPromise.create({
      provider: this.wsProvider,
    });
    const account: any = await api.query.nftCurrency.listOwned(walletAddress);
    const nftArray = [];
    for (let i = 0; i < account.length; i++) {
      const nft = await api.query.nftCurrency.tokenUri(account[i]);
      const uri = this.nftService.hex_to_ascii(nft.toHex());
      let nftInfor: CreateNftDto;
      if (uri.length > 2) {
        const { data } = await lastValueFrom(
          this.httpService.get<any>(uri.slice(2)).pipe(),
        );
        nftInfor = data;
      }
      nftInfor.userId = user._id;
      nftInfor.tokenId = account[i];
      nftInfor.walletAddress = user.walletAddress;
      nftInfor.custodian = user.walletAddress;
      nftInfor.status = 'none';
      nftArray.push(nftInfor);
    }

    await this.nftService.createNft(nftArray);
    const res = await this.getUser(walletAddress, query);
    return res[0];
  }

  async update(walletAddress, updateUserDto: UpdateUserDto) {
    try {
      await this.userModel.findOneAndUpdate(walletAddress, updateUserDto);
      return {
        success: true,
      };
    } catch (error) {
      throw new BadRequestException('bad request exception');
    }
  }

  async getOne(walletAddress: string) {
    return this.userModel.findOne({ walletAddress: walletAddress });
  }
}
