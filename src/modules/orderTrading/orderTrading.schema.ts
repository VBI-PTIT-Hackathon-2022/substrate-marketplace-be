import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type OrderDocument = OrderTrading & Document;

@Schema({
  timestamps: true,
  _id: true,
})
export class OrderTrading {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({
    type: String,
    ref: 'users',
  })
  @ApiProperty()
  seller: string;

  @Prop({
    type: String,
    ref: 'users',
  })
  @ApiProperty()
  buyer: string;

  @Prop({
    type: String,
    ref: 'nfts',
  })
  @ApiProperty()
  tokenId: string;

  @Prop()
  @ApiProperty()
  price: number;
}

const OrderTradingSchema = SchemaFactory.createForClass(OrderTrading);

export { OrderTradingSchema };
