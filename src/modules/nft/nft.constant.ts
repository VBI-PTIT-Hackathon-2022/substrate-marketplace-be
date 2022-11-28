import { swaggerSchemaExample } from '../../utils/swagger_schema';
export const NFT_SWAGGER_RESPONSE = {
  CREATE_SUCCESS: swaggerSchemaExample(
    {
      _id: '637f2e3813ad6b256a100c60',
      name: 'CNP Students #2200',
      description:
        'This NFT collection is fan art of CNP by YouthWeb3Lab Students',
      image: 'https://nft.web3youth.xyz/images/2200.png',
      tokenId:
        '0x9500a247e6f48949ea6a7c57c4b7b36c502c1a3d98b07c2cae26da20ace3e75c',
      walletAddress: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      dna: '5685b3b8016c7e0cc0d4fc74e3255b80035c1457',
      edition: 2200,
      date: 1668004418708,
      attributes: [
        [
          {
            trait_type: 'Background',
            value: '魁',
          },
        ],
        [
          {
            trait_type: 'Orochi-Body',
            value: 'Dark',
          },
        ],
      ],
      userId: '637f2e3713ad6b256a100c5e',
      __v: 0,
      createdAt: '2022-11-24T08:41:28.710Z',
      updatedAt: '2022-11-24T08:41:28.710Z',
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
