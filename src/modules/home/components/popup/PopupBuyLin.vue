<template>
  <base-popup name="popup-buy-lyn" class="popup-buy-lyn" width="600px" :open="handleOpen" :close="handleClose">
    <div slot="title">
      <span>{{ $t('buy-lyn.title') }} {{ coinMain }}</span>
    </div>
    <div class="content">
      <el-form :model="buyLyn" class="form-buy-lyn">
        <el-form-item class="list-wallet" :label="$t('label.buy-from')">
          <el-select disabled v-model="buyLyn.address" class="w-100">
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
        <el-form-item class="mb-1" prop="amount">
          <el-input
            :placeholder="$t('placeholder.amount')"
            v-model="amount"
            @input="changeAmount"
            @keypress.native="onlyNumber($event, 'amount')"
            @keyup.native="numberFormat($event)"
          />
          <div class="prefix prefix--amount">
            <span>{{ this.type }}</span>
          </div>
          <div class="be-flex jc-space-between w-100" slot="label">
            <span>{{ $t('label.pay-amount') }}</span>
            <span
              >{{ $t('withdraw.available') }}: <span :class="'amount-' + getUnit">{{ availableBalance }} {{ this.type }}</span></span
            >
          </div>
        </el-form-item>
        <div class="be-flex jc-space-between mb-24 tab-amount">
          <div class="text-base cursor amount-item" v-for="tab in tabAmount" :key="tab" :class="tab === tabActive ? 'active' : null" @click="handleSelectTab(tab)">
            <span>{{ tab }}%</span>
          </div>
        </div>
        <el-form-item>
          <el-input Tplaceholder="0" v-model="receive" @input="changeReceive" @keypress.native="onlyNumber($event, 'receive')" @keyup.native="numberFormat($event)" />
          <div class="prefix prefix--amount">
            <span>{{ coinMain }}</span>
          </div>
          <div class="be-flex jc-space-between w-100" slot="label">
            <span>{{ $t('label.receive') }}</span>
            <span style="color: #605e5c">{{ stringExchange }} </span>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="footer">
      <button class="btn-default mr-15 text-regular btn-h40" @click="hanldeReset">
        <p>{{ $t('button.reset') }}</p>
      </button>
      <!-- <button class="btn-default-bg text-regular btn-h40"  disabled  @click="handleConfirm">{{ $t('button.continue') }}</button> -->
      <button
        :class="disableBtn ? 'btn--disabled btn-default-bg text-regular btn-h40' : 'btn-default-bg text-regular btn-h40 is-none-border btn-theme'"
        :disabled="disableBtn"
        @click="debounceConfirm"
      >
        {{ $t('button.continue') }}
      </button>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import firebase from '@/utils/firebase'

  import { debounce, filter, includes, forEach } from 'lodash'
  import { namespace } from 'vuex-class'
  const beBase = namespace('beBase')
  import getRepository from '@/services'
  import WalletRepository from '@/services/repositories/wallet'
  import EventBus from '@/utils/eventBus'
  import CrowdSaleRepository from '@/services/repositories/crowd-sale'
  const bcCrowdsale = namespace('bcCrowdsale')
  const bcAuth = namespace('beAuth')

  const apiCrowdSale: CrowdSaleRepository = getRepository('crowd-sale')
  const apiWallet: WalletRepository = getRepository('wallet')
  interface IWithdraw {
    address: string | number
    amount: string
    receive: string | number
    [x: string]: any
  }
  @Component({ components: {} })
  export default class PopupBuyLyn extends Mixins(PopupMixin) {
    @Prop({ required: false, type: String, default: '' }) type!: string

    @beBase.State('coinMain') coinMain!: string

    wallet: Array<Record<string, any>> = []
    exchangeRate: Array<Record<string, any>> = []
    tabAmount: number[] = [25, 50, 75, 100]
    tabActive: any = null
    isScan = false
    amount = ''
    receive = ''
    disableBtn = true
    stringExchange = ''
    showError = false
    exchange: any = {}
    exchangeBTCToLyn: any = {}
    exchangeBTCToUSD: any = {}
    exchangelynToUSD: any = {}
    typeDeposit = ''
    //
    buyLyn = {
      address: 0
    } as IWithdraw
    result = ''
    disabledAmount = false
    disableRecive = false
    dataWallet: any = {}
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
        id: 5,
        name: 'BUSD Wallet',
        symbol: 'BUSD',
        icon: 'icon-busd',
        disabled: true
      }
    ]
    apiWallet: any

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
          return this.coinMain
      }
    }

    hanldeReset(): void {
      this.tabActive = null
      ;(this.amount = ''), (this.receive = '')
      this.disableRecive = false
      this.disabledAmount = false
    }
    handleClose(): void {
      clearInterval(this.callApi)
      this.setOpenPopup({
        popupName: 'popup-buy-lyn',
        isOpen: false
      })
      this.hanldeReset()
    }
    tokenAmount = ''
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    changeAmount(value: any): void {
      this.tabActive = null
      const _amount = Number(value.replaceAll(',', ''))
      if (parseFloat(value) > 0) {
        this.receive = this.$options.filters?.convertAmountDecimal(_amount * this.exchangeBTCToLyn.oneSourceToTarget, this.coinMain)
      } else {
        this.receive = '0'
      }
      // this.disableBtn = value ? false : true
      console.log('re', this.receive)
      if (value == null || value == '' || _amount == 0 || this.amount == '0' || this.receive == '0.00') {
        this.disableBtn = true
      } else {
        this.disableBtn = false
      }
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    changeReceive(value: any): void {
      this.tabActive = null
      const _amount = Number(value.replaceAll(',', ''))
      this.disabledAmount = value ? true : false
      if (_amount > 0) {
        this.amount = this.$options.filters?.convertAmountDecimal(_amount / this.exchangeBTCToLyn.oneSourceToTarget, this.getUnit)
        this.tokenAmount = this.amount.toString().replace(',', '')
        // console.log('amout', this.amount)
        // this.amount = Number(_amount / this.exchangeBTCToLyn.oneSourceToTarget)
        //   .toFixed(8)
        //   .replace(/\.?0+$/, '')
        //0.000
        // console.log('amount', a)
      } else {
        this.amount = '0'
      }
      // this.disableBtn = value ? false : true
      if (value == null || value == '' || _amount == 0 || this.amount == '' || this.amount == '0') {
        this.disableBtn = true
      } else {
        this.disableBtn = false
      }

      // //
      // const arr1 = [1,2,3]*3
      // const arr2 = []
      // arr2 = arr1*3
      // console.log('arr2',arr2)
    }
    @Watch('amount') checkError(value: string): void {
      const a = parseFloat(value)
      if (a > 0) {
        this.showError = false
      } else {
        this.showError = true
      }
    }
    minBit = ''
    minEth = ''
    minBnb = ''
    minUsdt = ''
    minUsdc = ''
    systemTokenMinToBuy = ''
    mintoBuy: any = {}
    async getExchangeRates(): Promise<void> {
      this.mintoBuy = await apiCrowdSale.getExchangeRates()
      // // console.log('mintobu1y', this.mintoBuy.systemToken)
      // this.minBit = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_btc']
      // this.minEth = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_eth']
      // this.minBnb = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_bnb']
      // this.minUsdt = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_usdt']
      // this.minUsdc = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_usdc']
      // console.log('fd', this.minBit)

      if (this.type == 'ETH') {
        this.systemTokenMinToBuy = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_eth']
      } else if (this.type == 'BNB') {
        this.systemTokenMinToBuy = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_bnb']
      } else if (this.type == 'USDT') {
        this.systemTokenMinToBuy = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_usdt']
      } else if (this.type == 'USDC') {
        this.systemTokenMinToBuy = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_usdc']
      } else if (this.type == 'BTC') {
        this.systemTokenMinToBuy = this.mintoBuy.systemToken['system.token.min.crowd.sale.with_btc']
      }
    }
    handleSelectTab(tab: number): void {
      if (this.tabActive === tab) {
        this.tabActive = null
        this.disableBtn = true
        this.amount = ''
        this.receive = ''
      } else {
        this.tabActive = tab
        this.disableBtn = false
        const _available = Number(this.availableBalance.replaceAll(',', ''))
        const amount = (tab * _available) / 100
        this.amount = this.$options.filters?.convertAmountDecimal(amount, this.getUnit)
        const receive = Number(this.amount.replaceAll(',', ''))
        this.receive = this.$options.filters?.convertAmountDecimal(receive * this.exchangeBTCToLyn.oneSourceToTarget, this.coinMain)
        // const test = parseFloat(this.amount) * parseFloat(this.exchangeBTCToLyn.oneSourceToTarget)
        // this.receive = test.toString()
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

    debounceConfirm(): void {
      // console.log('mintobuy', this.systemTokenMinToBuy)
      this.disableBtn = true
      this.handleConfirm(this)
      // if (this.receive < this.systemTokenMinToBuy) {
      //   const message: any = this.$t('buy-lyn.check') + ' ' + this.systemTokenMinToBuy
      //   this.$message.warning(message)
      //   console.log('aaa', message)
      // } else {
      //   this.handleConfirm(this)
      // }
    }

    handleConfirm = debounce(function (_this) {
      const paidAmout = _this.amount.toString().replaceAll(',', '')
      const tokenAmount = _this.receive.toString().replaceAll(',', '')
      const params: any = {
        tokenAddress: _this.walletDetailLYN[0]?.address, // dia chi vi lyn user - ok
        tokenCurrency: _this.coinMain, // loại ví là lyn -ok
        tokenNetwork: _this.walletDetailLYN[0]?.network, // mạng ví lyn  -ok
        tokenAmount: tokenAmount, // Số lượng LYN muốn mua, khi lưu xuống DB sẽ được x10^18
        tokenUsdExchangeRate: _this.exchangeBTCToLyn.oneTargetToUsd, // ti gia lyn / usd
        paidAddress: _this.walletDetailBTC[0]?.address, // dia chi cua cai vi hien tai user
        paidCurrency: _this.type, // loại tiền thanh toán
        paidNetwork: _this.walletDetailBTC[0]?.network, // mạng của loại tiền thanh toán
        paidAmount: paidAmout, // tong so tien phai tra btc
        paidUsdExchangeRate: _this.exchangeBTCToLyn.oneSourceToUsd, // tỉ giá tiền mua  -> usd (api  BTC/usd)
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
          _this.$emit('reloadData')
          EventBus.$emit('reloadData')
          _this.handleClose()
        })
        .catch(e => {
          console.log('error')
          // const message: any = _this.$t(e.response.data.message)
          // _this.$message.error(message)
        })
    }, 300)

    walletDetailBTC: any = {}
    walletDetailLYN: any = {}
    availableBalance: any = ''
    BTC = 'BTC'
    ETH = 'ETH'
    LYNK = this.coinMain
    USD = 'USD'

    async getDataReload(): Promise<any> {
      // this.exchangeBTCToUSD = await apiWallet.getExchangeRateTwoCoin(this.type, this.USD)
      this.exchangeBTCToLyn = await apiWallet.getExchangeRateTwoCoin(this.type, this.coinMain)
      this.walletDetailBTC = await apiWallet.getMyWallet({ currency: this.type })
      this.walletDetailLYN = await apiWallet.getMyWallet({ currency: this.coinMain })

      // this.exchangelynToUSD = await apiWallet.getExchangeRateTwoCoin(this.coinMain, this.USD)
      // const fixed = parseFloat(this.exchangeBTCToLyn.oneSourceToTarget).toFixed(2)
      const fixed = this.$options.filters?.convertAmountDecimal(parseFloat(this.exchangeBTCToLyn.oneSourceToTarget).toFixed(2), this.coinMain)
      this.stringExchange = '1 ' + this.type + ' = ' + fixed + ' ' + this.coinMain
      // this.availableBalance = this.walletDetailBTC[0].assetBalances.availableBalance
      this.availableBalance = this.$options.filters?.convertAmountDecimal(this.walletDetailBTC[0].assetBalances.availableBalance, this.getUnit)
      console.log('available', this.availableBalance)
    }
    callApi: any = {}

    async handleOpen(): Promise<any> {
      await this.getExchangeRates()
      this.disableBtn = true
      this.callApi = setInterval(this.getDataReload, 15000)
      this.buyLyn.address = this.type
      // setTimeout(() => {
      //   this.handleOpen()
      // }, 10000)
      // this.exchangeBTCToUSD = await apiWallet.getExchangeRateTwoCoin(this.type, this.USD)
      this.exchangeBTCToLyn = await apiWallet.getExchangeRateTwoCoin(this.type, this.coinMain)
      this.walletDetailBTC = await apiWallet.getMyWallet({ currency: this.type })
      this.walletDetailLYN = await apiWallet.getMyWallet({ currency: this.coinMain })

      // this.exchangelynToUSD = await apiWallet.getExchangeRateTwoCoin(this.coinMain, this.USD)
      // const fixed = parseFloat(this.exchangeBTCToLyn.oneSourceToTarget).toFixed(2)
      const fixed = this.$options.filters?.convertAmountDecimal(parseFloat(this.exchangeBTCToLyn.oneSourceToTarget).toFixed(2), this.coinMain)
      this.stringExchange = '1 ' + this.type + ' = ' + fixed + ' ' + this.coinMain
      // this.availableBalance = this.walletDetailBTC[0].assetBalances.availableBalance
      this.availableBalance = this.$options.filters?.convertAmountDecimal(this.walletDetailBTC[0].assetBalances.availableBalance, this.getUnit)
    }
  }
</script>

<style scoped lang="scss">
  .colorError {
    border-color: red !important;
    color: red;
  }
  .popup-buy-lyn {
    .content {
      .prefix {
        position: absolute;
        z-index: 10;
      }
      .prefix--camera,
      .prefix--amount {
        right: 13px;
        top: 41%;
      }
      .amount-BTC {
        color: var(--bc-amount-btc);
      }
      .amount-ETH {
        color: var(--bc-amount-eth);
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
    }
    .footer {
      .btn-h40 {
        height: 40px;
      }
    }
    .line-border {
      border-bottom: 1px solid var(--bc-border-primary);
    }
    .btn-theme {
      background: var(--bc-tab-active);
      &:hover {
        background: var(--bc-theme-primary-gradient-hover);
      }
    }
  }
</style>
