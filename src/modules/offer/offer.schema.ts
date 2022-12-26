import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type OfferDocument = Offer & Document;

@Schema({
  timestamps: true,
  _id: true,
})
export class Offer {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({
    type: String,
    ref: 'users',
  })
  @ApiProperty()
  maker: string;

  @Prop()
  @ApiProperty()
  isLender: boolean;

  @Prop({
    type: String,
    ref: 'nfts',
  })
  @ApiProperty()
  tokenId: string;

  @Prop()
  @ApiProperty()
  fee: number;

  @Prop()
  @ApiProperty()
  due_date: number;

  @Prop()
  @ApiProperty()
  paid_type: number;
  @Prop()
  @ApiProperty()
  message: number;

  @Prop()
  @ApiProperty()
  signature: number;
}

const OfferSchema = SchemaFactory.createForClass(Offer);

export { OfferSchema };