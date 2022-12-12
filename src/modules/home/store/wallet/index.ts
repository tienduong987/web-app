import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

export interface IAuth {
  tabActive: string
}

const state: IAuth = {
  tabActive: 'LYN'
}

const bcWallet: Module<IAuth, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default bcWallet
