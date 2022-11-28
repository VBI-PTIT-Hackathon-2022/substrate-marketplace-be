import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';

export type NftDocument = Nft & Document;
type attribute = {
  train_type: string;
  value: string;
};
@Schema({
  timestamps: true,
  _id: true,
})
export class Nft {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({})
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop()
  @ApiProperty()
  image: string;

  @Prop()
  @ApiProperty()
  tokenId: string;

  @Prop()
  @ApiProperty()
  walletAddress: string;

  @Prop()
  @ApiProperty()
  dna: string;

  @Prop()
  @ApiProperty()
  edition: number;

  @Prop()
  @ApiProperty()
  date: number;

  @Prop({
    type: 'Array',
    default: null,
  })
  @ApiProperty()
  attributes: [attribute];

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'users',
  })
  @ApiProperty()
  userId: ObjectId;
}

const NftSchema = SchemaFactory.createForClass(Nft);

export { NftSchema };
