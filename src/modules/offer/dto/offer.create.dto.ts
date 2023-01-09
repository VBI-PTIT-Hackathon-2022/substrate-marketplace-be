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
  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  isTrading: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  })
  tokenId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 100000000000,
  })
  fee: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 1766287472,
  })
  due_date: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  paid_type: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  message?: string;

  @IsNotEmpty()
  @IsString()
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
  @IsBoolean()
  isTrading?: boolean;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  signature?: string;
}
export default CreateOfferDto;
