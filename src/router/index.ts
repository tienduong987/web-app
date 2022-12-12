import Cookies from 'js-cookie'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'
import { includes } from 'lodash'
import Layout from '@/components/layout/marketplace/Layout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',

    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../modules/landing/IntroduceLynkey.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  //@ts-ignore
  if (to.name === 'Wallet' && store.state.beBase.coinMain === 'LYNK') {
    router.push({ name: 'WalletLyn', query: to.query }).catch(err => err)
  }
  //@ts-ignore
  if (to.name === 'Wallet' && store.state.beBase.coinMain === 'CLM') {
    router.push({ name: 'WalletClm', query: to.query }).catch(err => err)
  }
  //@ts-ignore
  if (to.name === 'WalletLyn' && store.state.beBase.coinMain === 'CLM') {
    router.push({ name: 'WalletClm', query: to.query }).catch(err => err)
  }
  //@ts-ignore
  if (to.name === 'WalletClm' && store.state.beBase.coinMain === 'LYNK') {
    router.push({ name: 'WalletLyn', query: to.query }).catch(err => err)
  }

  if (to.meta?.isNotLogin) {
    if (to.name === 'verify-phone' && to.query.reason === 'CHANGE_PHONE') {
      next()
      return
    }
    if (Cookies.get('access_token')) {
      location.href = '/'
      return
    }
    next()
    return
  }
  if (!store.getters['beAuth/isLogin']) {
    const whiteList: string[] = ['reset-2fa', 'unlock-user', 'reset-pin', 'MarketPlace', 'DetailProject', 'ProjectList', 'ListProduct', 'download-app', 'home']
    if (includes(whiteList, to.name)) {
      next()
      const a = document.querySelector('#main-center')
      a?.scrollTo(0, 0)
      return
    } else {
      router.push({ name: 'login' })
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      location.href = '/'
    }
  }
  next()
  const a = document.querySelector('#main-center')
  a?.scrollTo(0, 0)
})

export default router
