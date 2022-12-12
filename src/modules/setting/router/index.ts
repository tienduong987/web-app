import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'

const settingRouters: RouteConfig[] = [
  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: '/',
        components: {
          default: LayoutSecond
        },
        children: [
          {
            path: '/',
            name: 'SettingMain',
            component: () => import('../view/MainView.vue'),
            children: [
              {
                path: '/',
                name: 'Profile',
                component: () => import('../view/Profile.vue')
              },
              {
                path: 'kyc',
                name: 'KYC',
                component: () => import('../view/Kyc.vue')
              },
              {
                path: 'security',
                name: 'Security',
                component: () => import('../view/Security.vue')
              },
              {
                path: 'activity',
                name: 'Activity',
                component: () => import('../view/Activity.vue')
              },
              {
                path: 'quota',
                name: 'Quota',
                component: () => import('../view/Quota.vue')
              }
            ]
          }
        ]
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
  }
]

export default settingRouters
