import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListingModule } from './modules/listing/listing.module';
import { NftModule } from './modules/nft/nft.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    UserModule,
    NftModule,
    ListingModule,
    OrderModule,
    MongooseModule.forRoot(
      'mongodb+srv://hackathon:hackathon@cluster0.utrrlsw.mongodb.net/?retryWrites=true&w=majority',
      //'mongodb://localhost:27017/project_blockchain',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
