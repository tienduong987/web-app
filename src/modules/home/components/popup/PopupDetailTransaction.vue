<template>
  <base-popup name="popup-detail-trans" class="popup-detail-trans" width="480px" :isShowFooter="false">
    <div slot="title">
      <span>{{ getTitlePopup }}</span>
    </div>
    <div class="content">
      <div class="content__header be-flex be-flex-column">
        <base-icon :icon="getIconStatus" size="64" style="display: inline-flex; margin-bottom: 12px" />

        <span v-if="isCreditAmount" class="amount-increase text-xl text-bold" style="margin-bottom: 4px"
          >+{{ rowCurrent.creditAmount | convertAmountDecimal(rowCurrent.creditCurrency) }} {{ rowCurrent.creditCurrency }}</span
        >
        <span v-else class="amount-decrease text-xl text-bold" style="margin-bottom: 4px"
          >- {{ rowCurrent.debitAmount | convertAmountDecimal(rowCurrent.debitCurrency) }} {{ rowCurrent.debitCurrency }}</span
        >

        <span v-if="isCreditAmount" class="amount-exchange-small">~${{ (rowCurrent.creditAmount * rowCurrent.creditUsdExchangeRate) | convertAmountDecimal('USD') }}</span>
        <span v-else class="amount-exchange-small">~${{ (rowCurrent.debitAmount * rowCurrent.debitUsdExchangeRate) | convertAmountDecimal('USD') }}</span>
      </div>

      <div class="content__main">
        <div class="be-flex jc-space-between align-center row-item">
          <span class="title">{{ $t('wallet.popup.trans-id') }}</span>
          <span class="be-flex align-center">
            <span class="text-base color-primary"> {{ rowCurrent.transactionCode | formatTransactionCode(6) }}</span>
            <span class="icon-copy cursor" style="margin-left: 10px" @click="handleCopyTransaction(rowCurrent.transactionCode)">
              <base-icon icon="icon-copy" size="24" />
            </span>
          </span>
        </div>
        <div class="be-flex jc-space-between align-center row-item">
          <span class="title">{{ $t('wallet.popup.date') }}</span>
          <span class="text-base color-primary">
            {{ rowCurrent.transactionMillisecond | formatMMDDYY }}
          </span>
        </div>
        <div
          v-if="
            (rowCurrent.transactionType !== 'DEPOSIT' && rowCurrent.transactionType !== 'CROWDSALE' && rowCurrent.transactionType !== 'TRANSFER' && !isIncludeTypeBounus) ||
            (rowCurrent.transactionType === 'TRANSFER' && rowCurrent.debitAmount)
          "
          class="be-flex jc-space-between align-center row-item"
        >
          <span class="title">{{ $t('wallet.popup.to') }}</span>
          <div class="be-flex align-center">
            <base-icon :icon="getIcon" size="20" style="margin-right: 8px" />
            <div>
              <span class="text-base color-primary">{{ rowCurrent.creditAddress | formatTransactionCode(6) }}</span>
              <span class="icon-copy cursor" style="margin-left: 10px" @click="handleCopyTransaction(rowCurrent.creditAddress)">
                <base-icon icon="icon-copy" size="24" />
              </span>
            </div>
          </div>
        </div>
        <div
          v-if="
            (rowCurrent.transactionType !== 'DEPOSIT' && rowCurrent.transactionType !== 'CROWDSALE' && rowCurrent.transactionType !== 'TRANSFER' && !isIncludeTypeBounus) ||
            (rowCurrent.transactionType === 'TRANSFER' && !rowCurrent.creditAmount)
          "
          class="be-flex jc-space-between align-center row-item"
        >
          <span class="title">{{ $t('wallet.popup.fees') }}</span>
          <span>
            <span class="amount-decrease">-{{ rowCurrent.debitFee | convertAmountDecimal(rowCurrent.debitCurrency) }} {{ rowCurrent.debitCurrency }}</span>
            <span class="amount-exchange-small"> (~${{ (rowCurrent.debitFee * rowCurrent.debitUsdExchangeRate) | convertAmountDecimal('USD') }})</span>
          </span>
        </div>
        <div
          v-if="
            (rowCurrent.transactionType !== 'CROWDSALE' &&
              rowCurrent.transactionType !== 'DEPOSIT' &&
              rowCurrent.transactionType !== 'WITHDRAW' &&
              rowCurrent.transactionType !== 'TRANSFER' &&
              !isIncludeTypeBounus) ||
            (rowCurrent.transactionType === 'TRANSFER' && rowCurrent.creditAmount)
          "
          class="be-flex jc-space-between align-center row-item"
        >
          <span class="title">{{ $t('wallet.popup.from') }}</span>
          <div class="be-flex align-center">
            <base-icon :icon="getIcon" size="20" style="margin-right: 8px" />
            <div v-if="rowCurrent.transactionType !== 'TRANSFER'">
              <span class="text-base color-primary"> {{ rowCurrent.creditAddress | formatTransactionCode(6) }}</span>
              <span class="icon-copy cursor" style="margin-left: 10px" @click="handleCopyTransaction(rowCurrent.creditAddress)">
                <base-icon icon="icon-copy" size="24" />
              </span>
            </div>
            <div v-else>
              <span class="text-base color-primary"> {{ rowCurrent.debitAddress | formatTransactionCode(6) }}</span>
              <span class="icon-copy cursor" style="margin-left: 10px" @click="handleCopyTransaction(rowCurrent.debitAddress)">
                <base-icon icon="icon-copy" size="24" />
              </span>
            </div>
          </div>
        </div>
        <div class="be-flex jc-space-between align-center row-item">
          <span class="title">{{ $t('wallet.popup.status') }}</span>
          <span class="status text-xs" :class="checkType(rowCurrent.status)">{{ checkTransactionStatus(rowCurrent.status) }}</span>
        </div>
        <div v-if="rowCurrent.transactionType === 'WITHDRAW' && rowCurrent.status === 'REJECTED'" class="be-flex jc-space-between align-center row-item">
          <span class="title">{{ $t('wallet.popup.reason') }}</span>
          <span>{{ rowCurrent.rejectedReason }}</span>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import PopupMixin from '@/mixins/popup'
  import { includes } from 'lodash'
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const beBase = namespace('beBase')

  @Component({ components: {} })
  export default class PopupDetailTrans extends Mixins(PopupMixin) {
    @Prop({ required: true, type: Object, default: {} }) rowCurrent!: Record<string, any>
    @beBase.State('coinMain') coinMain!: string

    get getTitlePopup(): any {
      const otherType: string[] = [
        'CROWDSALE',
        'BONUS_SIGN_UP',
        'BONUS_CROWDSALE',
        'BONUS_FIRST_TRANS',
        'BONUS_AFFILIATE',
        'BONUS_BIG_BACKER',
        'BONUS_EARLY_BACKER',
        'BONUS_SIGN_UP_REFERRAL'
      ]
      if (includes(otherType, this.rowCurrent.transactionType)) {
        return this.$t(`wallet.popup.${this.rowCurrent.transactionType}`)
      }
      return this.$t(`wallet.popup.${this.rowCurrent.transactionType}`) + ' ' + (this.rowCurrent.debitCurrency || this.rowCurrent.creditCurrency)
    }

    get isCreditAmount(): boolean {
      return this.rowCurrent.creditAmount > this.rowCurrent.debitAmount
    }

    get isIncludeTypeBounus(): boolean {
      const otherType: string[] = ['BONUS_SIGN_UP', 'BONUS_CROWDSALE', 'BONUS_FIRST_TRANS', 'BONUS_AFFILIATE', 'BONUS_BIG_BACKER', 'BONUS_EARLY_BACKER', 'BONUS_SIGN_UP_REFERRAL']
      return includes(otherType, this.rowCurrent.transactionType)
    }

    get getIcon(): string {
      if (this.rowCurrent.creditAmount) {
        switch (this.rowCurrent.creditCurrency) {
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
      } else {
        switch (this.rowCurrent.debitCurrency) {
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
    }

    get getIconStatus(): string {
      switch (this.rowCurrent.transactionType) {
        case 'DEPOSIT':
          return this.rowCurrent.status === 'SUCCESS' ? 'icon-deposit-success' : 'icon-deposit'
        case 'CROWDSALE':
          return this.rowCurrent.status === 'SUCCESS' ? 'icon-deposit-success' : 'icon-deposit'
        case 'WITHDRAW':
          return this.rowCurrent.status === 'SUCCESS' ? 'icon-withdraw-success' : this.rowCurrent.status === 'FAILED' ? 'icon-withdraw-failed' : 'icon-withdraw'
        case 'TRANSFER':
          return this.rowCurrent.status === 'SUCCESS' ? 'icon-transfer-success' : 'icon-transfer'

        default:
          return this.rowCurrent.status === 'SUCCESS' ? 'icon-bonus-success' : 'icon-bonus'
      }
    }

    checkType(type: string): string {
      return type === 'PENDING'
        ? 'status-pending status-pending-bg'
        : type === 'FAILED'
        ? 'status-error status-error-bg'
        : type === 'PROCESSING'
        ? 'status-warning status-warning-bg'
        : type === 'REJECTED'
        ? 'status-reject status-reject-bg'
        : 'status-success status-success-bg'
    }

    checkTransactionStatus(status: string): any {
      switch (status) {
        case 'SUCCESS':
          return this.$i18n.t('wallet.table.succsess')
        case 'PENDING':
          return this.$i18n.t('wallet.table.pending')
        case 'PROCESSING':
          return this.$i18n.t('wallet.table.processing')
        case 'REJECTED':
          return this.$i18n.t('wallet.table.rejected')

        default:
          return this.$i18n.t('wallet.table.failed')
      }
    }

    handleCopyTransaction(value: string): void {
      let message: any = ''
      const el = document.createElement('input')
      el.value = value
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      message = this.$t('notify.copy')
      this.$message.success(message)
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .popup-content {
    background: #f6f8fc;
    padding: 0;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    .content {
      &__header {
        padding-top: 24px;
        background-color: #fff;
        padding-bottom: 16px;
        align-items: center;
      }
      &__main {
        margin-top: 8px;
        background-color: #fff;
        padding: 16px 24px 16px 24px;
        .row-item {
          height: 48px;
          // padding: 12px 0;
          border-bottom: 1px solid #d2d0ce;

          .title {
            color: #5b616e;
          }
          .status {
            padding: 4px 7px;
            border-radius: 4px;
          }
        }
        .row-item:last-child {
          border-bottom: none;
        }
      }
    }
  }
</style>
