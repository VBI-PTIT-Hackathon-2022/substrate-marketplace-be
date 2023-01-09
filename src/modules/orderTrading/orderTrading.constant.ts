import { swaggerSchemaExample } from '../../utils/swagger_schema';
export const Order_SWAGGER_RESPONSE = {
  CREATE_SUCCESS: swaggerSchemaExample(
    {
      lender: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      tokenId:
        '0xd95e05e709d5e16b9f88c63992651e2c521fb2d3ff03c2b1c170fa3d3ac4e3aa',
      fee: 100000000000,
      due_date: 1766287472,
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
};
