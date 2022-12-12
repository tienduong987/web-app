<template>
  <div class="bg-white mb-24 wallet-header">
    <div class="be-flex align-center jc-space-between wallet-header__above">
      <div class="wallet-header__above-tabs be-flex">
        <div class="tab-item cursor" v-for="tab in getTabs" :key="tab.id" :class="tabActive === tab.currency ? 'tab-active' : null" @click="handleChangeTab(tab)">
          <span class="text-base">{{ tab.title }}</span>
        </div>
      </div>
      <div class="wallet-header__above-btn be-flex">
        <button v-if="moduleConfig.Deposit" class="btn-default-bg mr-15 text-regular btn is-none-border" @click="handleOpenPopup('popup-deposit')">
          {{ $t('wallet.button.deposit') }} {{ getUnit }}
        </button>
        <button v-if="moduleConfig.Withdraw" class="btn-default mr-15 text-regular" @click="handleOpenPopup('popup-withdraw')">
          <p>{{ $t('wallet.button.withdraw') }} {{ getUnit }}</p>
        </button>
        <button v-if="tabActive !== 'LYNK' && tabActive !== 'CLM' && moduleConfig.Crowdsale" class="btn-default mr-15 text-regular" @click="handleOpenPopup('popup-buy-lyn')">
          <p>{{ $t('wallet.button.buy') }} {{ coinMain }}</p>
        </button>
        <button v-if="moduleConfig.Transfer" class="btn-default mr-24 text-regular" @click="handleOpenPopup('popup-transfer-lyn')">
          <p>{{ $t('wallet.button.transfer') }} {{ getUnit }}</p>
        </button>
      </div>
    </div>
    <div class="wallet-header__below">
      <div class="be-flex jc-space-between wallet-header__below-amount" :class="tabActive === coinMain ? ' wallet-header__below-amount--fix' : null">
        <div class="mr-24 amount-wallet">
          <div class="be-flex align-center above" :style="{ height: tabActive === 'LYNK' ? '55px' : 'auto' }">
            <base-icon :icon="getIcon" size="40" :style="{ display: tabActive === 'LYNK' ? 'display:inline-flex' : 'block' }" />
            <!-- <img v-else src="../../../assets/images/icon-eth.jpg" alt="aa" /> -->
            <div class="title">
              <span class="d-block text-l text-semibold title-coin">{{ getTitle }}</span>
              <span class="text-xs" style="color: #5b616e">{{ $t('wallet.balance') }}</span>
            </div>
          </div>
          <div class="amount">
            <span class="d-ib text-5xl text-semibold mr-16" :class="getClassUnit">{{ numOfBallance | convertAmountDecimal(getUnit) }} {{ getUnit }}</span>
            <span class="text-2xl amount-exchange">~${{ (numOfBallance * currentExchangeRate) | convertAmountDecimal('USD') }}</span>
          </div>
        </div>
        <div class="mr-24 amount-lock" :class="tabActive === coinMain ? 'amount-lock--border' : null">
          <div class="be-flex align-center above">
            <base-icon icon="icon-lock" style="color: #000" size="40" />
            <div class="title">
              <span class="d-block text-l text-semibold title-coin">{{ $t('wallet.lock') }}</span>
              <span class="text-xs" style="color: #5b616e">{{ $t('wallet.withdrawal-request') }}</span>
            </div>
          </div>
          <div class="amount">
            <span class="d-ib text-5xl text-semibold mr-16">{{ numOfLockedAmount | convertAmountDecimal(getUnit) }} {{ getUnit }}</span>
            <span class="text-2xl amount-exchange">~${{ (numOfLockedAmount * currentExchangeRate) | convertAmountDecimal('USD') }}</span>
          </div>
        </div>
        <div class="amount-vesting" v-if="tabActive === coinMain">
          <div class="be-flex align-center above">
            <base-icon icon="icon-vesting" style="color: #000" size="40" />
            <div class="title">
              <span class="d-block text-l text-semibold title-coin">{{ $t('wallet.vesting-title') }}</span>
              <span v-if="vesting && vesting.nextVestingDate" class="text-xs" style="color: #5b616e"
                >{{ $t('wallet.next-release') }} {{ vesting && vesting.nextVestingDate | formatMMDDYYWithoutHours }}</span
              >
              <span v-else> &nbsp;</span>
            </div>
          </div>
          <div class="amount">
            <span class="d-ib text-5xl text-semibold mr-16">{{ vesting && vesting.totalAmount | convertAmountDecimal(coinMain) }} {{ coinMain }}</span>
            <span class="text-2xl amount-exchange">~${{ vesting && vesting.totalAmountInUsd | convertAmountDecimal('USD') }}</span>
          </div>
        </div>
      </div>
    </div>
    <popup-with-draw :dataWithdraw="dataWithdraw" :type="tabActive" @reloadData="reloadData" />
    <popup-deposit :type="tabActive" />
    <popup-buy-lyn :type="tabActive" @reloadData="init" />
    <popup-transfer-lyn :dataTransfer="dataTransfer" @reloadData="reloadData" :typeActive="tabActive" />
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import PopupWithDraw from './popup/PopupWithDraw.vue'
  import PopupDeposit from './popup/PopupDeposit.vue'
  import PopupBuyLyn from './popup/PopupBuyLin.vue'
  import PopupTransferLyn from './popup/PopupTransferLyn.vue'
  import PopupMixin from '@/mixins/popup'
  import { filter, includes, forEach } from 'lodash'

  import { namespace } from 'vuex-class'

  import getRepository from '@/services'
  import WalletRepository from '@/services/repositories/wallet'
  import EventBus from '@/utils/eventBus'

  const apiWallet: WalletRepository = getRepository('wallet')
  const beBase = namespace('beBase')
  const beAuth = namespace('beAuth')

  import firebase from '@/utils/firebase'

  @Component({ components: { PopupWithDraw, PopupDeposit, PopupBuyLyn, PopupTransferLyn } })
  export default class WalletHeader extends Mixins(PopupMixin) {
    @beBase.State('coinMain') coinMain!: string
    @beAuth.State('moduleConfig') moduleConfig!: Record<string, any>
    @beAuth.State('user') user!: Record<string, any>

    roundCurrentPopup: Record<string, any> | any = {}
    listRoundPopup: Record<string, any>[] = []
    listenerCrowd: any = null

    tabs: Record<string, any>[] = [
      {
        id: 1,
        title: 'Bitcoin',
        currency: 'BTC',
        routeName: 'WalletBtc'
      },
      {
        id: 2,
        title: 'Ethereum',
        currency: 'ETH',
        routeName: 'WalletEth'
      },
      {
        id: 3,
        title: 'BNB',
        currency: 'BNB',
        routeName: 'WalletBnb'
      },
      {
        id: 4,
        title: 'Tether',
        currency: 'USDT',
        routeName: 'WalletUsdt'
      },
      {
        id: 5,
        title: 'USDC',
        currency: 'USDC',
        routeName: 'WalletUsdc'
      },
      {
        id: 6,
        title: 'Binance USD',
        currency: 'BUSD',
        routeName: 'WalletBusd'
      }
    ]
    tabActive = ''

    listener: any = null

    wallet: Array<Record<string, any>> = []
    vesting: Record<string, any> = {}

    exchangeRate: Array<Record<string, any>> = []

    dataTransfer: any = {}
    dataWithdraw: any = {}

    // currencyObj: Record<string, any> = {
    //   LYN: '.00',
    //   BTC: '.00000000',
    //   ETH: '.00000000'
    // }

    routeTabActive: Record<string, any> = {
      WalletLyn: 'LYNK',
      WalletClm: 'CLM',
      WalletBtc: 'BTC',
      WalletEth: 'ETH',
      WalletBnb: 'BNB',
      WalletUsdt: 'USDT',
      WalletUsdc: 'USDC',
      WalletBusd: 'BUSD'
    }

    get getStatusCanBuy(): boolean {
      const existRound = includes(this.user.roundsUserCanBuy, this.roundCurrentPopup.id)
      return existRound
    }

    get getTabs(): Array<Record<string, any>> {
      if (this.coinMain === 'LYNK') {
        const tab: Record<string, any> = {
          id: 0,
          title: 'LynKey',
          currency: 'LYNK',
          routeName: 'WalletLyn'
        }
        return [tab, ...this.tabs]
      } else {
        const tab: Record<string, any> = {
          id: 0,
          title: 'CleverMe',
          currency: 'CLM',
          routeName: 'WalletClm'
        }
        return [tab, ...this.tabs]
      }
    }

    get getTitle(): any {
      switch (this.tabActive) {
        case 'LYNK':
          return this.$t('wallet.Linkey')
        case 'BTC':
          return this.$t('wallet.Bitcoin')
        case 'ETH':
          return this.$t('wallet.Ethereum')
        case 'BNB':
          return this.$t('wallet.Bnb')
        case 'USDT':
          return this.$t('wallet.Usdt')
        case 'USDC':
          return this.$t('wallet.Usdc')
        case 'BUSD':
          return this.$t('wallet.Busd')
        default:
          return this.$t('wallet.Cleverme')
      }
    }
    get getIcon(): string {
      switch (this.tabActive) {
        case 'LYNK':
          return 'icon-lin'
        case 'BTC':
          return 'icon-btc'
        case 'ETH':
          return 'icon-eth'
        case 'BNB':
          return 'icon-bnb'
        case 'USDT':
          return 'icon-usdt'
        case 'USDC':
          return 'icon-usdc'
        case 'BUSD':
          return 'icon-busd'
        default:
          return 'icon-clm'
      }
    }
    get getUnit(): string {
      switch (this.tabActive) {
        case 'LYNK':
          return 'LYNK'
        case 'BTC':
          return 'BTC'
        case 'ETH':
          return 'ETH'
        case 'BNB':
          return 'BNB'
        case 'USDT':
          return 'USDT'
        case 'USDC':
          return 'USDC'
        case 'BUSD':
          return 'BUSD'
        default:
          return 'CLM'
      }
    }
    get getClassUnit(): string {
      switch (this.tabActive) {
        case 'LYNK':
          return 'amount-lyn'
        case 'BTC':
          return 'amount-btc'
        case 'ETH':
          return 'amount-eth'
        case 'BNB':
          return 'amount-bnb'
        case 'USDT':
          return 'amount-usdt'
        case 'USDC':
          return 'amount-usdc'
        case 'BUSD':
          return 'amount-busd'
        default:
          return 'amount-clm'
      }
    }

    get numOfBallance(): number {
      const currentWallet = filter(this.wallet, elm => elm.currency === this.tabActive)[0]
      return currentWallet?.assetBalances.balance || 0
    }

    get numOfLockedAmount(): number {
      const currentWallet = filter(this.wallet, elm => elm.currency === this.tabActive)[0]
      return currentWallet?.assetBalances.totalLockedAmount || 0
    }

    get currentExchangeRate(): number {
      const currentExchange = filter(this.exchangeRate, elm => elm.currency === this.tabActive)[0]
      return currentExchange?.exchangeRate || 0
    }

    created(): void {
      this.handleTurnOnFirebase()
      const exchangeRateRef = firebase.database().ref('exchange_rates')
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let _this = this
      this.listener = exchangeRateRef.on('value', function (snapshot) {
        _this.exchangeRate = snapshot.val()
      })
      this.tabActive = this.routeTabActive[this.$route.name!]
      this.init()
    }

    destroyed(): void {
      const exchangeRateRef = firebase.database().ref('exchange_rates')
      exchangeRateRef.off('value', this.listener)
      const leadsRef = firebase.database().ref('crowd-sales')
      leadsRef.off('value', this.listenerCrowd)
    }

    handleTurnOnFirebase(): void {
      const leadsRef = firebase.database().ref('crowd-sales')
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let _this = this

      this.listenerCrowd = leadsRef.on('value', function (snapshot) {
        _this.listRoundPopup = snapshot.val()
        const roundActive = filter(snapshot.val(), round => round.isActive)

        if (!roundActive.length) {
          _this.roundCurrentPopup = null
          _this.handleGetRoundNext()
        } else {
          _this.roundCurrentPopup = roundActive[0]
        }
      })
    }

    handleGetRoundNext(): void {
      const leadsRef = firebase.database().ref('crowd-sales')
      leadsRef.off('value', this.listener)

      /**
       * Nếu response là round cuối
       * response là null <=> chưa vào round nào => lấy round 1
       */

      if (!this.roundCurrentPopup) {
        const roundFirst = this.listRoundPopup[0]
        const roundLast = this.listRoundPopup[this.listRoundPopup.length - 1]

        const toDay = Date.now()
        const fromTimeRoundFirst = new Date(roundFirst.fromDate.time).getTime()
        const toTimeRoundLast = new Date(roundLast.toDate.time).getTime()

        // Nếu today > time roundLast
        if (toDay > toTimeRoundLast) {
          this.roundCurrentPopup = roundLast
        }
        // Nếu today < time roundFirst
        if (toDay < fromTimeRoundFirst) {
          this.roundCurrentPopup = this.listRoundPopup[0]
        }
        // Nếu fromTimeRoundFirst < today < toTimeRoundLast
        if (toDay > fromTimeRoundFirst && toDay < toTimeRoundLast) {
          forEach(this.listRoundPopup, round => {
            const fromTime = new Date(round.fromDate.time).getTime()
            if (toDay < fromTime) {
              this.roundCurrentPopup = round
              return false
            }
          })
        }
      }
    }

    async init(): Promise<void> {
      try {
        this.wallet = await apiWallet.getMyWallet({ currency: this.tabActive })
        if (this.tabActive === 'LYNK' || this.tabActive === 'CLM') {
          this.vesting = await apiWallet.getInfoVesting({ userId: this.user.userId })
        }
        // const result = await apiWallet.getExchangeRate()
        // this.exchangeRate = result.exchangeRates
      } catch (error) {
        console.log(error)
      }
    }
    async reloadData(): Promise<void> {
      //ban su kien sang wallet Tabel
      await EventBus.$emit('callAcountTransaction')
      await this.init()
    }
    handleChangeTab(tab: Record<string, any>): void {
      this.tabActive = tab.currency
      this.init()
      this.$router.push({ name: tab.routeName })

      // EventBus.$emit('changeTab', tab.currency)
    }

    handleOpenPopup(popupName: string): void {
      if (popupName == 'popup-transfer-lyn') {
        apiWallet.getLynInfo(this.tabActive.toLowerCase()).then((res: any) => {
          this.dataTransfer = res
          if (res.kycStatus != 'VERIFIED') {
            let message: any = this.$t('wallet.popup.errorGetLyn2')
            this.$message.error(message)
          } else if (res.available <= 0) {
            let message: any = this.$t('wallet.popup.errorGetLyn4')
            this.$message.error(message)
          } else {
            this.setOpenPopup({
              popupName,
              isOpen: true
            })
          }
        })
      } else if (popupName == 'popup-withdraw') {
        apiWallet.getDataWithdraw(this.tabActive.toLowerCase()).then((res: any) => {
          this.dataWithdraw = res
          console.log('dataWithdraw: ', this.dataWithdraw)
          if (res.kycStatus != 'VERIFIED') {
            let message: any = this.$t('wallet.popup.errorGetLyn2')
            this.$message.error(message)
          } else if (res.available <= 0) {
            let message: any = this.$t('wallet.popup.errorGetLyn4')
            this.$message.error(message)
          } else {
            this.setOpenPopup({
              popupName,
              isOpen: true
            })
          }
        })
      } else {
        if (popupName == 'popup-buy-lyn') {
          if (!this.getStatusCanBuy) {
            const message: any = this.$t('notify.can-not-buy-lyn')
            this.$message.error({ message, duration: 5000 })
            return
          } else if (this.numOfBallance <= 0) {
            let message: any = this.$t('buy-lyn.fail')
            this.$message.error(message)
          } else {
            this.setOpenPopup({
              popupName,
              isOpen: true
            })
          }
        } else {
          this.setOpenPopup({
            popupName,
            isOpen: true
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .wallet-header {
    &__above {
      border-bottom: 1px solid var(--bc-border-primary);
      &-tabs {
        .tab-item {
          padding: 16px 12px;
          position: relative;
          color: var(--bc-text-color-tab-item);
          &:hover {
            background: var(--bc-tab-active);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        .tab-active {
          background: var(--bc-tab-active);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: 0;
            left: 0;
            background: var(--bc-tab-active);
          }
        }
      }
    }

    &__below {
      padding: 24px;
      &-amount {
        .amount-wallet,
        .amount-lock,
        .amount-vesting {
          flex-basis: 50%;
          word-break: break-word;
          .title {
            margin-left: 16px;
            .title-coin {
              color: #201f1e;
            }
          }
          .amount {
            margin-top: 10px;
          }
        }
        .amount-vesting {
          .amount {
            color: var(--bc-amount-lock);
          }
        }
        .amount-wallet,
        .amount-lock--border {
          border-right: 1px solid var(--bc-border-primary);
        }
      }
      &-amount--fix {
        .amount-wallet,
        .amount-lock,
        .amount-vesting {
          width: 33.333%;
          flex-basis: unset;
        }
      }
    }
  }
  .amount-exchange {
    color: #5b616e;
  }
  .class-icon-lynk {
    font-size: 30px !important;
    background: #f3f2f1;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
  }
  .btn-default {
    &:hover {
      p {
        background: var(--bc-btn-default-text-hover);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        border-color: var(--bc-btn-default-border-hover);
        text-shadow: 0px 0px #00000000;
      }
    }
  }
</style>
