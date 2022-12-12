<template>
  <div class="table-round">
    <h3 class="mb-24 text-2xl text-bold">{{ $t('crowd-sale.round') }}</h3>
    <base-table :data="listRound" :showPagination="false" class="base-table">
      <el-table-column :label="$t('crowd-sale.table.round')" prop="name" width="140"> </el-table-column>
      <el-table-column :label="$t('crowd-sale.table.start-date')" prop="fromDate" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.fromDate.time | formatMMDDYYWithoutHours }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('crowd-sale.table.end-date')" prop="toDate" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.toDate.time | formatMMDDYYWithoutHours }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('crowd-sale.table.price')" prop="price" align="right" width="124">
        <template slot-scope="scope">
          <span>${{ scope.row.price | convertAmountDecimal('USD') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('crowd-sale.table.sold')" prop="totalSold" align="right" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.totalSold < scope.row.totalAmount">{{ scope.row.totalSold | formatNumber }}</span>
          <span v-else>{{ scope.row.totalAmount | formatNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('crowd-sale.table.remain')" prop="totalAvailable" align="right" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.totalAvailable > 0">{{ scope.row.totalAvailable | formatNumber }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('crowd-sale.table.progress')" prop="percentageSold" align="right" width="160">
        <template slot-scope="scope">
          <span>{{ ((scope.row.percentageSold * 1000) / 10) | convertAmountDecimal('PERCENT') }}%</span>
        </template>
      </el-table-column>
    </base-table>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import firebase from '@/utils/firebase'

  @Component
  export default class TableRound extends Vue {
    listRound: Record<string, any>[] = []
    listener: any = null

    created(): void {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      const crowdSaleRef = firebase.database().ref('crowd-sales')
      this.listener = crowdSaleRef.on('value', function (snapshot) {
        console.log('data', snapshot.val())

        _this.listRound = snapshot.val()
      })
    }

    destroyed(): void {
      const crowdSaleRef = firebase.database().ref('crowd-sales')
      crowdSaleRef.off('value', this.listener)
    }
  }
</script>

<style scoped lang="scss">
  .table-round {
    padding: 24px;
    background: #fff;
    box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
    border-radius: 4px;
  }
</style>
