import { ApiPromise, WsProvider } from '@polkadot/api';
import { NftService } from 'src/modules/nft/nft.service';
import { OrderService } from 'src/modules/order/order.service';
import { ListingService } from '../modules/listing/listing.service';
import { QueryParamDto } from '../modules/entity/query-param.dto';

export async function listenPolkadot(
  nftService: NftService,
  orderService: OrderService,
  listingService: ListingService,
) {
  const wsProvider = new WsProvider('ws://127.0.0.1:9944');
  const api = await ApiPromise.create({
    provider: wsProvider,
  });
  api.query.system.events((events) => {
    events.forEach(async (record) => {
      const { event } = record;
      if (event.section === 'nftCurrency' && event.method === 'Mint') {
        const enventData = [];
        event.data.forEach((data) => {
          enventData.push(data.toString());
        });
        const data = {
          walletAddress: enventData[0],
          tokenId: enventData[1],
          custodian: enventData[0],
          status: 'none',
        };
        await nftService.addNft(data);
      } else if (event.section === 'nftCurrency' && event.method === 'SetUri') {
        const enventData = [];
        event.data.forEach((data) => {
          enventData.push(data.toString());
        });
        const data = {
          tokenId: enventData[0],
          uri: enventData[1],
        };
        await nftService.setUri(data);
      } else if (event.section === 'renting' && event.method === 'MatchOrder') {
        const enventData = [];
        event.data.forEach((data) => {
          enventData.push(data.toString());
        });
        const lender = enventData[0];
        const borrower = enventData[1];
        const hashId = enventData[2];
        let rentalInfo: any = await api.query.renting.borrowers(
          borrower,
          hashId,
        );
        rentalInfo = JSON.parse(rentalInfo.toString());
        const data = {
          lender: lender,
          borrower: borrower,
          fee: rentalInfo.fee,
          tokenId: rentalInfo.token,
          due_date: rentalInfo.dueDate,
          paid_type: rentalInfo.paidType,
        };
        const nft = {
          tokenId: rentalInfo.token,
          custodian: borrower,
          status: 'isRenting',
        };
        console.log(hashId);
        await orderService.createOrder(data);
        await nftService.update(rentalInfo.token, nft);
      } else if (
        event.section === 'renting' &&
        event.method === 'ReturnAsset'
      ) {
        const enventData = [];
        event.data.forEach((data) => {
          enventData.push(data.toString());
        });
        const lender = enventData[1];
        const borrower = enventData[0];
        const token = enventData[2];
        const query: QueryParamDto = {
          tokenId: token,
          pageIndex: 1,
          pageSize: 20,
        };
        const listing = await listingService.getList(lender, query);
        const time = new Date(listing[0].due_date).getTime() / 1000;

        if (time <= new Date.now() / 1000) {
          const nft = {
            tokenId: token,
            custodian: lender,
            status: 'forRent',
          };
          await orderService.deleteOrder(borrower, token);
          await nftService.update(token, nft);
        } else {
          const nft = {
            tokenId: token,
            custodian: lender,
            status: 'none',
          };
          await orderService.deleteOrder(borrower, token);
          await nftService.update(token, nft);
        }
      }
    });
  });
}
