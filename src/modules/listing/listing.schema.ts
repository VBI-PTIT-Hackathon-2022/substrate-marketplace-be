import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type ListingDocument = Listing & Document;

@Schema({
  timestamps: true,
  _id: true,
})
export class Listing {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({
    type: String,
    ref: 'users',
  })
  @ApiProperty()
  lender: string;

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
  due_date: string;

  @Prop()
  @ApiProperty()
  paid_type: number;

  @Prop()
  @ApiProperty()
  message: string;

  @Prop()
  @ApiProperty()
  signature: string;
}

const ListingSchema = SchemaFactory.createForClass(Listing);

export { ListingSchema };
