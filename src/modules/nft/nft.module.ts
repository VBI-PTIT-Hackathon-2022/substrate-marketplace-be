import { forwardRef, Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Nft, NftSchema } from './nft.schema';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Nft.name, schema: NftSchema }]),
    HttpModule,
    forwardRef(() => UserModule),
  ],
  providers: [NftService],
  controllers: [NftController],
  exports: [NftService, MongooseModule],
})
export class NftModule {}
