import { VerifyRepository } from './repositories/verify'
import { AuthRepository } from './repositories/auth'
import { SettingRepository } from './repositories/setting'
import { affiliateRepository } from './repositories/affiliate'
import UploadRepository from './repositories/upload'
import WalletRepository from './repositories/wallet'
import { ActivityRepository } from './repositories/activity'
import { mainRepository } from './repositories/main'
import CrowdSaleRepository from './repositories/crowd-sale'
import ParamsRepository from './repositories/params'
import MarketRepository from './repositories/marketplace'
import PublicRepository from './repositories/public'

type RepositoryName = 'verify' | 'auth' | 'setting' | 'upload' | 'activity' | 'affiliate' | 'wallet' | 'main' | 'crowd-sale' | 'params' | 'market' | 'public'

export default function getRepository(name: RepositoryName): any {
  switch (name) {
    case 'verify':
      return new VerifyRepository()
    case 'auth':
      return new AuthRepository()
    case 'setting':
      return new SettingRepository()
    case 'upload':
      return new UploadRepository()
    case 'activity':
      return new ActivityRepository()
    case 'affiliate':
      return new affiliateRepository()
    case 'main':
      return new mainRepository()
    case 'wallet':
      return new WalletRepository()
    case 'crowd-sale':
      return new CrowdSaleRepository()
    case 'params':
      return new ParamsRepository()
    case 'market':
      return new MarketRepository()
    case 'public':
        return new PublicRepository()
    default:
      return null
  }
}
