import { Module } from 'vuex'
import bcWallet from './wallet'

const walletStores: Record<string, Module<any, any>> = {
  bcWallet
}

export default walletStores
