import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  @ApiProperty()
  walletAddress: string;

  @Prop()
  @ApiProperty()
  name: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
