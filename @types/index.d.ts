import { RoleActions } from '@/interface/role'
import Vue from 'vue'
type LIST_MODULE = 'wallet' | 'crowd-sale' | 'setting' | 'affiliate'
declare module 'vue/types/vue' {
  interface Vue {
    districtId: number
    checkPemission(module: LIST_MODULE, roles: Array<RoleActions>): boolean
  }
}
