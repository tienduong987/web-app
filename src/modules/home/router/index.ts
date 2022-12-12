import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'
import store from '../store'

const homeRouters: RouteConfig[] = [
  {
    path: '/wallet',
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
            name: 'Wallet',
            // redirect: { name: 'WalletLyn' },
            component: () => import('../view/Wallet.vue'),
            children: [
              {
                path: 'lynk',
                name: 'WalletLyn',
                component: () => import('../components/WalletTable.vue')
              },
              {
                path: 'clm',
                name: 'WalletClm',
                component: () => import('../components/WalletTable.vue')
              },
              {
                path: 'btc',
                name: 'WalletBtc',
                component: () => import('../components/WalletTable.vue')
              },
              {
                path: 'eth',
                name: 'WalletEth',
                component: () => import('../components/WalletTable.vue')
              },
              {
                path: 'bnb',
                name: 'WalletBnb',
                component: () => import('../components/WalletTable.vue')
              },
              {
                path: 'usdt',
                name: 'WalletUsdt',
                component: () => import('../components/WalletTable.vue')
              },
              {
                path: 'usdc',
                name: 'WalletUsdc',
                component: () => import('../components/WalletTable.vue')
              },
              {
                path: 'busd',
                name: 'WalletBusd',
                component: () => import('../components/WalletTable.vue')
              }
            ]
          }
        ]
      },
      {
        path: '*',
        redirect: '/wallet'
      }
    ]
  }
]

export default homeRouters
