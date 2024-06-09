import { Raydium, TxVersion, parseTokenAccountResp } from '@raydium-io/raydium-sdk-v2'
import { Connection, Keypair } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import bs58 from 'bs58'

export const owner: Keypair = Keypair.fromSecretKey(Uint8Array.from([126,28,93,76,198,3,28,247,107,163,80,255,37,183,9,236,44,112,72,196,25,41,65,231,9,74,190,98,25,0,37,0,128,30,221,92,7,13,161,113,116,123,76,184,245,121,110,109,92,54,213,62,37,170,174,8,28,229,11,77,192,4,39,221]));
export const connection = new Connection('https://virulent-hidden-shadow.solana-devnet.quiknode.pro/a635a570d513b36c178917ac626183df0958346b') //<YOUR_RPC_URL>
export const txVersion = TxVersion.V0 // or TxVersion.LEGACY
let raydium: Raydium | undefined
export const initSdk = async (params?: { loadToken?: boolean }) => {
  if (raydium) return raydium
  raydium = await Raydium.load({
    owner,
    connection,
    cluster: 'devnet', // 'mainnet' | 'devnet'
    disableFeatureCheck: true,
    disableLoadToken: !params?.loadToken,
    // urlConfigs: {
    //   BASE_HOST: '<API_HOST>', // by default, you don't have to set API_HOST, only provide it to when want to test on devnet
    // },
  })

  /**
   * By default: sdk will automatically fetch token account data when need it or any sol balace changed.
   * if you want to handle token account by yourself, set token account data after init sdk
   * code below shows how to do it.
   * note: after call raydium.account.updateTokenAccount, raydium will not automatically fetch token account
   */

  /*  
  raydium.account.updateTokenAccount(await fetchTokenAccountData())
  connection.onAccountChange(owner.publicKey, async () => {
    raydium!.account.updateTokenAccount(await fetchTokenAccountData())
  })
  */
  console.log(2222)


  return raydium
}

export const fetchTokenAccountData = async () => {
  const solAccountResp = await connection.getAccountInfo(owner.publicKey)
  const tokenAccountResp = await connection.getTokenAccountsByOwner(owner.publicKey, { programId: TOKEN_PROGRAM_ID })
  const token2022Req = await connection.getTokenAccountsByOwner(owner.publicKey, { programId: TOKEN_2022_PROGRAM_ID })
  const tokenAccountData = parseTokenAccountResp({
    owner: owner.publicKey,
    solAccountResp,
    tokenAccountResp: {
      context: tokenAccountResp.context,
      value: [...tokenAccountResp.value, ...token2022Req.value],
    },
  })
  return tokenAccountData
}
