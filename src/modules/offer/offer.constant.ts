import { swaggerSchemaExample } from '../../utils/swagger_schema';
export const Offer_SWAGGER_RESPONSE = {
  CREATE_SUCCESS: swaggerSchemaExample(
    {
      maker: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      isLender: 'false',
      tokenId:
        '0xd95e05e709d5e16b9f88c63992651e2c521fb2d3ff03c2b1c170fa3d3ac4e3aa',
      fee: '0.01',
      due_date: '2023-01-14',
      paid_type: 1,
      message: 'string',
      signature: 'string',
      _id: '6375a4c850565953b2c911bf',
      createdAt: '2022-11-17T03:04:40.836Z',
      updatedAt: '2022-11-17T03:04:40.836Z',
      __v: 0,
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
  GET_OFFER: swaggerSchemaExample(
    [
      {
        _id: '6375a4c850565953b2c911bf',
        maker: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        isLender: true,
        tokenId:
          '0xd95e05e709d5e16b9f88c63992651e2c521fb2d3ff03c2b1c170fa3d3ac4e3aa',
        fee: '100000000000',
        due_date: '1766287472',
        paid_type: 1,
        message: 'string',
        signature: '1111111',
        createdAt: '2022-11-17T03:04:40.836Z',
        updatedAt: '2022-11-17T03:16:29.944Z',
        __v: 0,
      },
      {
        _id: '6375bb4078bd1c3cd57b64b5',
        maker: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        isLender: false,
        tokenId:
          '0x7c66db7f2a0fdbfbf17dd24f39a08000db70492aec11772086b834f76503af27',
        fee: '100000000000',
        due_date: '1766287472',
        paid_type: 1,
        message: 'string',
        signature: '1111111',
        createdAt: '2022-11-17T03:04:40.836Z',
        updatedAt: '2022-11-17T03:16:29.944Z',
        __v: 0,
      },
    ],
    'get success',
  ),
};
