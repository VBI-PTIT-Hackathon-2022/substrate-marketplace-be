import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateListingDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  })
  maker?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example:
      '0xd95e05e709d5e16b9f88c63992651e2c521fb2d3ff03c2b1c170fa3d3ac4e3aa',
  })
  tokenId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '100000000000',
  })
  fee?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '2022-12-12',
  })
  due_date?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  paid_type?: number;

  @IsOptional()
  @ApiProperty()
  message?: string;

  @IsOptional()
  @ApiProperty()
  signature?: string;
  @IsOptional()
  @ApiProperty()
  isTrading?: boolean;
}

export default UpdateListingDto;
