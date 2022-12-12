import { ModuleInterface } from '@/interface/module'
import crowdsaleRoute from './router'
import crowdsaleStores from './store'

const crowdsaleModule: ModuleInterface = {
  router: crowdsaleRoute,
  stores: crowdsaleStores
}

export default crowdsaleModule
