import { swaggerSchemaExample } from '../../utils/swagger_schema';
export const USER_SWAGGER_RESPONSE = {
  CREATE_SUCCESS: swaggerSchemaExample(
    {
      _id: '637215e6a2d8f152c3bcaf68',
      walletAddress: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      name: 'ALICE',
      createdAt: '2022-11-14T10:18:14.339Z',
      updatedAt: '2022-11-14T10:18:14.339Z',
      __v: 0,
      nft: [
        {
          _id: '637215e7a2d8f152c3bcaf6a',
          name: 'CNP Students #2205',
          walletAddress: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
          tokenId:
            '0xaec8f0c1a57524aab1f5ffb7362e87251e8ee3b1561f1a6af32569266725ffc6',
          description:
            'This NFT collection is fan art of CNP by YouthWeb3Lab Students \n \n CryptoNinja Partners Students (CNPS) is a 6,000 piece collection of CNP characters in various student forms. \n \n Students can become a CNPS holder and interact with the students! Adults, relive your school days and have some fun!',
          image: 'https://nft.web3youth.xyz/images/2205.png',
          dna: '99ef498116020338e6324fff1de5401bef2b7382',
          edition: 2205,
          date: 1668003999204,
          attributes: [
            [
              {
                trait_type: 'Back-Item',
                value: 'Makimono',
              },
            ],
            [
              {
                trait_type: 'Orochi-Body',
                value: 'Ice',
              },
            ],
            [
              {
                trait_type: 'Orochi-Costume',
                value: 'Baseball Club',
              },
            ],
            [
              {
                trait_type: 'Orochi-Eye',
                value: 'Manga',
              },
            ],
            [
              {
                trait_type: 'Orochi-Mouse',
                value: '~~',
              },
            ],
            [
              {
                trait_type: 'Item',
                value: 'Broom',
              },
            ],
          ],
          userId: '637215e6a2d8f152c3bcaf68',
          __v: 0,
          createdAt: '2022-11-14T10:18:15.108Z',
          updatedAt: '2022-11-14T10:18:15.108Z',
        },
      ],
    },

    'Create success',
  ),
  UPDATE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        success: true,
      },
    },
    'Update success',
  ),
  BAD_REQUEST_EXCEPTION: swaggerSchemaExample(
    {
      message: 'bad request exception',
      code: 'sys00001',
      statusCode: 400,
    },
    'bad request exception',
  ),
  NOT_FOUND_EXCEPTION: swaggerSchemaExample(
    {
      message: 'not found exception',
      code: 'us00001',
      statusCode: 404,
    },
    'not found exception',
  ),
  DELETE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        success: true,
      },
    },
    'Delete success',
  ),
  INFOR_USER: swaggerSchemaExample(
    {
      nonce: 'số nft hiện có ',
      consumers: 0,
      providers: 1,
      sufficients: 0,
      data: {
        free: 'số tiền đang sở hữu',
        reserved: 0,
        miscFrozen: 0,
        feeFrozen: 0,
      },
    },
    'get success',
  ),
};
