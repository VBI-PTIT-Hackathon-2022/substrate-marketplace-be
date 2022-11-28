import { Controller, Get, Param } from '@nestjs/common';
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
}
