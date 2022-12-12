import Vue from 'vue'
import App from './App.vue'

import './registerServiceWorker'
import router from './router'
import './icons'
import './assets/styles/index.scss'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import i18n from '@/utils/language'

import store from './store'

// mixin
import PermissionMixin from './mixins/permisson'

// import module
import listModules from '@/modules'

//format
import * as format from '@/configs'

//plugins
import './plugins/element-ui'

// import module
import { forEach } from 'lodash'

// base components
import components from './components/base'

// lynkey landing
import VuePrism from 'vue-prism'
import VueParticles from './modules/landing/vue-particles'
import VueLazyload from 'vue-lazyload'

Vue.use(VueParticles, VuePrism)
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Crystal_128_error.svg/1200px-Crystal_128_error.svg.png',
  loading: 'https://www.bloghong.com/wp-content/uploads/2016/05/loading-blogger.jpg',
  attempt: 1,
  lazyComponent: true,
  listenEvents: ['scroll']
})
//end

Vue.config.productionTip = false

forEach(components, (value, key) => {
  Vue.component(key, value)
})
// modules
forEach(listModules, module => {
  // register route
  forEach(module.router, value => {
    router.addRoute(value)
  })

  // // register store
  forEach(module.stores, (value, key) => {
    store.registerModule(key, value)
  })

  // //register component
  forEach(module.components, (value, key) => {
    Vue.component(key, value)
  })
})

//register filter
Object.keys(format).forEach(key => {
  Vue.filter(key, (format as any)[key])
})

Vue.mixin(PermissionMixin)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
