import { namespace } from 'vuex-class'
import { RoleActions, UserRoleInterface } from '@/interface/role'
import { Component, Vue } from 'vue-property-decorator'
import { find, includes, intersection, size } from 'lodash'

const bcAuth = namespace('beAuth')
@Component
export default class PermissionMixin extends Vue {
  @bcAuth.State('role') role!: UserRoleInterface

  checkPemission(module: string, roles: RoleActions[]): boolean {
    const moduleRole = find(this.role.roles, value => {
      return module === value.module
    })

    if (!moduleRole) {
      return false
    }

    if (includes(moduleRole.roles, 'all')) {
      return true
    }

    return size(intersection(moduleRole.roles, roles)) > 0
  }
}
