import { trim } from 'lodash'
import { IAuth } from './index'
import { GetterTree } from 'vuex'

const getters: GetterTree<IAuth, any> = {
  isLogin: state => {
    return !!state.access_token && trim(state.access_token) !== ''
  }
}

export default getters
