import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

export interface IAuth {
  isActiveRound: boolean
  roundCurrent: Record<string, any>
  listRound: Record<string, any>[]
}

const state: IAuth = {
  isActiveRound: false,
  roundCurrent: {},
  listRound: []
}

const bcCrowdsale: Module<IAuth, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default bcCrowdsale
