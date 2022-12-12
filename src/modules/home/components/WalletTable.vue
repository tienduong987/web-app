<template>
  <div class="w-100 bg-white wallet-table">
    <div class="be-flex align-center jc-space-between wallet-table__above">
      <div class="wallet-table__above-tabs be-flex">
        <div class="tab-item cursor" v-for="tab in getTabs" :key="tab.id" :class="tabActive === tab.id ? 'tab-active' : null" @click="handleChangeTab(tab)">
          <span class="text-base">{{ $t(`wallet.` + tab.title) }}</span>
        </div>
      </div>
    </div>
    <div class="wallet-table__below">
      <base-table
        v-if="tabActive !== 2"
        :data="data"
        :table="query"
        :isLoading="isLoading"
        :paginationInfo="getPaginationInfo"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        @rowClick="handleRowClick"
        class="base-table table-wallet"
      >
        <el-table-column label="#" :index="getIndex" type="index" align="center" width="60" />
        <el-table-column :label="$t('wallet.table.transaction')" prop="transactionCode" min-width="200">
          <template slot-scope="scope">
            <div class="be-flex align-center" style="position: relative">
              <span class="d-ib mr-2">{{ scope.row.transactionCode | formatTransactionCode }}</span>
              <span v-if="scope.row.transactionCode" style="position: absolute; left: 220px" class="icon-copy" @click="handleCopyTransaction(scope.row)">
                <base-icon icon="icon-copy" size="24" />
              </span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column width="50" align="center">
          <template>
            <span>
              <base-icon icon="icon-copy" size="24" />
            </span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('wallet.table.date')" prop="transactionDate" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.transactionMillisecond | formatMMDDYY }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('wallet.table.type')" prop="transactionType" :width="widthColType">
          <template slot-scope="scope">
            <span>{{ checkTransactionType(scope.row.transactionType) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('wallet.table.status')" prop="status" :width="widthColStatus">
          <template slot-scope="scope">
            <span :class="checkType(scope.row.status)">{{ checkTransactionStatus(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('wallet.table.amount')" align="right" width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.creditAmount" class="amount-increase">
              <span>+{{ scope.row.creditAmount | convertAmountDecimal(scope.row.creditCurrency) }} {{ scope.row.creditCurrency }}</span>
              <span class="d-block amount-exchange-small">~${{ scope.row.creditAmountToUsd | convertAmountDecimal('USD') }}</span>
            </div>
            <div v-else class="amount-decrease">
              <span>-{{ scope.row.debitAmount | convertAmountDecimal(scope.row.debitCurrency) }} {{ scope.row.debitCurrency }}</span>
              <span class="d-block amount-exchange-small">~${{ scope.row.debitAmountToUsd | convertAmountDecimal('USD') }}</span>
            </div>
          </template>
        </el-table-column>
      </base-table>
      <vesting-list v-else :listRound="listRound" />
    </div>
    <popup-detail-trans :rowCurrent="rowCurrent" />
  </div>
</template>

<script lang="ts">
  import { Component, Mixins, Watch } from 'vue-property-decorator'
  import getRepository from '@/services'
  import WalletRepository from '@/services/repositories/wallet'
  import EventBus from '@/utils/eventBus'
  import PopupMixin from '@/mixins/popup'
  import PopupDetailTrans from '../components/popup/PopupDetailTransaction.vue'
  import VestingList from '../components/VestingList.vue'
  import filter from 'lodash/filter'
  import isEmpty from 'lodash/isEmpty'

  const apiWallet: WalletRepository = getRepository('wallet')

  @Component({ components: { PopupDetailTrans, VestingList } })
  export default class WalletTable extends Mixins(PopupMixin) {
    tabs: Array<Record<string, any>> = [
      {
        id: 0,
        title: 'transactions',
        transactionType: null
      },
      {
        id: 1,
        title: 'withdrawal-request',
        transactionType: 'WITHDRAW'
      },
      {
        id: 2,
        title: 'vesting-detail',
        transactionType: 'WITHDRAW'
      }
    ]
    tabActive = 0
    data: Array<Record<string, any>> = []
    rowCurrent: Record<string, any> = {}
    listRound: Array<Record<string, any>> = []

    isLoading = false
    isConflictClick = false

    currencyObj: Record<string, any> = {
      WalletLyn: 'LYNK',
      WalletClm: 'CLM',
      WalletBtc: 'BTC',
      WalletEth: 'ETH',
      WalletBnb: 'BNB',
      WalletUsdt: 'USDT',
      WalletUsdc: 'USDC',
      WalletBusd: 'BUSD'
    }

    widthColStatus = 120
    widthColType = 150

    query: Record<string, any> = {
      page: 1,
      limit: 20,
      transactionType: null,
      total: 0
    }

    @Watch('$route.name') handleWatchRoute(routeName: string): void {
      this.query.transactionType = null
      this.tabActive = 0
      this.resetQuery()
      this.init()
    }

    get getTabs(): Array<Record<string, any>> {
      const routeName = this.$route.name!
      if (routeName === 'WalletLyn' || routeName === 'WalletClm') {
        return this.tabs
      }
      return [
        {
          id: 0,
          title: 'transactions',
          transactionType: null
        },
        {
          id: 1,
          title: 'withdrawal-request',
          transactionType: 'WITHDRAW'
        }
      ]
    }

    get isShowVesting(): boolean {
      const routeName = this.$route.name!
      if (routeName === 'WalletLyn' || routeName === 'WalletClm') {
        return true
      }
      return false
    }

    get getIndex(): number {
      return this.query.limit * (this.query.page - 1) + 1
    }

    get getPaginationInfo(): any {
      if (this.tabActive === 0) {
        return this.$t('wallet.paginationInfo')
      }
      return this.$t('wallet.paginationInfoRq')
    }

    created(): void {
      this.widthColStatus = window.localStorage.getItem('bc-lang') === 'en' ? 120 : 140
      this.widthColType = window.localStorage.getItem('bc-lang') === 'en' ? 200 : 220

      if (!isEmpty(this.$route.query)) {
        const query = this.$route.query
        apiWallet.getDetailTransaction(query).then(res => {
          this.rowCurrent = res[0]
          this.setOpenPopup({
            popupName: 'popup-detail-trans',
            isOpen: true
          })
        })
      }

      this.init()
      this.getListRound()

      EventBus.$on('changeLang', (lang: string) => {
        this.widthColStatus = lang === 'en' ? 120 : 140
        this.widthColType = lang === 'en' ? 200 : 220
      })
      EventBus.$on('reloadData', () => {
        this.init()
      })
      EventBus.$on('callAcountTransaction', () => {
        this.init()
      })
    }
    destroyed(): void {
      EventBus.$off('changeLang')
      EventBus.$off('reloadData')
      EventBus.$off('callAcountTransaction')
    }

    async init(): Promise<void> {
      try {
        this.isLoading = true
        const currency = this.currencyObj[this.$route.name!]
        const params = {
          ...this.query,
          total: null,
          currency
        }
        if (this.tabActive !== 2) {
          const result = await apiWallet.getListTransaction(params)
          this.data = result.content || []
          this.query.total = result.totalElements || 0
        }
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.isLoading = false
      }
    }

    async getListRound(): Promise<void> {
      try {
        const result = await apiWallet.getListRoundCrowdsale()
        this.listRound = filter(result, round => round.totalVestingMonth)
      } catch (error) {
        console.log(error)
      }
    }

    resetQuery(): void {
      this.query = {
        ...this.query,
        page: 1,
        limit: 20,
        total: 0
      }
    }

    // checkAmount(amount: string): string {
    //   return parseFloat(amount) >= 0 ? 'amount-increase' : 'amount-decrease'
    // }
    checkType(type: string): string {
      return type === 'PENDING'
        ? 'status-pending'
        : type === 'FAILED'
        ? 'status-error'
        : type === 'PROCESSING'
        ? 'status-warning'
        : type === 'REJECTED'
        ? 'status-reject'
        : 'status-success'
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

    checkTransactionType(type: string): any {
      switch (type) {
        case 'DEPOSIT':
          return this.$i18n.t('wallet.table.deposit')
        case 'WITHDRAW':
          return this.$i18n.t('wallet.table.withdraw')
        case 'TRANSFER':
          return this.$i18n.t('wallet.table.transfer')
        case 'CROWDSALE':
          return this.$i18n.t('wallet.table.crowdsale')
        case 'BUY':
          return this.$i18n.t('wallet.table.buy')
        case 'BONUS_SIGN_UP':
          return this.$i18n.t('wallet.table.bonus-sign-up')
        case 'BONUS_CROWDSALE':
          return this.$i18n.t('wallet.table.bonus-crowdsale')
        case 'BONUS_FIRST_TRANS':
          return this.$i18n.t('wallet.table.bonus-first-trans')
        case 'BONUS_AFFILIATE':
          return this.$i18n.t('wallet.table.bonus-affiliate')
        case 'BONUS_BIG_BACKER':
          return this.$i18n.t('wallet.table.bonus-big-backer')
        case 'BONUS_EARLY_BACKER':
          return this.$i18n.t('wallet.table.bonus-early-backer')
        case 'BONUS_SIGN_UP_REFERRAL':
          return this.$i18n.t('wallet.table.bonus-sign-up-referral')

        default:
          return this.$i18n.t('wallet.table.sell')
      }
    }

    handleSizeChange(value: number): void {
      this.query.page = 1
      this.query.limit = value
      this.init()
    }
    handleCurrentChange(value: number): void {
      this.query.page = value
      this.init()
    }

    handleRowClick(row: Record<string, any>): void {
      if (this.isConflictClick) {
        this.isConflictClick = false
        return
      }
      this.rowCurrent = row.row
      this.setOpenPopup({
        popupName: 'popup-detail-trans',
        isOpen: true
      })
    }

    handleChangeTab(tab: Record<string, any>): void {
      this.tabActive = tab.id
      this.query.transactionType = tab.transactionType
      this.resetQuery()
      this.init()
    }

    handleCopyTransaction(row: Record<string, any>): void {
      this.isConflictClick = true
      let message: any = ''
      const el = document.createElement('input')
      el.value = row.transactionCode
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
  .wallet-table {
    &__above {
      border-bottom: 1px solid var(--bc-border-primary);
      &-tabs {
        .tab-item {
          padding: 16px 12px;
          position: relative;
          color: var(-bc-text-color-tab-item) !important;
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
      padding: 0 24px;
      .table-wallet {
        .amount-decrease {
          color: var(--bc-status-error);
        }
        .amount-increase {
          color: var(--bc-status-success);
        }
      }
    }
  }
</style>
