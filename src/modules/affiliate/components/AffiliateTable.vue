<template>
  <div class="affiliate-table bg-white">
    <div class="affiliate-overview">
      <div class="affiliate-overview-title">{{ $t('affiliate.over-view') }}</div>
      <div class="sack-affiliate-overview-k1">
        <div class="affiliate-overview-k1 mr80">
          <div class="affiliate-overview-k1-left">
            <base-icon v-if="coinMain === 'LYNK'" icon="icon-monney" style="color: #000" size="80" />
            <base-icon v-else icon="icon-monney-clm" style="color: #000" size="80" />
          </div>
          <div class="affiliate-overview-k1-right">
            <div class="affiliate-overview-k1-right-title">{{ $t('affiliate.have-earn') }}</div>
            <div v-if="totalOfBonus > 0" class="affiliate-overview-k1-right-count">${{ totalOfBonus | convertAmountDecimal('USD') }}</div>
            <div v-else class="affiliate-overview-k1-right-count">${{ 0 }}</div>
          </div>
        </div>
        <div class="affiliate-overview-k1">
          <div class="affiliate-overview-k1-left">
            <base-icon v-if="coinMain === 'LYNK'" icon="icon-friend" style="color: #000" size="80" />
            <base-icon v-else icon="icon-friend-clm" style="color: #000" size="80" />
          </div>
          <div class="affiliate-overview-k1-right">
            <div class="affiliate-overview-k1-right-title">{{ $t('affiliate.friend-ref') }}</div>
            <div class="affiliate-overview-k1-right-count">{{ friendRfr }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        paginationInfo="khách hàng"
        :data="data"
        :is-loading="isLoading"
        :table="query"
        :showPagination="true" -->
    <div class="affiliatehistory mt24">
      <!-- <div class="affiliate-overview-title">{{ $t('affiliate.history') }}</div> -->
      <div class="be-flex align-center jc-space-between affiliatehistory__above">
        <div class="affiliatehistory__above-tabs be-flex">
          <div class="tab-item cursor" v-for="tab in tabs" :key="tab.id" :class="tabActive === tab.id ? 'tab-active' : null" @click="handleChangeTab(tab)">
            <span class="text-base">{{ $t(`affiliate.` + tab.title) }}</span>
          </div>
        </div>
      </div>
      <base-table
        v-if="tabActive === 0"
        :data="responseList"
        :isLoading="isLoading"
        :showPagination="true"
        :paginationInfo="getPaginationInfo"
        :table="query"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
      >
        <el-table-column label="#" type="index" :index="getIndex" align="center" width="40" />
        <el-table-column :label="$t('affiliate.friend')" prop="friendName" />
        <el-table-column :label="$t('affiliate.type')" prop="typeBounus" />

        <el-table-column :label="$t('affiliate.date')" prop="transactionDate" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.transactionMillisecond | formatMMDDYY }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column :label="$t('wallet.table.date')" prop="transactionDate" >
          <template slot-scope="scope">
            <span>{{ scope.row.transactionMillisecond | formatMMDDYY }}</span>
          </template>
        </el-table-column>
        -->
        <el-table-column :label="$t('affiliate.transaction')" align="right">
          <template slot-scope="scope">
            <div >
              <!-- <span>+{{ scope.row.  | convertAmountDecimal(scope.row.tokenCurrency) }} {{ scope.row.tokenCurrency }}</span> -->
              <span v-if="scope.row.transactionAmount">+{{ scope.row.transactionAmount | convertAmountDecimal(scope.row.tokenCurrency) }} {{ coinMain }}</span>
              <span class="d-block amount-exchange-small" v-if="scope.row.transactionAmountToUsd">~${{ scope.row.transactionAmountToUsd | convertAmountDecimal('USD') }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('affiliate.commiss')" align="right">
          <template slot-scope="scope">
            <div class="amount-increase">
              <span>+{{ scope.row.tokenAmount | convertAmountDecimal(scope.row.tokenCurrency) }} {{ scope.row.tokenCurrency }}</span>
              <span class="d-block amount-exchange-small">~${{ scope.row.tokenAmountToUsd | convertAmountDecimal('USD') }}</span>
            </div>
          </template>
        </el-table-column>
      </base-table>

      <base-tree-table
        v-if="tabActive === 1"
        :data="listReferral"
        :isLoading="isLoading"
        :table="query"
        :showPagination="true"
        :showSummary="false"
        :default-expand-all="false"
        :paginationInfo="paginationInfoTree"
        :rowClassName="rowClassName"
        rowKey="inviteDate"
        class="table-text-body-bold table-expanded table-width-background custom-table custom-table-height"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
      >
        <el-table-column type="expand" width="30px" align="right">
          <template slot-scope="props">
            <base-tree-table
              :data="props.row.subs"
              :showPagination="false"
              :showTableHeader="false"
              :showSummary="false"
              :default-expand-all="false"
              :rowClassName="rowClassName"
              rowKey="inviteDate"
              class="table-text-body-bold table-expanded table-width-background custom-table custom-table-height"
            >
              <el-table-column width="40px" align="right" />
              <el-table-column type="expand" width="30px" align="right">
                <template slot-scope="props1">
                  <base-tree-table
                    :data="props1.row.subs"
                    :showPagination="false"
                    :showTableHeader="false"
                    :showSummary="false"
                    :default-expand-all="false"
                    rowKey="inviteDate"
                    class="table-text-body-bold table-expanded table-width-background custom-table custom-table-height"
                  >
                    <el-table-column width="100px" align="right" />
                    <el-table-column :label="$t('affiliate.friend')" prop="fullName" />
                    <el-table-column :label="$t('affiliate.email')" prop="inviteEmail" width="300" />
                    <el-table-column :label="$t('affiliate.tier')" prop="tier" width="140" align="center" />
                    <el-table-column :label="$t('affiliate.invite-date')" prop="inviteDate" width="240">
                      <template slot-scope="scope">
                        <span>{{ scope.row.inviteDate | formatMMDDYY }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('affiliate.status')" prop="status" width="140" align="center">
                      <template slot-scope="scope">
                        <span :class="switchClass(scope.row.status)">{{ switchStatus(scope.row.status) }}</span>
                      </template>
                    </el-table-column>
                  </base-tree-table>
                </template>
              </el-table-column>
              <el-table-column :label="$t('affiliate.friend')" prop="fullName" />
              <el-table-column :label="$t('affiliate.email')" prop="inviteEmail" width="300" />
              <el-table-column :label="$t('affiliate.tier')" prop="tier" width="140" align="center" />
              <el-table-column :label="$t('affiliate.invite-date')" prop="inviteDate" width="240">
                <template slot-scope="scope">
                  <span>{{ scope.row.inviteDate | formatMMDDYY }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('affiliate.status')" prop="status" width="140" align="center">
                <template slot-scope="scope">
                  <span :class="switchClass(scope.row.status)">{{ switchStatus(scope.row.status) }}</span>
                </template>
              </el-table-column>
            </base-tree-table>
          </template>
        </el-table-column>
        <el-table-column :label="$t('affiliate.friend')" prop="fullName" />
        <el-table-column :label="$t('affiliate.email')" prop="inviteEmail" width="300" />
        <el-table-column :label="$t('affiliate.tier')" prop="tier" width="140" align="center" />
        <el-table-column :label="$t('affiliate.invite-date')" prop="inviteDate" width="240">
          <template slot-scope="scope">
            <span>{{ scope.row.inviteDate | formatMMDDYY }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('affiliate.status')" prop="status" width="140" align="center">
          <template slot-scope="scope">
            <span :class="switchClass(scope.row.status)">{{ switchStatus(scope.row.status) }}</span>
          </template>
        </el-table-column>
      </base-tree-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import getRepository from '@/services'
  import { affiliateRepository } from '@/services/repositories/affiliate'
  import EventBus from '@/utils/eventBus'
  import { namespace } from 'vuex-class'
  import CrowdSaleRepository from '@/services/repositories/crowd-sale'
  // import { AuthRepository } from '@/services/repositories/auth'
  const beBase = namespace('beBase')
  const bcAuth = namespace('beAuth')
  const apiAuth = getRepository('auth')
  const apiCrowdSale: CrowdSaleRepository = getRepository('crowd-sale')
  const api = getRepository('affiliate')
  @Component
  export default class AffiliateHeader extends Vue {
    @beBase.State('coinMain') coinMain!: string
    @bcAuth.Action('getInfo') getInfo!: () => Promise<any>
    api?: affiliateRepository
    response: Array<Record<string, any>> = []
    responseList: any = []
    listReferral: Array<Record<string, any>> = []
    query: Record<string, any> = {
      page: 1,
      limit: 20,
      total: 0
    }
    userId = ''
    data = {}
    isLoading = false
    totalOfBonus = ''
    friendRfr = ''

    tabs: Array<Record<string, any>> = [
      {
        id: 0,
        title: 'bounus-history'
      },
      {
        id: 1,
        title: 'my-ref'
      }
    ]

    tabActive = 0

    get getIndex(): number {
      return this.query.limit * (this.query.page - 1) + 1
    }

    get getPaginationInfo(): any {
      return this.$t('affiliate.pagint')
    }
    get paginationInfoTree(): any {
      return this.$t('affiliate.pagint-tree')
    }

    mounted(): void {
      EventBus.$on('inputData', payLoad => {
        this.data = payLoad
        this.totalOfBonus = payLoad.totalOfBonus
        this.friendRfr = payLoad.friendRfr
      })
      EventBus.$on('reload-ref', () => {
        if (this.tabActive === 1) {
          this.handleGetMyReferral()
        }
      })
    }
    destroyed(): void {
      EventBus.$off('inputData')
      EventBus.$off('reload-ref')
    }

    async created(): Promise<void> {
      this.api = getRepository('affiliate')
      await this.getUser()
      await this.getData()
    }
    async getUser(): Promise<void> {
      await apiAuth
        ?.getInfo()
        .then((res: any) => {
          this.userId = res.userId
        })
        .catch(e => {
          console.log(e)
        })
    }
    async getData(): Promise<void> {
      try {
        this.isLoading = true
        const params = {
          ...this.query,
          transactionType: 'AFFILIATE',
          userId: this.userId,
          total: null
        }
        const result = await apiCrowdSale.getListTransactionAffiliate(params)
        this.responseList = result.content || []
        this.query.total = result.totalElements || 0
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.isLoading = false
      }
    }
    handleCurrentChange(value: number): void {
      this.query.page = value
      if (this.tabActive === 0) {
        this.getData()
      } else {
        this.handleGetMyReferral()
      }
    }
    handleSizeChange(value: number): void {
      this.query.page = 1
      this.query.limit = value
      if (this.tabActive === 0) {
        this.getData()
      } else {
        this.handleGetMyReferral()
      }
    }

    async handleGetMyReferral(): Promise<void> {
      try {
        const rs = await apiCrowdSale.getMyReferral(this.query)
        this.listReferral = rs.content
        this.query.total = rs.totalElements
      } catch (error) {
        console.log(error)
      }
    }

    handleChangeTab(tab: Record<string, any>): void {
      this.tabActive = tab.id
      this.query = {
        page: 1,
        limit: 20,
        total: 0
      }
      if (tab.id === 0) {
        this.getData()
      } else {
        this.handleGetMyReferral()
      }
    }

    rowClassName(params: Record<string, any>): string {
      const { row } = params
      if (row.subs) {
        return 'have-subs'
      }
      return 'no-sub'
    }

    switchStatus(status: string): string {
      switch (status) {
        case 'INVITED':
          return this.$t('affiliate.invited') as string
        case 'SIGNED_UP':
          return this.$t('affiliate.signedup') as string
        default:
          return this.$t('affiliate.crowdsale') as string
      }
    }
    switchClass(status: string): string {
      switch (status) {
        case 'INVITED':
          return 'status-neutral-bg status-neutral status'
        case 'SIGNED_UP':
          return 'status-warning-bg status-warning status'
        default:
          return 'status-success-bg status-success status'
      }
    }
  }
</script>

<style scoped lang="scss">
  .affiliate-table {
    padding: 24px;
    .affiliate-overview-title {
      font-size: 24px;
      line-height: 32px;
      font-weight: 600;
      color: var(--bc-text-primary);
    }
    .affiliate-overview-k1 {
      display: flex;
      align-items: center;
    }
    .affiliate-overview-k1-right-title {
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      color: var(--bc-text-primary);
    }
    .affiliate-overview-k1-left {
      margin-right: 16px;
    }
    .affiliate-overview-k1-right-count {
      font-size: 24px;
      line-height: 32px;
      font-weight: 600;
      color: var(--bc-text-primary);
    }
    .sack-affiliate-overview-k1 {
      display: flex;
    }
    .mr80 {
      margin-right: 80px;
    }
    .mt24 {
      margin-top: 24px;
    }
    .affiliate-overview {
      border-bottom: 1px solid #d2d0ce;
      padding-bottom: 24px;
    }
    .affiliatehistory {
      &__above {
        border-bottom: 1px solid var(--bc-border-primary);
        &-tabs {
          .tab-item {
            padding: 16px 12px;
            position: relative;
            color: var(-bc-text-color-tab-item) !important;
            &:hover {
              color: var(--bc-tab-active);
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
              background-color: var(--bc-tab-active);
            }
          }
        }
      }
    }
    .status {
      display: inline-block;
      width: 80px;
      height: 24px;
      text-align: center;
      border-radius: 4px;
      font-size: 12px;
    }
  }
</style>
