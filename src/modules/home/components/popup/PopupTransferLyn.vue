<template>
  <base-popup :open="handleOpen" :close="handleClose" name="popup-transfer-lyn" class="popup-transfer-lyn" width="600px">
    <div slot="title">
      <span>{{ $t('wallet.popup.transfer') }} {{ getUnit }}</span>
    </div>
    <div class="content" v-loading="loading">
      <el-form ref="withdraw" :model="withdraw" :rules="rules" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false">
        <el-form-item :label="$t('withdraw.address')" prop="recipientAddress">
          <el-input :placeholder="$t('placeholder.address')" v-model="withdraw.recipientAddress" />
          <div v-if="errorAddress" class="error">{{ $t('wallet.popup.errorMess') }}</div>
          <div class="prefix prefix--camera cursor" @click="handleScanAddress">
            <base-icon icon="icon-scan" size="24" />
          </div>
        </el-form-item>
        <el-form-item class="mb-1" prop="amount">
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
              <span v-if="dataTransferProp.available" class="amount-unit" :class="'amount-' + getUnit">{{ getAvailable(dataTransferProp.available) }} {{ getUnit }}</span></span
            >
          </div>
        </el-form-item>
        <div class="be-flex jc-space-between mb-24 tab-amount">
          <div class="text-base cursor amount-item" v-for="tab in tabAmount" :key="tab" :class="tab === tabActive ? 'active' : null" @click="handleSelectTab(tab)">
            <span>{{ tab }}%</span>
          </div>
        </div>
        <el-form-item :label="$t('withdraw.fees')">
          <el-input disabled :placeholder="$t('placeholder.fee')" :value="getTransactionFee(dataTransferProp.transactionFee)" />
          <div class="coin" v-if="dataTransferProp.exchangeRateCurrency">
            ~${{ (dataTransferProp.exchangeRateCurrency * dataTransferProp.transactionFee) | convertAmountDecimal(getUnit) }}
          </div>
        </el-form-item>
        <!-- <div class="line-border mb-24"></div> -->
        <el-form-item v-if="dataTransferProp && dataTransferProp.pinEnable == 1" :label="$t('withdraw.pin-code')" class="input-password" prop="pin">
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
      <el-button
        class="btn is-none-border cursor btn-h40 btn-default-bg"
        :loading="isLoading"
        :class="disableBtn ? 'btn--disabled' : 'btn-theme'"
        @click="handleSubmit"
        :disabled="disableBtn"
      >
        {{ $t('button.continue') }}
      </el-button>
    </div>
    <popup-scan-address v-if="isScan" @scan="handleCompleteScanAddress" @close="isScan = false" />
    <popup-verify-transfer :type="type2fa" :data="dataWithdraw" @close="handleReloadData" @callApi="handleCallApi" :typeAction="typeAction" :typeActive="typeActive" />
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import PopupScanAddress from './PopupScanAddress.vue'
  import PopupVerifyTransfer from '@/components/popup/PopupVerifyTransfer.vue'
  import { includes } from 'lodash'
  import { namespace } from 'vuex-class'
  import { debounce } from 'lodash'
  const beBase = namespace('beBase')

  import getRepository from '@/services'
  import WalletRepository from '@/services/repositories/wallet'
  import { SettingRepository } from '@/services/repositories/setting'

  const apiLyn: WalletRepository = getRepository('wallet')
  const api: SettingRepository = getRepository('setting')
  @Component({ components: { PopupScanAddress, PopupVerifyTransfer } })
  export default class PopupTransferLyn extends Mixins(PopupMixin) {
    @beBase.State('coinMain') coinMain!: string
    @Prop({ required: false, type: String, default: '' }) type!: string
    @Prop() dataTransfer!: any
    @Prop() typeActive!: any
    tabAmount: number[] = [25, 50, 75, 100]
    tabActive: any = null
    isScan = false
    type2fa: any = ''
    withdraw = {
      recipientAddress: '',
      amount: '',
      pin: '',
      transactionFee: '',
      exchangeRateETH: '',
      exchangeRateBNB: '',
      exchangeRateCurrency: ''
    }
    loading = false
    isLoading = false
    result = ''
    typeAction = 'TRANSFER'
    showPass = false
    isReadOnly = false
    errorAddress = false
    errorAmount = false
    disableBtn = true
    dataWithdraw: any = {}
    rules: any = {
      recipientAddress: [
        {
          required: true,
          message: this.$t('wallet.popup.wrong-address'),
          trigger: 'change'
        }
      ]
    }
    dataTransferProp: any = {}
    getTransactionFee(transactionFee: number): void {
      let fee: any = ''
      fee = this.$options.filters?.convertAmountDecimal(transactionFee, this.getUnit) + ' ' + this.getUnit
      return fee
    }
    get getUnit(): string {
      return this.typeActive
    }
    getAvailable(available: number): number {
      let availableFormat: any = ''
      if (available) {
        availableFormat = this.$options.filters?.convertAmountDecimal(available, this.typeActive)
      }
      return availableFormat
    }
    @Watch('withdraw.amount')
    checkAmount(value: any): void {
      if (value) {
        const amount = value.split(',').join('')
        if (Number(amount) > this.dataTransfer.available) {
          this.errorAmount = true
        } else {
          this.errorAmount = false
        }
      } else {
        this.tabActive = null
      }
      this.checkDisableBtn()
    }
    errorPin = true
    @Watch('withdraw.pin')
    checkPin(pin: any): void {
      // if (pin.length == 4) {
      //   this.checkPinCode(pin)
      // }
      this.checkDisableBtn()
    }
    async checkPinCode(pin: any): Promise<void> {
      const data = {
        pin: this.$options.filters?.encryptPassword(pin)
      }
      await api
        .checkPinCode(data)
        .then(() => {
          this.errorPin = false
        })
        .catch(error => {
          this.errorPin = true
        })
    }
    handleSelectTab(tab: number): void {
      const percent = tab / 100
      if (this.tabActive === tab) {
        this.tabActive = null
        this.withdraw.amount = ''
      } else {
        this.tabActive = tab
        this.withdraw.amount = this.$options.filters?.convertAmountDecimal(this.dataTransfer.available * percent, this.typeActive)
      }
    }
    validateForm(): boolean {
      let withdraw: any = this.$refs.withdraw
      let valid = false
      withdraw.validate((_valid: boolean) => {
        valid = _valid
      })
      return valid
    }
    handleResetForm(): void {
      this.debounceFilter('handleResetForm')
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
    handleSubmit(): void {
      this.dataWithdraw = { ...this.withdraw }
      const valid = this.validateForm()
      if ((valid && !this.errorAmount) || (valid && !this.errorAmount && this.dataTransfer.pinEnable === 0)) {
        this.debounceFilter('handleSubmit')
      }
    }
    async submit(): Promise<void> {
      this.isLoading = true
      await this.checkPinCode(this.withdraw.pin)
      if (!this.errorPin) {
        this.dataWithdraw.amount = parseFloat(this.withdraw.amount.replace(/,/g, ''))
        if (this.withdraw.pin) {
          const pin = this.$options.filters?.encryptPassword(this.withdraw.pin)
          this.dataWithdraw.pin = pin
        }
        this.dataWithdraw.transactionFee = this.dataTransferProp.transactionFee
        this.dataWithdraw.originTransactionFee = this.dataTransferProp.originTransactionFee
        this.dataWithdraw.exchangeRateETH = this.dataTransferProp.exchangeRateETH
        this.dataWithdraw.exchangeRateCurrency = this.dataTransferProp.exchangeRateCurrency
        this.dataWithdraw.exchangeRateBNB = this.dataTransferProp.exchangeRateBNB
        const params = {
          email: this.$store.state.beAuth.user.email
        }
        api.get2fa(params).then((res: any) => {
          this.type2fa = res
          apiLyn
            .verificatySendcode()
            .then(() => {
              this.isLoading = false
              clearInterval(this.callApi)
              this.setOpenPopup({
                popupName: 'popup-base-verify-transfer',
                isOpen: true
              })
            })
            .catch(error => {
              this.isLoading = false
              console.log(error)
            })
        })
      }
      this.isLoading = false
    }
    handleScanAddress(): void {
      this.isScan = true
      this.setOpenPopup({
        popupName: 'popup-scan-address',
        isOpen: true
      })
    }
    stringScan = ''
    handleCompleteScanAddress(result: string): void {
      this.withdraw.recipientAddress = result
      this.isScan = false
    }

    handleReset(): void {
      this.withdraw = {
        recipientAddress: '',
        amount: '',
        pin: '',
        transactionFee: '',
        exchangeRateETH: '',
        exchangeRateBNB: '',
        exchangeRateCurrency: ''
      }
      this.tabActive = null
      this.errorAddress = false
      this.errorAmount = false
      this.disableBtn = true
      this.type2fa = ''
      this.loading = false
      if (this.$refs.withdraw) {
        //@ts-ignore
        this.$refs.withdraw.clearValidate()
      }
    }

    async handleClose(): Promise<void> {
      await clearInterval(this.callApi)
    }
    handleReloadData(): void {
      this.$emit('reloadData')
      this.setOpenPopup({
        popupName: 'popup-transfer-lyn',
        isOpen: false
      })
    }
    callApi: any = {}
    async handleOpen(): Promise<void> {
      this.loading = true
      await this.handleReset()
      await this.handlePushData()
      await this.handleCallApi()
    }
    handlePushData(): void {
      if (this.dataTransfer) {
        this.loading = false
        this.dataTransferProp = this.dataTransfer
      }
    }
    handleCallApi(): void {
      this.callApi = setInterval(this.getExchangeRate, 5000)
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
    @Watch('withdraw.recipientAddress')
    async handleChangeAddress(value: any): Promise<void> {
      if (value) {
        const data = {
          recipientAddress: value
        }
        await apiLyn
          .validateLyn(this.typeActive.toLowerCase(), data)
          .then(() => {
            this.errorAddress = false
            this.checkDisableBtn()
          })
          .catch(() => {
            this.errorAddress = true
          })
      } else {
        this.errorAddress = false
      }
    }
    checkDisableBtn(): void {
      if (this.dataTransferProp.pinEnable == 1) {
        if (this.withdraw.recipientAddress && this.withdraw.amount && this.withdraw.pin && !this.errorAddress) {
          this.disableBtn = false
        } else {
          this.disableBtn = true
        }
      } else if (this.dataTransferProp.pinEnable == 0) {
        if (this.withdraw.recipientAddress && this.withdraw.amount && !this.errorAddress) {
          this.disableBtn = false
        } else {
          this.disableBtn = true
        }
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
    async getExchangeRate(): Promise<void> {
      const result = await apiLyn.getLynInfo(this.typeActive.toLowerCase())
      this.dataTransferProp = result
    }
  }
</script>

<style scoped lang="scss">
  .popup-transfer-lyn {
    .coin {
      position: absolute;
      right: 12px;
      bottom: 2px;
      color: #606266;
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
      .amount-unit {
        background: var(--bc-menu-active);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
      .amount-BNB {
        color: var(--bc-amount-bnb);
      }
      .amount-USDT {
        color: var(--bc-amount-usdt);
      }
      .amount-USDC {
        color: var(--bc-amount-usdc);
      }
      .amount-CLM {
        color: var(--bc-amount-clm);
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
      .btn-action {
        width: 120px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
        border-radius: 6px;
        &:hover {
          color: var(--bc-btn-bg-default);
          border: 1px solid var(--bc-btn-bg-default);
        }
      }
      .btn-submit {
        display: inline-block;
        border: none;
        color: var(--bc-color-white);
        background: var(--bc-btn-bg-default);
        &:hover {
          border: none;
          color: var(--bc-color-white);
          background: var(--bc-btn-bg-default-hover);
        }
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
    .btn-theme {
      background: var(--bc-tab-active);
    }
  }
</style>
