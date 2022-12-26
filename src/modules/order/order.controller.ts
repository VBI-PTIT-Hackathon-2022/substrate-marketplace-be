import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { USER_SWAGGER_RESPONSE } from '../user/user.constant';
import CreateOrderDto from './dto/order.create.dto';
import UpdateOrderDto from './dto/order.update.dto';
import { Order_SWAGGER_RESPONSE } from './order.constant';
import { OrderService } from './order.service';

@ApiBearerAuth()
@Controller('orders')
@ApiTags('Order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('')
  @ApiOperation({ summary: 'create order cái này có sự kiện nghe rồi' })
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(Order_SWAGGER_RESPONSE.CREATE_SUCCESS)
  createOrder(@Body() createOrder: CreateOrderDto) {
    const { lender, fee, tokenId, due_date, paid_type, message, signature } =
      createOrder;
    const data = {
      lender,
      fee,
      tokenId,
      due_date,
      paid_type,
      message,
      signature,
    };
    return this.orderService.createOrder(data);
  }

  @Patch(':id')
  @ApiBadRequestResponse(USER_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiOkResponse(Order_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    const { lender, fee, tokenId, due_date, paid_type, message, signature } =
      updateOrderDto;
    const data = {
      lender,
      fee,
      tokenId,
      due_date,
      paid_type,
      message,
      signature,
    };
    return this.orderService.updateOrder(id, data);
  }
}
