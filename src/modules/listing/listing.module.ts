import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Listing, ListingSchema } from './listing.schema';
import { NftModule } from '../nft/nft.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Listing.name, schema: ListingSchema }]),
    NftModule,
  ],
  providers: [ListingService],
  controllers: [ListingController],
  exports: [ListingService, MongooseModule],
})
export class ListingModule {}
