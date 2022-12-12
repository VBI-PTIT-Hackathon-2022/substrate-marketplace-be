import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { USER_SWAGGER_RESPONSE } from '../user/user.constant';
import { NFT_SWAGGER_RESPONSE } from './nft.constant';
import { NftService } from './nft.service';
import NftUpdateDto from './dto/nft.update.dto';

@ApiBearerAuth()
@Controller('nfts')
@ApiTags('Nft')
export class NftController {
  constructor(private nftService: NftService) {}

  @Get(':tokenId')
  @ApiOperation({ summary: 'api get nft detail ' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(NFT_SWAGGER_RESPONSE.CREATE_SUCCESS)
  create(@Param('tokenId') tokenId: string) {
    return this.nftService.getNft(tokenId);
  }

  @Post(':tokenId')
  @ApiOperation({ summary: 'api update data (custodian/status) of nft ' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(NFT_SWAGGER_RESPONSE.CREATE_SUCCESS)
  update(@Param('tokenId') tokenId: string, @Body() body: NftUpdateDto) {
    return this.nftService.update(tokenId, body);
  }

  @Get('/owned/:walletAddress')
  @ApiOperation({ summary: 'api get nft that user owns and rents ' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(NFT_SWAGGER_RESPONSE.CREATE_SUCCESS)
  getNFTOwned(@Param('walletAddress') walletAddress: string) {
    return this.nftService.getNftOwned(walletAddress);
  }

  @Get('')
  @ApiOperation({ summary: 'get all NFTs ' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(NFT_SWAGGER_RESPONSE.CREATE_SUCCESS)
  getAll() {
    return this.nftService.getAllNft();
  }
}
