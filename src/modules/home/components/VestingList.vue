<template>
  <div class="vesting-list">
    <div class="be-flex round-tab">
      <div
        v-for="(round, index) in listRound"
        :key="round.id"
        :class="index === tabActive ? 'round-active text-bold' : null"
        class="text-base cursor round-item"
        @click="handleChangeTab(index)"
      >
        <span>{{ round.name }}</span>
      </div>
    </div>
    <div class="wrap-progress" v-if="vestingList.length">
      <div class="be-flex jc-space-between above">
        <span class="text-desc">{{ round.totalReleasedAmount | formatNumber }} ({{ (round.totalPercentageReleasedAmount * 1000) / 10 }}%) {{ $t('wallet.released') }}</span>
        <span class="text-desc">{{ round.totalRemainLockedAmount | formatNumber }} {{ $t('wallet.left') }}</span>
      </div>
      <div class="be-flex progress-bar">
        <div
          v-for="item in vestingList"
          :key="item.id"
          :style="{ width: `calc(100%/${vestingList.length})` }"
          :class="item.status === 'RELEASED' ? 'round-release' : 'round-lock'"
          class="progress-item"
        >
          <el-tooltip class="item" effect="dark" :content="item.transactionDate | formatMMDDYYWithoutHours" placement="top">
            <span> {{ (item.vestingPercentage * 1000) / 10 }}%</span>
          </el-tooltip>
        </div>
      </div>
      <div class="be-flex jc-space-between below">
        <div class="be-flex align-center text-desc">
          <base-icon icon="icon-mark" size="20" />
          <span>{{ getFromDate.transactionDate | formatMMDDYYWithoutHours }}</span>
        </div>
        <div class="be-flex align-center text-desc">
          <base-icon icon="icon-flag" size="20" />
          <span>{{ getToDate.transactionDate | formatMMDDYYWithoutHours }}</span>
        </div>
      </div>
    </div>

    <div class="vesting-table" v-loading="isLoading">
      <span class="d-block text-desc text-bold mb-24 title-table">VESTING PLAN</span>
      <div class="table-vesting-plan">
        <base-table :data="getListVestingPlan" :showSummary="true" :summaryMethod="summaryMethod" :showPagination="false">
          <el-table-column :label="$t('wallet.vesting.period')">
            <template slot-scope="scope">
              <span>Period {{ scope.row.numOfMonth }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wallet.vesting.date')" width="260">
            <template slot-scope="scope">
              <span> {{ scope.row.transactionDate | formatMMDDYY }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wallet.vesting.percentage')" prop="totalPercentageRemainLockedAmount" align="right" width="140">
            <template slot-scope="scope">
              <span> {{ (scope.row.vestingPercentage * 1000) / 10 }}%</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wallet.vesting.release-amount')" prop="totalRemainLockedAmount" align="right" width="240">
            <template slot-scope="scope">
              <div class="amount-increase">
                <span>+{{ scope.row.releaseAmount | convertAmountDecimal(coinMain) }} {{ coinMain }}</span>
                <span class="d-block amount-exchange-small">~ ${{ scope.row.releaseAmountInUsd | convertAmountDecimal('USD') }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wallet.vesting.status')" align="center" width="140">
            <template slot-scope="scope">
              <span class="text-xs status" :class="checkStatusClass(scope.row.status)"> {{ checkShowStaus(scope.row.status) }}</span>
            </template>
          </el-table-column>
        </base-table>
      </div>

      <span class="d-block text-desc text-bold mb-24 title-table" style="margin-top: 40px">VESTING HISTORY</span>
      <div class="table-vesting-plan">
        <base-table :data="getListVestingHistory" :showSummary="true" :summaryMethod="summaryMethod" :showPagination="false">
          <el-table-column :label="$t('wallet.vesting.period')">
            <template slot-scope="scope">
              <span>Period {{ scope.row.numOfMonth }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wallet.vesting.date')" width="260">
            <template slot-scope="scope">
              <span> {{ scope.row.transactionDate | formatMMDDYY }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wallet.vesting.percentage')" prop="totalPercentageReleasedAmount" align="right" width="140">
            <template slot-scope="scope">
              <span> {{ (scope.row.vestingPercentage * 1000) / 10 }}%</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wallet.vesting.release-amount')" prop="totalReleasedAmount" align="right" width="240">
            <template slot-scope="scope">
              <div class="amount-increase">
                <span>+{{ scope.row.releaseAmount | convertAmountDecimal(coinMain) }} {{ coinMain }}</span>
                <span class="d-block amount-exchange-small">~ ${{ scope.row.releaseAmountInUsd | convertAmountDecimal('USD') }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('wallet.vesting.status')" align="center" width="140">
            <template slot-scope="scope">
              <span class="text-xs status" :class="checkStatusClass(scope.row.status)"> {{ checkShowStaus(scope.row.status) }}</span>
            </template>
          </el-table-column>
        </base-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import getRepository from '@/services'
  import WalletRepository from '@/services/repositories/wallet'
  import { namespace } from 'vuex-class'
  import { filter, forEach, includes } from 'lodash'

  const apiWallet: WalletRepository = getRepository('wallet')

  const beAuth = namespace('beAuth')
  const beBase = namespace('beBase')

  @Component
  export default class VestingList extends Vue {
    @Prop({ required: true, type: Array, default: [] }) listRound!: Array<Record<string, any>>
    @beAuth.State('user') user!: Record<string, any>
    @beBase.State('coinMain') coinMain!: string

    tabActive = 0
    isLoading = false

    vestingList: Array<Record<string, any>> = []
    round: Record<string, any> = {}

    get getFromDate(): Record<string, any> {
      if (this.vestingList.length) {
        const _arr = [...this.vestingList]
        const arr = _arr.sort((a, b) => {
          return a.id - b.id
        })
        return arr[0]
      }
      return {}
    }

    get getToDate(): Record<string, any> {
      if (this.vestingList.length) {
        const _arr = [...this.vestingList]
        const arr = _arr.sort((a, b) => {
          return b.id - a.id
        })
        return arr[0]
      }
      return {}
    }

    get getListVestingPlan(): Array<Record<string, any>> {
      if (this.vestingList.length) {
        return filter(this.vestingList, elm => elm.status === 'LOCKED')
      }
      return []
    }

    get getListVestingHistory(): Array<Record<string, any>> {
      if (this.vestingList.length) {
        return filter(this.vestingList, elm => elm.status === 'RELEASED')
      }
      return []
    }

    created(): void {
      this.handleGetVestingOfRound()
    }

    async handleGetVestingOfRound(): Promise<void> {
      try {
        this.isLoading = true
        const result = await apiWallet.getInfoVesting({ userId: this.user.userId, roundId: this.listRound[this.tabActive].id })
        if (result) {
          this.round = result.round
          this.vestingList = result.vestingList
        }
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }

    handleChangeTab(index: number): void {
      this.tabActive = index
      this.vestingList = []
      this.round = {}
      this.handleGetVestingOfRound()
    }

    checkStatusClass(status: string): string {
      if (status === 'LOCKED') {
        return 'status-locked-bg status-locked'
      }
      return 'status-success-bg status-success'
    }

    checkShowStaus(status: string): string {
      if (status === 'LOCKED') {
        return 'Locked'
      }
      return 'Released'
    }

    summaryMethod(params: { columns: any; data: Record<string, any>[] }): any[] {
      const { columns } = params

      const sums: any[] = []
      forEach(columns, (column, index: number) => {
        if (index < 1) {
          sums[index] = ''
          return
        }
        if (index === 1) {
          sums[index] = 'TOTAL'
          return
        }
        if (index === 4) {
          sums[index] = ''
          return
        }
        const a = this.round[column.property] || 0

        //@ts-ignore
        sums[index] = `${includes(column.property, 'Percent') ? (a * 1000) / 10 + '%' : this.$options.filters.convertAmountDecimal(a, this.coinMain) + ' ' + this.coinMain}`
      })
      return sums
    }
  }
</script>

<style scoped lang="scss">
  .vesting-list {
    padding: 24px;
    .round-tab {
      width: fit-content;
      margin: 0 auto;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--bc-theme-primary);
      .round-item {
        padding: 8px 24px;
        // color: var(--bc-theme-primary);
      }
      .round-item:not(:last-child) {
        border-right: 1px solid #dbdbdb;
      }
      .round-active {
        color: #fff;
        background: var(--bc-tab-active);
      }
    }
    .wrap-progress {
      margin-top: 52px;
      .above {
        margin-bottom: 8px;
        padding: 0 16px;
      }
      .progress-bar {
        border-radius: 40px;
        overflow: hidden;
        .progress-item {
          padding: 8px 20px;
          text-align: center;
          position: relative;
          font-size: 12px;
          color: #5b616e;
        }
        .round-release {
          background-color: #129961;
          color: #fff;
          &:not(:last-child)::after {
            content: '';
            position: absolute;
            right: 0;
            width: 1px;
            height: 60%;
            background: #e4f9e2;
            top: 50%;
            transform: translateY(-50%);
          }
          &:last-child::after {
            background: transparent;
          }
        }

        .round-lock {
          background-color: #f3f2f1;
          &:not(:last-child)::after {
            content: '';
            position: absolute;
            right: 0;
            width: 1px;
            height: 60%;
            background: #dbdbdb;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      .below {
        margin-top: 3px;
      }
    }

    .vesting-table {
      margin-top: 36px;
      .title-table {
        padding: 4px 24px;
        background-color: #f3f2f1;
        width: fit-content;
        border-radius: 4px;
        margin: 0 auto;
      }
      .table-vesting-plan {
        padding: 0px 36px;
      }

      .status {
        display: inline-block;
        width: 80px;
        padding: 4px 0;
        text-align: center;
        border-radius: 4px;
      }
    }
  }
</style>
