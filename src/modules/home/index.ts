import { ModuleInterface } from '@/interface/module'
import homeRouters from './router'
import walletStores from './store'
const homeModule: ModuleInterface = {
  router: homeRouters,
  stores: walletStores
}

export default homeModule
