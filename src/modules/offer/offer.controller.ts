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
import { USER_SWAGGER_RESPONSE } from '../user/user.constant';
import { CreateOfferDto } from './dto/offer.create.dto';
import { Offer_SWAGGER_RESPONSE } from './offer.constant';
import { OfferService } from './offer.service';
import UpdateOfferDto from './dto/offer.update.dto';
import { QueryParamDto } from '../entity/query-param.dto';

@ApiBearerAuth()
@Controller('offers')
@ApiTags('offers')
export class OfferController {
  constructor(private offerService: OfferService) {}

  @Post('')
  @ApiOperation({ summary: 'create offer' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(Offer_SWAGGER_RESPONSE.CREATE_SUCCESS)
  createOffer(@Body() createOffer: CreateOfferDto) {
    const {
      maker,
      isLender,
      tokenId,
      fee,
      due_date,
      paid_type,
      message,
      signature,
    } = createOffer;
    const data = {
      maker,
      isLender,
      tokenId,
      fee,
      due_date,
      paid_type,
      message,
      signature,
    };
    return this.offerService.createOffer(data);
  }

  @Patch(':id')
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(Offer_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  updateOffer(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    const {
      maker,
      isLender,
      tokenId,
      fee,
      due_date,
      paid_type,
      message,
      signature,
    } = updateOfferDto;
    const data = {
      maker,
      isLender,
      tokenId,
      fee,
      due_date,
      paid_type,
      message,
      signature,
    };
    return this.offerService.updateOffer(id, data);
  }

  @Delete(':id')
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(Offer_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  deleteOffer(@Param('id') id: string) {
    return this.offerService.deleteOffer(id);
  }

  @Get('/nft/:tokenId')
  @ApiOperation({ summary: 'get list of offer that nft receives' })
  @ApiOkResponse(Offer_SWAGGER_RESPONSE.GET_OFFER)
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  getOffer(@Param('tokenId') tokenId: string) {
    return this.offerService.getOffer(tokenId);
  }
}
