import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

// const COIN_MAIN = process.env.VUE_APP_COIN_MAIN
// type coinMain = 'CLM' | 'LYNK'
type coinMain = 'CLM' | 'LYNK'
type address = '9999 Bellaire Blvd, Ste 8B-1, Houston, TX 77036 (USA)' | '@Lynkey Holdings Pte. Ltd. 2021'
export interface ISBase {
  popup: string[]
  coinMain: coinMain
  email: string
  address: address
  urlSystem: Record<string, any>
  siteKey: string
}

const state: ISBase = {
  popup: [],
  coinMain: 'LYNK',
  email: '',
  address: '@Lynkey Holdings Pte. Ltd. 2021',
  urlSystem: {},
  // site key live
  // siteKey: '6Ld51lIdAAAAAEF0cK0CBRSL9H_nnGWJfKUYmcHz'
  // site key test
  siteKey: '6LcbbKAcAAAAAGS9BixBvH4okIBVNsY7lywPDleX'
}

const beBase: Module<ISBase, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default beBase
