import { ApiPromise, WsProvider } from '@polkadot/api';
import { NftService } from 'src/modules/nft/nft.service';
import { OrderService } from 'src/modules/order/order.service';

export async function listenPolkadot(
  nftService: NftService,
  orderService: OrderService,
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
        let rentalInfo: any = await api.query.renting.rentalInfo(hashId);
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
      }
    });
  });
}
