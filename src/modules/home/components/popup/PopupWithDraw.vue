<template>
  <base-popup :open="handleOpen" :close="handleClose" name="popup-withdraw" class="popup-withdraw" width="600px">
    <div slot="title">
      <span>{{ getTitlePopup }}</span>
    </div>
    <div class="content" v-loading="loading">
      <el-form :model="withdraw" :rules="rules" ref="ruleForm" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false">
        <el-form-item :label="$t('withdraw.address')" prop="recipientAddress">
          <el-input :placeholder="$t('placeholder.address')" v-model="withdraw.recipientAddress" />
          <div class="prefix prefix--camera cursor" @click="handleScanAddress">
            <base-icon icon="icon-scan" size="24" />
          </div>
        </el-form-item>
        <el-form-item class="mb-2">
          <el-input
            :class="errorAmount ? 'errorInput' : null"
            :placeholder="$t('placeholder.amount')"
            autocomplete="new-password"
            :readonly="isReadOnly"
            v-model="withdraw.amount"
            @keypress.native="onlyNumber($event, 'amount')"
            @keyup.native="numberFormat($event)"
          />
          <div v-if="errorAmount" class="error error2">{{ $t('wallet.popup.errorAmountLyn') }}</div>
          <div class="prefix prefix--amount">
            <span>{{ getUnit }}</span>
          </div>
          <div class="be-flex jc-space-between w-100" slot="label">
            <span>{{ $t('withdraw.amount') }}</span>
            <span
              >{{ $t('withdraw.available') }}:
              <span v-if="dataWithdrawPop.available" :class="'amount-' + getUnit"> {{ getAvailable(dataWithdrawPop.available) + ' ' + getUnit }}</span>
            </span>
          </div>
        </el-form-item>
        <div class="be-flex jc-space-between mb-24 tab-amount">
          <div class="text-base cursor amount-item" v-for="tab in tabAmount" :key="tab" :class="tab === tabActive ? 'active' : null" @click="handleSelectTab(tab)">
            <span>{{ tab }}%</span>
          </div>
        </div>
        <el-form-item :label="$t('withdraw.fees')">
          <el-input disabled :placeholder="$t('placeholder.fee')" :value="getTransactionFee(dataWithdrawPop.transactionFee)" />
          <div class="coin" style="font-size: 16px" v-if="dataWithdrawPop.exchangeRateCurrency">
            ~${{ (dataWithdrawPop.exchangeRateCurrency * dataWithdrawPop.transactionFee) | convertAmountDecimal('USD') }}
          </div>
        </el-form-item>
        <!-- <div class="line-border mb-24"></div> -->
        <el-form-item v-if="dataWithdrawPop && dataWithdrawPop.pinEnable == 1" :label="$t('withdraw.pin-code')" class="input-password" prop="pin">
          <el-input
            :placeholder="$t('placeholder.pin-code')"
            :type="showPass == true ? 'text' : 'password'"
            autocomplete="new-password"
            v-model="withdraw.pin"
            maxlength="4"
            @keyup.native="onlyNumberPin($event)"
          />
          <span class="icon-show-password" @click="showPass = !showPass">
            <base-icon :icon="showPass != true ? 'icon-eye' : 'icon-eye-off'" size="22" />
          </span>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="footer">
      <button class="btn-default mr-15 text-regular btn-h40" @click="handleResetForm">
        <p>{{ $t('button.reset') }}</p>
      </button>
      <el-button :loading="isLoading" :class="getDisableSubmit ? 'btn--disabled' : null" class="btn is-none-border cursor btn-h40 btn-default-bg btn-theme" @click="handleSubmit">{{
        $t('button.continue')
      }}</el-button>
    </div>
    <popup-scan-address v-if="isScan" @scan="handleCompleteScanAddress" @close="isScan = false" />
    <popup-verify-pin />
    <popup-verify :type="type2fa" :data="dataWithdraw2" :typeAction="typeAction" :currency="type" @close="handleReloadData" @callApi="callDataWithdraw" />
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import PopupScanAddress from './PopupScanAddress.vue'
  import PopupVerify from '@/components/popup/PopupVerify.vue'
  import PopupVerifyPin from '@/components/popup/PopupPin.vue'
  import { includes, debounce } from 'lodash'
  import { namespace } from 'vuex-class'
  import { IUser } from '@/interface'
  const beBase = namespace('beBase')

  import getRepository from '@/services'
  import WalletRepository from '@/services/repositories/wallet'
  import { SettingRepository } from '@/services/repositories/setting'

  const apiWallet: WalletRepository = getRepository('wallet')
  const bcAuth = namespace('beAuth')
  const api: SettingRepository = getRepository('setting')
  @Component({ components: { PopupScanAddress, PopupVerifyPin, PopupVerify } })
  export default class PopupWithDraw extends Mixins(PopupMixin) {
    @beBase.State('coinMain') coinMain!: string
    @Prop() dataWithdraw!: any
    @Prop({ required: false, type: String, default: '' }) type!: string
    @bcAuth.State('user') user!: IUser
    tabAmount: number[] = [25, 50, 75, 100]
    tabActive: any = null
    isScan = false
    type2fa: any = ''
    withdraw: any = {
      recipientAddress: '',
      amount: '',
      pin: '',
      network: ''
    }
    typeAction = 'WITHDRAW'
    result = ''
    showPass = false
    isLoading = false
    isReadOnly = false
    errorAmount = false
    dataWithdrawPop: any = {}
    dataWithdraw2: any = {}

    listNetwork: Array<Record<string, any>> = []
    transFeeNetwork = ''

    rules: Record<string, any> = {
      recipientAddress: [
        {
          required: true,
          message: this.$t('validate.wallet-address'),
          trigger: 'change'
        }
      ]
    }

    get getDisableSubmit(): boolean {
      console.log('thanh', !this.errorAmount && this.withdraw.recipientAddress && this.withdraw.amount)
      if (this.dataWithdrawPop.pinEnable == 1) {
        return !(!this.errorAmount && this.withdraw.recipientAddress && this.withdraw.amount && this.withdraw.pin)
      } else {
        return !(!this.errorAmount && this.withdraw.recipientAddress && this.withdraw.amount)
      }
    }

    get getTitlePopup(): any {
      switch (this.type) {
        case 'BTC':
          return this.$t('withdraw.bitcoin')
        case 'ETH':
          return this.$t('withdraw.ethereum')
        case 'BNB':
          return this.$t('withdraw.bnb')
        case 'USDC':
          return this.$t('withdraw.usdc')
        case 'USDT':
          return this.$t('withdraw.usdt')
        case 'CLM':
          return this.$t('withdraw.clm')
        case 'BUSD':
          return this.$t('withdraw.busd')
        default:
          return this.$t('withdraw.lynkey')
      }
    }

    get getUnit(): string {
      switch (this.type) {
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
          return this.coinMain
      }
    }
    @Watch('withdraw.amount')
    checkAmount(value: any): void {
      if (value) {
        const amount = value.split(',').join('')
        if (Number(amount) > this.dataWithdrawPop.available) {
          this.errorAmount = true
        } else {
          this.errorAmount = false
        }
      }
    }
    errorPin = false
    // @Watch('withdraw.pin')
    // checkPin(pin: string): void {
    //   if (pin.length == 4) {
    //     this.checkPinCode(pin)
    //   }
    // }
    async checkPinCode(pin: string): Promise<void> {
      const data = {
        pin: this.$options.filters?.encryptPassword(pin)
      }
      await api
        .checkPinCode(data)
        .then(() => {
          this.errorPin = false
        })
        .catch(() => {
          this.errorPin = true
        })
    }
    getTransactionFee(transactionFee: number): void {
      let fee: any = ''
      fee = this.$options.filters?.convertAmountDecimal(transactionFee, this.getUnit) + ' ' + this.getUnit
      return fee
    }
    getAvailable(available: number): number {
      let availableFormat: any = ''
      if (available) {
        availableFormat = this.$options.filters?.convertAmountDecimal(available, this.type)
      }
      return availableFormat
    }
    handleSelectTab(tab: number): void {
      const percent = tab / 100
      if (this.tabActive === tab) {
        this.tabActive = null
        this.withdraw.amount = ''
      } else {
        this.tabActive = tab
        this.withdraw.amount = this.$options.filters?.convertAmountDecimal(this.dataWithdrawPop.available * percent, this.type)
      }
    }

    handleScanAddress(): void {
      this.isScan = true
      this.setOpenPopup({
        popupName: 'popup-scan-address',
        isOpen: true
      })
    }

    handleCompleteScanAddress(result: string): void {
      this.withdraw.recipientAddress = result
      this.isScan = false
    }
    // debounce chan doble click
    debounceFilter = debounce((nameAction: any) => {
      if (nameAction == 'handleSubmit') {
        this.submit()
      }
      if (nameAction == 'handleResetForm') {
        this.handleReset()
      }
    }, 400)
    async handleSubmit(): Promise<void> {
      if ((!this.getDisableSubmit && !this.errorAmount) || (!this.getDisableSubmit && !this.errorAmount && this.dataWithdrawPop.pinEnable === 0)) {
        this.dataWithdraw2 = { ...this.withdraw }
        this.isLoading = true
        this.debounceFilter('handleSubmit')
      }
    }
    handleResetForm(): void {
      this.debounceFilter('handleResetForm')
    }
    async submit(): Promise<void> {
      await this.checkPinCode(this.withdraw.pin)
      if (!this.errorPin) {
        this.dataWithdraw2.amount = parseFloat(this.withdraw.amount.replace(/,/g, ''))
        if (this.withdraw.pin) {
          const pin = this.$options.filters?.encryptPassword(this.withdraw.pin)
          this.dataWithdraw2.pin = pin
        }
        this.dataWithdraw2.transactionFee = this.dataWithdrawPop.transactionFee
        this.dataWithdraw2.originTransactionFee = this.dataWithdrawPop.originTransactionFee
        this.dataWithdraw2.exchangeRateETH = this.dataWithdrawPop.exchangeRateETH
        this.dataWithdraw2.exchangeRateCurrency = this.dataWithdrawPop.exchangeRateCurrency
        this.dataWithdraw2.exchangeRateBNB = this.dataWithdrawPop.exchangeRateBNB

        const params = {
          email: this.$store.state.beAuth.user.email
        }
        api.get2fa(params).then((res: any) => {
          this.type2fa = res
          apiWallet
            .sendCodeWithdraw()
            .then(() => {
              clearInterval(this.callApi)
              this.isLoading = false
              this.setOpenPopup({
                popupName: 'popup-base-verify',
                isOpen: true
              })
            })
            .catch(() => {
              this.isLoading = false
            })
        })
      }
      this.isLoading = false
    }
    handleReloadData(): void {
      this.$emit('reloadData')
      this.setOpenPopup({
        popupName: 'popup-withdraw',
        isOpen: false
      })
    }

    handleReset(): void {
      this.loading = false
      this.withdraw = {
        recipientAddress: '',
        amount: '',
        pin: '',
        network: ''
      }
      this.tabActive = null
      this.errorAmount = false
      if (this.$refs.withdraw) {
        //@ts-ignore
        this.$refs.withdraw.clearValidate()
      }
    }

    async handleClose(): Promise<void> {
      await clearInterval(this.callApi)
    }
    callApi: any = {}
    loading: any = false
    async handleOpen(): Promise<void> {
      this.loading = true
      await this.handleReset()
      await this.handlePushData()
      await this.callDataWithdraw()
    }
    handlePushData(): void {
      if (this.dataWithdraw) {
        this.loading = false
        this.dataWithdrawPop = this.dataWithdraw
        console.log('dataWithdrawPop: ', this.dataWithdrawPop)
      }
    }
    callDataWithdraw(): void {
      this.callApi = setInterval(this.getDataWithdraw, 5000)
    }
    async getDataWithdraw(): Promise<void> {
      await apiWallet.getDataWithdraw(this.type.toLowerCase()).then((res: any) => {
        this.dataWithdrawPop = res
      })
    }
    onlyNumber(event: KeyboardEvent, type: string): void {
      let keyCode = event.keyCode ? event.keyCode : event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        event.preventDefault()
      }
      if (keyCode === 46 && includes(this.withdraw[type], '.')) {
        event.preventDefault()
      }
    }
    numberFormat(event: FocusEvent): void {
      const _event: any = event
      let fnumber = _event.target.value
      if (fnumber.length > 0) {
        fnumber = fnumber.replaceAll(',', '')
        fnumber = this.$options.filters?.numberWithCommas(fnumber)
        this.tabActive = null
        _event.target.value = fnumber
      }
    }
    onlyNumberPin(event: FocusEvent): void {
      const _event: any = event
      let fnumber = _event.target.value
      if (!isNaN(fnumber)) {
        _event.target.value = fnumber
      } else {
        _event.target.value = ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .popup-withdraw {
    .coin {
      position: absolute;
      right: 12px;
      bottom: 2px;
      color: #606266;
    }
    .error {
      position: absolute;
      color: var(--bc-required);
      font-size: 12px;
      margin-top: -10px;
    }
    .error2 {
      position: unset;
      height: 20px;
    }
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
      .amount-LYNK {
        background: var(--bc-menu-active);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
          background: #f3f2f1;
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
    .input-password {
      position: relative;
    }
    .icon-show-password {
      cursor: pointer;
      position: absolute;
      top: 30px;
      right: 14px;
      font-size: 24px;
      .span-icon {
        color: var(--bc-color-grey90);
      }
    }

    ::v-deep .el-form-item {
      label[for='amount'] {
        position: relative;
        &::after {
          content: '*';
          color: #f56c6c;
          left: 51px;
          position: absolute;
        }
      }
    }
    .btn-theme {
      background: var(--bc-tab-active);
    }
  }
</style>
