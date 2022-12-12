import { UserRoleInterface } from '@/interface/role'
export type ROLE_TYPE = {
  ADMIN: 'ADMIN'
  INVESTOR: 'INVESTOR' // NHÀ ĐẦU TƯ
  EMPLOYEE: 'EMPLOYEE' // NHÂN VIÊN
  SUPPORT: 'SUPPORT' //NV HỖ TRỢ
  NONE: 'NONE'
}
export const ROLE_CODE: ROLE_TYPE = {
  ADMIN: 'ADMIN',
  INVESTOR: 'INVESTOR',
  EMPLOYEE: 'EMPLOYEE',
  SUPPORT: 'SUPPORT',
  NONE: 'NONE'
}

export const ROLE_DEFINE: UserRoleInterface[] = [
  {
    userRole: ROLE_CODE.ADMIN,
    roles: [
      {
        module: 'crowd-sale',
        roles: ['all']
      },
      {
        module: 'wallet',
        roles: ['all']
      },
      {
        module: 'setting',
        roles: ['all']
      },
      {
        module: 'affiliate',
        roles: ['all']
      }
    ]
  },
  {
    userRole: ROLE_CODE.INVESTOR,
    roles: [
      {
        module: 'crowd-sale',
        roles: ['view', 'view-firebase']
      },
      {
        module: 'wallet',
        roles: ['view']
      },
      {
        module: 'setting',
        roles: ['view']
      },
      {
        module: 'affiliate',
        roles: ['view']
      }
    ]
  },
  {
    userRole: ROLE_CODE.EMPLOYEE,
    roles: [
      {
        module: 'crowd-sale',
        roles: ['view']
      },
      {
        module: 'wallet',
        roles: ['view']
      },
      {
        module: 'setting',
        roles: ['view']
      },
      {
        module: 'affiliate',
        roles: ['view']
      }
    ]
  },
  {
    userRole: ROLE_CODE.SUPPORT,
    roles: [
      {
        module: 'crowd-sale',
        roles: ['view']
      },
      {
        module: 'wallet',
        roles: ['view']
      },
      {
        module: 'setting',
        roles: ['view']
      },
      {
        module: 'affiliate',
        roles: ['view']
      }
    ]
  }
]
