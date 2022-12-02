import {
  Body,
  Controller, Get,
  HttpCode,
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
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { USER_SWAGGER_RESPONSE } from './user.constant';
import UpdateUserDto from './dto/user.update.dto';
import { QueryParamDto } from '../entity/query-param.dto';

@ApiBearerAuth()
@Controller('users')
@ApiTags('User')
//@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post(':walletAddress')
  @ApiOperation({ summary: 'api get user with nft ' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(USER_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @HttpCode(200)
  create(
    @Param('walletAddress') walletAddress: string,
    @Body() body: UpdateUserDto,
    @Query() query: QueryParamDto,
  ) {
    const data = { name: body.name };
    return this.userService.create(walletAddress, data, query);
  }

  @Get(':walletAddress')
  @ApiOperation({ summary: 'api get user name ' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(USER_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @HttpCode(200)
  get(@Param('walletAddress') walletAddress: string) {
    return this.userService.getOne(walletAddress);
  }

  @Get('/rent/:walletAddress')
  @ApiOperation({ summary: 'api get nft that user rents ' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(USER_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @HttpCode(200)
  getNFTRented(@Param('walletAddress') walletAddress: string) {
    return this.userService.getNFTRented(walletAddress);
  }

  @Patch(':walletAddress')
  @ApiParam({
    name: 'walletAddress',
  })
  @ApiOperation({ summary: ' update user' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(USER_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  update(@Param('walletAddress') walletAddress, @Body() body: UpdateUserDto) {
    return this.userService.update(walletAddress, body);
  }
}
