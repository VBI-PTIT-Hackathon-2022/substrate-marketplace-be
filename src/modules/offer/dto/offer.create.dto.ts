import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  })
  maker: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    example: 'true',
  })
  isLender: false;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  })
  tokenId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 100000000000,
  })
  fee: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1766287472,
  })
  due_date: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  paid_type: number;

  @IsNotEmpty()
  @ApiProperty()
  message?: string;

  @IsNotEmpty()
  @ApiProperty()
  signature?: string;
}

export class AddOfferDto {
  @IsOptional()
  @IsString()
  maker?: string;

  @IsOptional()
  @IsBoolean()
  isLender?: boolean;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  signature?: string;
}
export default CreateOfferDto;
