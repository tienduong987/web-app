import { MutationTree } from 'vuex'
import { ROLE_DEFINE } from '@/configs/role'

import { IAuth } from '.'
import { find, forEach, includes, map, size, union } from 'lodash'

const mutations: MutationTree<IAuth> = {
  SET_USER_INFO: (state, data) => {
    state.user = data
    state.access_token = data.accessToken
    state.refresh_token = data.refreshToken
  },
  LOG_OUT: state => {
    state.user = {}
    state.access_token = ''
    state.refresh_token = ''
  },
  SET_INFO: (state, info) => {
    state.user = info

    //set role
    state.role = {
      userRole: [],
      roles: []
    }
    forEach(info.roles, role => {
      const userRole = find(ROLE_DEFINE, value => {
        return value.userRole === role
      })
      if (!userRole) return
      state.role.userRole = union(state.role.userRole, [role])

      if (size(state.role.userRole) === 1) {
        state.role.roles = userRole.roles
      } else {
        state.role.roles = map(state.role.roles, value => {
          const a = find(userRole.roles, elm => {
            return elm.module === value.module
          })
          if (a) {
            value.roles = union(value.roles, a.roles)
          }
          return value
        })
      }
    })
  },
  SET_TOKEN: (state, data) => {
    state.access_token = data.accessToken
    state.refresh_token = data.refreshToken
  },
  SET_CONFIG_MODULE: (state, listModule) => {
    forEach(listModule, module => {
      if (module.displayStatus === 'ON' && module.status === 'GOLIVE') {
        state.moduleConfig[module.moduleCode] = true
      } else if (module.status === 'BETA') {
        state.moduleConfig[module.moduleCode] = includes(module.listUserIds, state.user.userId)
      } else {
        state.moduleConfig[module.moduleCode] = false
      }
    })
  }
}
export default mutations
