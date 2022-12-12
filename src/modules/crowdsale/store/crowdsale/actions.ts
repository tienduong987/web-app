import { ActionTree } from 'vuex'
import { IAuth } from '.'

const actions: ActionTree<IAuth, unknown> = {
  setIsActiveRound({ commit }, status: boolean) {
    commit('SET_IS_ACTIVE_ROUND', status)
  },

  setroundCurrent({ commit }, round: Record<string, any>) {
    commit('SET_ROUND_CURRENT', round)
  },
  setListRound({ commit }, list: Record<string, any>[]) {
    commit('SET_LIST_ROUND', list)
  }
}

export default actions
