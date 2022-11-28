import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1emQmRbXDL2eSzPxmUywHQj5qHAAyMCrna24k1rQy1KPpw5',
  })
  walletAddress: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Long',
  })
  name: string;
}

export default CreateUserDto;
