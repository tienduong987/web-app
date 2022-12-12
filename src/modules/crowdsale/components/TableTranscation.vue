<template>
  <div class="w-100 table-transaction">
    <h3 class="mb-24 text-2xl text-bold">{{ $t('crowd-sale.trasnsaction') }}</h3>
    <base-table
      :data="data"
      :isLoading="isLoading"
      :showPagination="false"
      :paginationInfo="getPaginationInfo"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      class="base-table table-transaction-custom"
    >
      <el-table-column label="#" type="index" align="center" width="40" />
      <el-table-column :label="$t('crowd-sale.table.date')" prop="transactionDate" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.transactionDate.time | formatMMDDYY }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('crowd-sale.table.email')" prop="userEmail"> </el-table-column>
      <el-table-column :label="$t('crowd-sale.table.price')" align="right" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.roundName }} - ${{ scope.row.tokenUsdExchangeRate | convertAmountDecimal('USD') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('crowd-sale.table.paid')" prop="paid" align="right" width="220">
        <template slot-scope="scope">
          <span class="amount-decrease">-{{ scope.row.paidAmount | convertAmountDecimal(scope.row.paidCurrency) }} {{ scope.row.paidCurrency }}</span>
          <span class="d-block amount-exchange-small">~${{ (scope.row.paidAmount * scope.row.paidUsdExchangeRate) | convertAmountDecimal('USD') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('crowd-sale.table.amount')" prop="amount" align="right" width="200">
        <template slot-scope="scope">
          <span class="amount-increase">+{{ scope.row.tokenAmount | convertAmountDecimal(scope.row.tokenCurrency) }} {{ scope.row.tokenCurrency }}</span>
          <span class="d-block amount-exchange-small">~${{ (scope.row.tokenAmount * scope.row.tokenUsdExchangeRate) | convertAmountDecimal('USD') }}</span>
        </template>
      </el-table-column>
    </base-table>
  </div>
</template>

<script lang="ts">
  import EventBus from '@/utils/eventBus'
  import { Component, Vue } from 'vue-property-decorator'
  // import getRepository from '@/services'
  // import CrowdSaleRepository from '@/services/repositories/crowd-sale'
  import { IQuery } from '@/interface'
  import firebase from '@/utils/firebase'

  // const apiCrowdSale: CrowdSaleRepository = getRepository('crowd-sale')

  @Component
  export default class TableTransaction extends Vue {
    data: Array<Record<string, any>> = []
    query: IQuery = {
      page: 1,
      limit: 10,
      total: 0
    }
    isLoading = false

    listener: any = null

    get getPaginationInfo(): any {
      return this.$t('crowd-sale.table.paginationInfo')
    }
    created(): void {
      this.init()
      EventBus.$on('reloadTable', payLoad => {
        this.init()
      })
    }

    destroyed(): void {
      const leadsRef = firebase.database().ref('crowdsale_transactions')
      leadsRef.off('value', this.listener)
    }

    async init(): Promise<void> {
      try {
        const leadsRef = firebase.database().ref('crowdsale_transactions')
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let _this = this
        this.listener = leadsRef.on('value', function (snapshot) {
          _this.data = snapshot.val()
        })
      } catch (error) {
        this.isLoading = false
        console.log(error)
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
  }
</script>

<style scoped lang="scss">
  .table-transaction {
    padding: 24px;
    background: #fff;
    box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
    border-radius: 4px;
  }
</style>
