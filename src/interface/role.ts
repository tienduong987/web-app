import { ROLE_TYPE } from '@/configs/role/index'
export type RoleActions = 'view' | 'edit' | 'remove' | 'all' | 'view-firebase'

// view-firebase: role INVESTOR sẽ lấy list từ firebase

export type UserRoles = ROLE_TYPE[keyof ROLE_TYPE]

export interface RoleInterface {
  module: string
  roles: RoleActions[]
}

export interface UserRoleInterface {
  userRole: UserRoles
  roles: RoleInterface[]
}

export interface UserRoleStoreInterface {
  userRole: UserRoles[]
  roles: RoleInterface[]
}
