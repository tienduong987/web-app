import LayoutMarketplace from '@/components/layout/marketplace/Layout.vue'
import { RouteConfig } from 'vue-router'
import RedirectDownloadApp from '@/modules/marketplace/home/components/RedirectDownloadApp.vue'

const marketplaceRouters: RouteConfig[] = [
  {
    path: '/marketplace',
    component: LayoutMarketplace,
    children: [
      {
        path: '/',
        name: 'MarketMain',
        redirect: { name: 'MarketPlace' },
        component: () => import('../view/Home.vue'),
        children: [
          {
            path: 'real-estate',
            name: 'MarketPlace',
            component: () => import('../view/MarketPlace.vue')
          },
          {
            path: 'real-estate/detail/:type/:id',
            name: 'DetailProject',
            component: () => import('../view/DetailProject.vue')
          },
          {
            path: 'real-estate/product-list',
            name: 'ListProduct',
            component: () => import('../view/ProductList.vue')
          },
          {
            path: 'real-estate/project-list',
            name: 'ProjectList',
            component: () => import('../components/detail-project/ProjectList.vue')
          }
        ]
      },
      {
        path: '*',
        redirect: '/marketplace'
      }
    ]
  },
  {
    path: '/mobile-app/download',
    component: RedirectDownloadApp,
    name: 'download-app'
  }
]

export default marketplaceRouters
