import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

type atribute = {
  train_type: string;
  value: string;
};

export class CreateNftDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'project Atama',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '666 unconvention beings',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'ipfs://QmWxTVdAeC3PVDJ6NWb6HFruiWfXrxBCE1z4Z1M71VgB2P/385.png"',
  })
  image?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'https://projectatama.io/',
  })
  external_url?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    example: [
      {
        trait_type: 'Gender',
        value: 'Female',
      },
      {
        trait_type: 'BACKGROUND',
        value: 'Background 1',
      },
    ],
  })
  attributes?: [atribute];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  })
  walletAddress: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  })
  custodian: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      '0xd95e05e709d5e16b9f88c63992651e2c521fb2d3ff03c2b1c170fa3d3ac4e3aa',
  })
  tokenId: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  userId: ObjectId;
}

export class AddNftDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  })
  walletAddress: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  })
  custodian: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      '0xd95e05e709d5e16b9f88c63992651e2c521fb2d3ff03c2b1c170fa3d3ac4e3aa',
  })
  tokenId: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  userId?: ObjectId;

}

export class SetUriNftDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      '0x0b4be8201a103499c7e369ef84b0716f8e975becdd3a003bdedb6a54d6e973fc',
  })
  tokenId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      '0x68747470733a2f2f6e66742e77656233796f7574682e78797a2f6a736f6e2f323230352e6a736f6e',
  })
  uri: string;
}
export default CreateNftDto;
