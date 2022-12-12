import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'

const affiliateRouters: RouteConfig[] = [
  {
    path: '/affiliate',
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
            name: 'affiliate',
            component: () => import('../view/MainView.vue')
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

export default affiliateRouters
