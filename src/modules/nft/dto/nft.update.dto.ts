import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateNftDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Long',
  })
  tokenId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '12313213',
  })
  custodian: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '12313213',
  })
  status: string;
}

export default UpdateNftDto;
