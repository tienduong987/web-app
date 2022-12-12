import { MutationTree } from 'vuex'

import { IAuth } from '.'

const mutations: MutationTree<IAuth> = {
  SET_IS_ACTIVE_ROUND: (state, status) => {
    state.isActiveRound = status
  },
  SET_ROUND_CURRENT: (state, round) => {
    state.roundCurrent = round
  },
  SET_LIST_ROUND: (state, list) => {
    state.listRound = list
  }
}
export default mutations
