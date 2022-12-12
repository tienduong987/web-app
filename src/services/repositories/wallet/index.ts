import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export default class WalletRepository extends BaseRepository {
  constructor() {
    super('main/api/v1')
  }

  async getMyWallet(params?: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/user/asset/my-wallets`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getExchangeRate(): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/exchange-rates`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getLynInfo(lyn: string): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/transfer/${lyn}/info`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async register(data: Record<string, any>, captcha: string): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}/register`, data, {
        headers: {
          'captcha-response': captcha
        }
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
  async buyLyn(params: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/crowdsales/buy`, params)
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListTransaction(params: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/user/asset/account-transaction`, { params })
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async validateLyn(lyn: string, data?: Record<string, any>): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}/transfer/${lyn}/validate`, data)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getExchangeRateTwoCoin(source: string, target: string): Promise<any> {
    try {
      const rs = await request.get(`${this.prefix}/exchange-rates/exchange/${source}/${target}`)
      return Promise.resolve(rs.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async verificatySendcode(): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/transfer/sendcode`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async transferLyn(lyn: string, data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/transfer/${lyn}`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  //

  async getDataWithdraw(source: string): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/withdraw/${source}/info`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async sendCodeWithdraw(): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/withdraw/sendcode`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async withdrawLyn(source: string, data?: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/withdraw/${source}`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListNetWorkUSDT(): Promise<Record<string, any>[]> {
    try {
      const result = await request.get(`${this.prefix}/user/asset-network`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getInfoVesting(params?: Record<string, any>): Promise<Record<string, any>> {
    try {
      const result = await request.get(`${this.prefix}/vesting`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getListRoundCrowdsale(): Promise<Record<string, any>[]> {
    try {
      const result = await request.get(`${this.prefix}/crowdsales`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getDetailTransaction(params?: Record<string, any>): Promise<Record<string, any>> {
    try {
      const result = await request.get(`${this.prefix}/transaction`, { params })
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
