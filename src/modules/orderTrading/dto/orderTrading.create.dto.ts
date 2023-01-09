import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  })
  seller: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  })
  buyer: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      '0xd95e05e709d5e16b9f88c63992651e2c521fb2d3ff03c2b1c170fa3d3ac4e3aa',
  })
  tokenId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 100000000000,
  })
  price: number;
}

export default CreateOrderDto;
