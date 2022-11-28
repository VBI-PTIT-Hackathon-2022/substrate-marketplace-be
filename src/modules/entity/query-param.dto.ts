import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class QueryParamDto {
  @ApiPropertyOptional()
  @IsOptional()
  pageIndex: number;

  @ApiPropertyOptional()
  @IsOptional()
  pageSize: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  tokenId: string;
}
