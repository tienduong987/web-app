import { MutationTree } from 'vuex'
import { IAuth } from '.'

const mutations: MutationTree<IAuth> = {
  SET_TAB_ACTIVE: (state, tab) => {
    state.tabActive = tab
  }
}
export default mutations
