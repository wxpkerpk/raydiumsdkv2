import { CREATE_CPMM_POOL_PROGRAM, CREATE_CPMM_POOL_FEE_ACC } from '@raydium-io/raydium-sdk-v2'
import BN from 'bn.js'
import { initSdk, txVersion } from '../config'

export const createPool = async () => {
  console.log(1111)

  const raydium = await initSdk({ loadToken: true })

  // check token list here: https://api-v3.raydium.io/mint/list
  console.log(2222)

  // RAY
  const mintA = {
    address: '5F9jnKnuCWyAz6ZwEqBEYu4PMAw2C7TEpBLW36iM2KTG',
    programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    decimals: 6,
  } 
  // USDC
  const mintB ={
    address: '3B1VYG3vy2JcBGSU7ftVrHevKEWHPqniurx9q6DBvico',
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