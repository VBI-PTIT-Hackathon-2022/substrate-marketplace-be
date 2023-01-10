import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { QueryParamDto } from '../entity/query-param.dto';
//import { NftService } from '../nft/nft.service';
import { USER_SWAGGER_RESPONSE } from '../user/user.constant';
import CreateListingDto from './dto/listing.create.dto';
import UpdateListingDto from './dto/listring.update.dto';
import { LISTING_SWAGGER_RESPONSE } from './listing.constant';
import { ListingService } from './listing.service';

@ApiBearerAuth()
@Controller('listings')
@ApiTags('listing')
export class ListingController {
  constructor(
    private listingService: ListingService, //private nftservice: NftService,
  ) {}

  @Post('')
  @ApiOperation({ summary: 'create listing ' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(LISTING_SWAGGER_RESPONSE.CREATE_SUCCESS)
  createListing(@Body() createListing: CreateListingDto) {
    const {
      maker,
      fee,
      tokenId,
      due_date,
      paid_type,
      message,
      signature,
      isTrading,
    } = createListing;
    const data = {
      maker,
      fee,
      tokenId,
      due_date,
      paid_type,
      message,
      signature,
      isTrading,
    };
    return this.listingService.createListing(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update listing' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(LISTING_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  updateListing(
    @Param('id') id: string,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    const {
      maker,
      fee,
      tokenId,
      due_date,
      paid_type,
      message,
      signature,
      isTrading,
    } = updateListingDto;
    const data = {
      maker,
      fee,
      tokenId,
      due_date,
      paid_type,
      message,
      signature,
      isTrading,
    };
    return this.listingService.updateListing(id, data);
  }

  @Get('')
  @ApiOperation({ summary: 'danh sách nft đang listing của user ' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(LISTING_SWAGGER_RESPONSE.GET_LISTING)
  getNftNotInListing(@Query() query: QueryParamDto) {
    return this.listingService.getNft(query);
  }

  @Get(':walletAddress')
  @ApiOperation({ summary: 'lấy danh sách nft được listing của user ' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(LISTING_SWAGGER_RESPONSE.GET_LISTING)
  getLisNft(
    @Param('walletAddress') walletAddress: string,
    @Query() query: QueryParamDto,
  ) {
    return this.listingService.getList(walletAddress, query);
  }

  @Delete(':tokenId')
  @ApiOperation({ summary: 'xóa nft khỏi listing' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(LISTING_SWAGGER_RESPONSE.DELETE_SUCCESS)
  cancelListing(
    @Param('tokenId') tokenId: string,
    @Query() query: QueryParamDto,
  ) {
    if (query.isTrading == 'true') {
      return this.listingService.cancelListing(tokenId, true);
    } else {
      return this.listingService.cancelListing(tokenId, false);
    }

  }
}
