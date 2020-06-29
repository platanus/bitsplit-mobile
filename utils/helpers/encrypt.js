import * as Crypto from 'expo-crypto';

export default async function encrypto(str) {
  return (
    str &&
    (await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, str))
  );
}
