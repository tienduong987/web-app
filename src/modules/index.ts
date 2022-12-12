import { ModuleInterface } from '@/interface/module'
import homeModule from './home'
import authModule from './auth'
import settingModule from './setting'
import affiliateModule from './affiliate'
import crowdsaleModule from './crowdsale'
import marketplaceModule from './marketplace/home'
const listModules: Record<string, ModuleInterface> = {
  homeModule,
  authModule,
  settingModule,
  affiliateModule,
  crowdsaleModule,
  marketplaceModule
}

export default listModules
