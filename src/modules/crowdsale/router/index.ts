import { RouteConfig } from 'vue-router'
import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'

const crowdsaleRoute: RouteConfig[] = [
  {
    path: '/crowd-sale',
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
            name: 'CrowdSale',
            component: () => import('../view/CrowdSale.vue')
          }
        ]
      },
      {
        path: '*',
        redirect: '/crowd-sale'
      }
    ]
  }
]
export default crowdsaleRoute
