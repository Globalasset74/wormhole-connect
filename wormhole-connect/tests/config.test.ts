import { MAINNET_CHAINS, MAINNET_TOKENS } from '../src/config/mainnet';
import { TESTNET_CHAINS, TESTNET_TOKENS } from '../src/config/testnet';

export const envTests = [
  {
    title: 'mainnet configs',
    CHAINS: MAINNET_CHAINS,
    TOKENS: MAINNET_TOKENS,
  },
  {
    title: 'testnet configs',
    CHAINS: TESTNET_CHAINS,
    TOKENS: TESTNET_TOKENS,
  },
];

envTests.forEach((env) => {
  const { title, CHAINS, TOKENS } = env;
  describe(title, () => {
    test('chain gas tokens', () => {
      Object.values(CHAINS).forEach(({ gasToken }) => {
        const tokenConfig = TOKENS[gasToken];
        expect(tokenConfig).toBeTruthy();
      });
    });

    test('native tokens have valid wrapped token', () => {
      Object.values(TOKENS).forEach((token) => {
        if (!token.tokenId) {
          expect(token.wrappedAsset).toBeTruthy();
          const wrappedToken = TOKENS[token.wrappedAsset!];
          expect(wrappedToken).toBeTruthy();
        }
      });
    });
  });
});
