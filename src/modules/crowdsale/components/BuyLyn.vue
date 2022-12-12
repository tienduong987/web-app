<template>
  <div class="content">
    <h3 class="mb-24 text-2xl text-bold uppercase">{{ $t('crowd-sale.buy') }} {{ coinMain === 'LYNK' ? 'LYNK' : 'CLM' }}</h3>
    <el-form :model="buyLyn" class="form-buy-lyn">
      <el-form-item class="list-wallet" :label="$t('label.buy-from')">
        <el-select :disabled="!isActiveRound" v-model="buyLyn.address" class="w-100" @change="handleSelectWallet">
          <el-option v-for="wallet in listWallet" :key="wallet.id" :value="wallet.symbol" :label="wallet.name">
            <template>
              <div class="be-flex wallet-item">
                <base-icon :icon="wallet.icon" size="24" />
                <span class="d-ib" style="margin-left: 10px">{{ wallet.name }}</span>
              </div>
            </template>
          </el-option>
          <div class="suffix" slot="prefix">
            <base-icon :icon="getIcon" size="24" />
          </div>
        </el-select>
      </el-form-item>
      <el-form-item class="mb-1">
        <el-input
          :disabled="!isActiveRound"
          :placeholder="$t('placeholder.amount')"
          v-model="amount"
          @keypress.native="onlyNumber($event, 'amount')"
          @keyup.native="numberFormat($event)"
          @input="handleEneterAmount"
        />
        <div class="prefix prefix--amount">
          <span>{{ getUnit }}</span>
        </div>
        <div class="be-flex jc-space-between w-100" slot="label">
          <span>{{ $t('label.pay-amount') }}</span>
          <span
            >{{ $t('withdraw.available') }}: <span :class="'amount-' + getUnit">{{ available }} {{ getUnit }}</span></span
          >
        </div>
      </el-form-item>
      <div class="be-flex jc-space-between mb-24 tab-amount">
        <div class="text-base cursor amount-item" v-for="tab in tabAmount" :key="tab" :class="tab === tabActive ? 'active' : null" @click="handleSelectTab(tab)">
          <span>{{ tab }}%</span>
        </div>
      </div>
      <el-form-item>
        <el-input
          :disabled="!isActiveRound"
          Tplaceholder="0"
          v-model="receive"
          @keypress.native="onlyNumber($event, 'receive')"
          @keyup.native="numberFormat($event)"
          @input="handleEneterReceive"
        />
        <div class="prefix prefix--amount">
          <span style="color: #5b616e">{{ coinMain === 'LYNK' ? 'LYNK' : 'CLM' }}</span>
        </div>
        <div class="be-flex jc-space-between w-100" slot="label">
          <span>{{ $t('label.receive') }}</span>
          <span style="color: #605e5c">1 {{ getUnit }} = {{ fillValue }} {{ coinMain === 'LYNK' ? 'LYNK' : 'CLM' }} </span>
        </div>
      </el-form-item>
      <el-button
        :loading="isLoading"
        :class="disableBtn ? 'btn--disabled btn-default-bg text-bold btn-h48 w-100 btn' : 'btn-default-bg text-bold btn-h48 w-100 btn'"
        :disabled="disableBtn"
        class="is-none-border"
        style="font-size: 16px"
        type="button"
        @click="debounceConfirm"
      >
        {{ $t('button.buy') }} {{ coinMain === 'LYNK' ? 'LYNK' : 'CLM' }}
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { debounce, filter, includes } from 'lodash'
  import getRepository from '@/services'
  import WalletRepository from '@/services/repositories/wallet'
  import CrowdSaleRepository from '@/services/repositories/crowd-sale'
  import EventBus from '@/utils/eventBus'
  import { namespace } from 'vuex-class'
  const beBase = namespace('beBase')
  const bcAuth = namespace('beAuth')
  const bcCrowdsale = namespace('bcCrowdsale')

  const apiWallet: WalletRepository = getRepository('wallet')
  const apiCrowdSale: CrowdSaleRepository = getRepository('crowd-sale')

  interface IWithdraw {
    address: string | number
    amount: string
    receive: string | number
    [x: string]: any
  }

  @Component
  export default class BuyLyn extends Vue {
    @beBase.State('coinMain') coinMain!: string
    @bcCrowdsale.State('isActiveRound') isActiveRound!: boolean
    @bcCrowdsale.State('listRound') listRound!: Record<string, any>[]
    @bcCrowdsale.State('roundCurrent') roundCurrent!: Record<string, any>

    @bcAuth.State('user') user!: Record<string, any>

    tabAmount: number[] = [25, 50, 75, 100]
    tabActive: any = null
    isScan = false
    buyLyn: IWithdraw = {
      address: 'BTC',
      amount: '',
      receive: ''
    }
    disableBtn = true
    amount = ''
    receive = ''
    exchageToLynk: any = {}
    disablePayAmount = false
    disableRecive = false
    checkButton = true
    result = ''
    available: any = 0
    oneSourceToTarget = 0
    isLoading = false

    listWallet: Array<Record<string, any>> = [
      {
        id: 0,
        name: 'Bitcoin Wallet',
        symbol: 'BTC',
        icon: 'icon-btc'
      },
      {
        id: 1,
        name: 'Ethereum Wallet',
        symbol: 'ETH',
        icon: 'icon-eth'
      },
      {
        id: 2,
        name: 'Tether Wallet',
        symbol: 'USDT',
        icon: 'icon-usdt',
        disabled: true
      },
      {
        id: 3,
        name: 'USDC Wallet',
        symbol: 'USDC',
        icon: 'icon-usdc',
        disabled: true
      },
      {
        id: 4,
        name: 'BNB Wallet',
        symbol: 'BNB',
        icon: 'icon-bnb',
        disabled: true
      },
      {
        id: 4,
        name: 'BUSD Wallet',
        symbol: 'BUSD',
        icon: 'icon-busd',
        disabled: true
      }
    ]
    BTC = 'BTC'
    ETH = 'ETH'
    LYNK = this.coinMain
    USD = 'USD'

    // isActiveRound = false

    @Watch('buyLyn.address') changeAddress(value: string): void {
      this.amount = ''
      this.receive = ''
      const aa = value.toString()
      // this.handleSelectWallet(value)
      // this.testLoad()

      this.handleSelectWallet(aa)
      this.handleEneterAmount(this.amount)
    }

    get getStatusCanBuy(): boolean {
      const existRound = includes(this.user.roundsUserCanBuy, this.roundCurrent.id)
      return existRound
    }

    get getIcon(): string {
      const rs = filter(this.listWallet, (elm: Record<string, any>) => elm.symbol === this.buyLyn.address)[0]
      return rs?.icon
    }

    get getUnit(): string {
      switch (this.buyLyn.address) {
        case 'BTC':
          return 'BTC'
        case 'ETH':
          return 'ETH'
        case 'USDT':
          return 'USDT'
        case 'USDC':
          return 'USDC'
        case 'BNB':
          return 'BNB'
        case 'BUSD':
          return 'BUSD'
        default:
          return 'LYNK'
      }
    }

    // get getAvailable(): string {
    //   return this.$options.filters?.convertAmountDecimal(this.available, this.getUnit)
    // }
    callApi: any = {}
    walletDetailLYN: any = {}
    addressCurrency: any = {}
    exchangeToUSD: any = {}
    async created(): Promise<void> {
      this.walletDetailLYN = await apiWallet.getMyWallet({ currency: this.coinMain })
      this.tokenAddress = this.walletDetailLYN[0]?.address
      EventBus.$on('activeRound', (status: boolean) => {
        console.log('active round', status)

        // this.isActiveRound = status
        // this.$forceUpdate()
      })
      // await this.getExchangeRates()
      await this.handleSelectWallet('BTC')

      // this.constSetimeout = setTimeout(this.testLoad, 1000)
      this.callApi = setInterval(this.testLoad, 10000)
    }

    lynToUsd = ''
    exchangeBTCToLyn: any = {}
    exchangelynToUSD: any = {}
    oneTargetToSource = ''
    paidAddress = ''
    paidNetwork = ''
    walletActive = ''
    fillValue = ''
    constSetimeout: any = {}
    minBit = ''
    minEth = ''
    minBnb = ''
    minUsdt = ''
    minUsdc = ''
    mintoBuy: any = {}
    async getExchangeRates(): Promise<void> {
      this.mintoBuy = await apiCrowdSale.getExchangeRates()
      // console.log('mintobu1y', this.mintoBuy.systemToken)
      this.minBit = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_btc']
      this.minEth = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_eth']
      this.minBnb = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_bnb']
      this.minUsdt = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_usdt']
      this.minUsdc = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_usdc']
      // console.log('fd', this.minBit)
    }
    async testLoad(): Promise<void> {
      this.handleEneterAmount(this.amount)
      const source = this.buyLyn.address.toString()
      // this.walletDetailLYN = await apiWallet.getMyWallet({ currency: this.coinMain })
      // this.tokenAddress = this.walletDetailLYN[0]?.address
      try {
        this.exchageToLynk = await apiWallet.getExchangeRateTwoCoin(source, this.coinMain)
        this.exchangeBTCToLyn = this.exchageToLynk
        this.oneSourceToTarget = this.exchageToLynk.oneSourceToTarget
        this.oneTargetToSource = this.exchageToLynk.oneTargetToSource
        this.fillValue = this.$options.filters?.convertAmountDecimal(this.oneSourceToTarget.toFixed(2), this.coinMain)
        const availableList = await apiWallet.getMyWallet({ currency: source })
        // this.exchangeBTCToLyn = await apiWallet.getExchangeRateTwoCoin(source, this.coinMain)
        // this.exchangeToUSD = await apiWallet.getExchangeRateTwoCoin(source, this.USD)
        // this.exchangelynToUSD = await apiWallet.getExchangeRateTwoCoin(this.coinMain, this.USD)
        this.typeCoin = source
        this.tabActive = null
        const availableCurrent = filter(availableList, elm => elm.currency === source)[0]
        this.available = this.$options.filters?.convertAmountDecimal(availableCurrent.assetBalances.availableBalance, this.getUnit)

        this.paidAddress = availableCurrent.address
        this.paidNetwork = availableCurrent.network
        // this.constSetimeout = setTimeout(this.testLoad, 10000)
      } catch (error) {
        console.log(error)
      }
    }
    systemTokenMinToBuy = ''
    async handleSelectWallet(source: string): Promise<void> {
      try {
        this.exchageToLynk = await apiWallet.getExchangeRateTwoCoin(source, this.coinMain)
        this.exchangeBTCToLyn = this.exchageToLynk
        this.oneSourceToTarget = this.exchageToLynk.oneSourceToTarget
        this.oneTargetToSource = this.exchageToLynk.oneTargetToSource
        this.fillValue = this.$options.filters?.convertAmountDecimal(this.oneSourceToTarget.toFixed(2), this.coinMain)
        const availableList = await apiWallet.getMyWallet({ currency: source })
        // this.exchangeBTCToLyn = await apiWallet.getExchangeRateTwoCoin(source, this.coinMain)
        // this.exchangeToUSD = await apiWallet.getExchangeRateTwoCoin(source, this.USD)
        // this.exchangelynToUSD = await apiWallet.getExchangeRateTwoCoin(this.coinMain, this.USD)
        this.typeCoin = source
        this.tabActive = null
        const availableCurrent = filter(availableList, elm => elm.currency === source)[0]
        this.available = this.$options.filters?.convertAmountDecimal(availableCurrent.assetBalances.availableBalance, this.getUnit)
        this.paidAddress = availableCurrent.address
        this.paidNetwork = availableCurrent.network
        if (source == 'ETH') {
          this.systemTokenMinToBuy = this.minEth
        } else if (source == 'BNB') {
          this.systemTokenMinToBuy = this.minBnb
        } else if (source == 'USDT') {
          this.systemTokenMinToBuy = this.minUsdt
        } else if (source == 'USDC') {
          this.systemTokenMinToBuy = this.minUsdc
        } else if (source == 'BTC') {
          this.systemTokenMinToBuy = this.minBit
        }
        console.log('mintobuy', this.systemTokenMinToBuy)
        // this.constSetimeout = setTimeout(this.testLoad, 1000)
      } catch (error) {
        console.log(error)
      }
    }
    destroyed(): void {
      clearInterval(this.callApi)
      clearTimeout(this.constSetimeout)
      // EventBus.$off('activeRound')
    }
    typeCoin = ''
    tokenAddress = ''
    tokenUsdExchangeRate = ''

    debounceConfirm(): void {
      this.disableBtn = true
      this.isLoading = true
      this.handleConfirm(this)
      // this.isLoading = false
      // if (this.receive < this.systemTokenMinToBuy) {
      //   const message: any = this.$t('buy-lyn.check') + ' ' + this.systemTokenMinToBuy
      //   this.$message.warning(message)
      //   console.log('aaa', message)
      // } else {
      //   this.handleConfirm(this)
      // }
    }

    handleConfirm = debounce(_this => {
      // const tokenAmount = this.buyLyn.receive.toString().replace(',', '')
      if (!_this.getStatusCanBuy) {
        const message: any = _this.$t('notify.can-not-buy-lyn')
        _this.$message.error({ message, duration: 5000 })
        _this.isLoading = false
        return
      }
      const paidAmout = _this.amount.toString().replaceAll(',', '')
      const tokenAmount = _this.receive.toString().replaceAll(',', '')
      const params: any = {
        tokenAddress: _this.tokenAddress, // dia chi vi lyn user - ok
        tokenCurrency: _this.coinMain, // loại ví là lyn -ok
        tokenNetwork: _this.walletDetailLYN[0]?.network, // mạng ví lyn  -ok
        tokenAmount: tokenAmount, // Số lượng LYN muốn mua, khi lưu xuống DB sẽ được x10^18
        tokenUsdExchangeRate: _this.exchageToLynk.oneTargetToUsd, // ti gia lyn / usd
        paidAddress: _this.paidAddress, // dia chi cua cai vi hien tai user
        paidCurrency: _this.typeCoin, // loại tiền thanh toán
        paidNetwork: _this.paidNetwork, // mạng của loại tiền thanh toán
        paidAmount: paidAmout, // tong so tien phai tra btc
        paidUsdExchangeRate: _this.exchageToLynk.oneSourceToUsd, // tỉ giá tiền mua  -> usd (api  BTC/usd)
        paidTokenExchangeRate: _this.exchangeBTCToLyn.oneSourceToTarget, // BTC/LYN
        description: '',
        isExternal: 0,
        transactionCode: null
      }
      apiWallet
        ?.buyLyn(params)
        .then(() => {
          const message: any = _this.$t('buy-lyn.success')
          _this.$message.success(message)
          _this.tabActive = null
          _this.amount = ''
          _this.receive = ''
          _this.isLoading = false

          _this.$forceUpdate()
          EventBus.$emit('reloadTable')
        })
        .catch(e => {
          _this.isLoading = false
          console.log(e.response)
        })
    }, 500)

    handleEneterAmount(value: string): void {
      const _amount = Number(value.replaceAll(',', ''))
      if (parseFloat(value) > 0) {
        this.receive = this.$options.filters?.convertAmountDecimal(_amount * this.oneSourceToTarget, this.coinMain)
      } else {
        this.receive = '0'
      }
      // this.disableBtn = value ? false : true

      if (value == null || value == '' || _amount == 0 || this.receive == '' || this.receive == '0.00') {
        this.disableBtn = true
      } else {
        this.disableBtn = false
      }

      this.tabActive = null
    }
    tokenAmount = ''
    handleEneterReceive(value: string): void {
      this.tabActive = null
      const _amount = Number(value.replaceAll(',', ''))
      if (_amount > 0) {
        this.tokenAmount = this.amount.toString().replace(',', '')
        this.amount = this.$options.filters?.convertAmountDecimal(Number(_amount / this.exchangeBTCToLyn.oneSourceToTarget), this.getUnit)
      } else {
        this.amount = '0'
      }

      if (value == null || value == '' || _amount == 0 || this.amount == '' || this.amount == '0') {
        this.disableBtn = true
      } else {
        this.disableBtn = false
      }
    }

    handleSelectTab(tab: number): void {
      if (!this.isActiveRound) {
        return
      }
      if (this.tabActive === tab) {
        this.disableBtn = true
        this.tabActive = null
        this.amount = ''
        this.receive = ''
      } else {
        this.disableBtn = false
        this.tabActive = tab
        const _available = Number(this.available.replaceAll(',', ''))
        const amount = (tab * _available) / 100
        this.amount = this.$options.filters?.convertAmountDecimal(amount, this.getUnit)
        const receive = Number(this.amount.replaceAll(',', ''))
        this.receive = this.$options.filters?.convertAmountDecimal(receive * this.exchangeBTCToLyn.oneSourceToTarget, this.coinMain)
      }
    }

    onlyNumber(event: KeyboardEvent, type: string): void {
      let keyCode = event.keyCode ? event.keyCode : event.which
      //if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      // 46 is dot
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        event.preventDefault()
      }
      if (keyCode === 46 && includes(this.buyLyn[type], '.')) {
        event.preventDefault()
      }
    }

    numberFormat(event: FocusEvent): void {
      const _event: any = event
      let fnumber = _event.target.value
      if (fnumber.length > 0) {
        fnumber = fnumber.replaceAll(',', '')
        fnumber = this.$options.filters?.numberWithCommas(fnumber)
        _event.target.value = fnumber
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    flex: 1;
    margin-right: 24px;
    background: #fff;
    box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
    padding: 24px;
    border-radius: 4px;

    .prefix {
      position: absolute;
      z-index: 10;
    }
    .prefix--camera,
    .prefix--amount {
      right: 13px;
      top: 41%;
    }

    .tab-amount {
      .amount-item {
        padding: 4px 0;
        flex: 1;
        text-align: center;
        margin-right: 8px;
        background-color: #f3f2f1;
        border-radius: 4px;
        border: 1px solid transparent;
        color: #605e5c;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          border: 1px solid var(--bc-tab-buy-border);
          // color: var(--bc-text-tab-buy);
          background: var(--bc-text-tab-buy);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .active {
        background: var(--bc-tab-active);
        color: #fff;
        &:hover {
          color: #fff !important;
          background: var(--bc-tab-active);
          -webkit-text-fill-color: initial;
        }
      }
    }
    .btn-h48 {
      height: 48px;
    }
    .btn {
      font-size: 16px !important;
    }
  }
</style>
