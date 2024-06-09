import { CREATE_CPMM_POOL_PROGRAM, CREATE_CPMM_POOL_FEE_ACC ,getTransferAmountFeeV2, DEVNET_PROGRAM_ID} from '@raydium-io/raydium-sdk-v2'
import BN from 'bn.js'
import { initSdk, txVersion } from '../config'
// 使用 ES6 模块语法导入整个库

import axios from 'axios';
const HttpsProxyAgent = require('https-proxy-agent');
export const createPool = async () => {
  console.log(1111)


  // axios.defaults.httpsAgent = new HttpsProxyAgent({
  //   host: '127.0.0.1', // 例如 '127.0.0.1'
  //   port: '7890', // 例如 8080
  //   protocol: 'https' // 根据您的代理服务器要求设置
  // });

  const raydium = await initSdk({ loadToken: false })

  // check token list here: https://api-v3.raydium.io/mint/list
  console.log(2222)

  // RAY
  const mintA = {
    address: 'Nu1DYvumq5dPZALdtxXLYM8LvKSihXPF6tCgQ71ugiv',
    programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    decimals: 6,
  } 
  // USDC
  const mintB ={
    address: 'NGnJFJE3pzvCVNed73dpL5euMar6vaCTxjEMSy2pump',
    programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    decimals: 6,
  } 

  /**
   * you also can provide mint info directly like below, then don't have to call token info api
   *  {
      address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
      programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
      decimals: 6,
    } 
   */

    console.log(1111111111111)
  
  const { execute, extInfo } = await raydium.cpmm.createPool({
    programId: CREATE_CPMM_POOL_PROGRAM,
    poolFeeAccount: CREATE_CPMM_POOL_FEE_ACC,
    mintA,
    mintB,
    mintAAmount: new BN(100),
    mintBAmount: new BN(100),
    startTime: new BN(0),
    associatedOnly: false,
    ownerInfo: {
      useSOLBalance: true,
    },
    computeBudgetConfig: { 
      microLamports: 600000,
      units:20000
    },
    txVersion,
  })
  console.log(1111111111111)


  const { txId } = await execute()
  console.log('pool created', {
    txId,
    poolKeys: Object.keys(extInfo.address).reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: extInfo.address[cur as keyof typeof extInfo.address].toString(),
      }),
      {}
    ),
  })
}

/** uncomment code below to execute */
createPool();