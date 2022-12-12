<template>
  <div class="setting-quota">
    <div class="title-box">{{ $t('setting.quota.title1') }}</div>
    <div class="be-flex align-center" style="margin-top: 8px">
      <div class="discription inline" style="margin-top: 0">{{ $t('setting.quota.discript1') }}</div>
      <div class="box-level">{{ getLevelUser(level) }}</div>
    </div>
    <div class="discription">{{ $t('setting.quota.discript2') }}</div>
    <div class="line"></div>
    <div class="title-box mgt-24 mgb-20">{{ $t('setting.quota.title2') }}</div>
    <base-table :data="dataTabel" :showPagination="false" class="base-table table-wallet">
      <el-table-column prop="groupName" :label="$t('setting.quota.labelTabel1')" align="left" width="90">
        <template slot-scope="scope">
          <span>{{ getGroupName(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalTrade" :label="$t('setting.quota.labelTabel2')" align="left">
        <template slot-scope="scope">
          <span>{{ localTrade(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="depositLimit" :label="$t('setting.quota.labelTabel3')" width="140" align="right">
        <template slot-scope="scope">
          <span>{{ scope.row.depositLimit ? scope.row.depositLimit : $t('setting.quota.unLimit') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="buyLimit" :label="$t('setting.quota.labelTabel4')" width="140" align="right">
        <template slot-scope="scope">
          <span v-if="scope.row.buyLimit == 0">{{ getScope(scope.row.buyLimit) }}</span>
          <span v-else>{{ scope.row.buyLimit ? getScope(scope.row.buyLimit) : $t('setting.quota.unLimit') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="withdrawLimit" :label="$t('setting.quota.labelTabel5')" width="140" align="right">
        <template slot-scope="scope">
          <!-- <span>{{ getScope(scope.row.withdrawLimit) }}</span> -->
          <span v-if="scope.row.withdrawLimit == 0">{{ getScope(scope.row.withdrawLimit) }}</span>
          <span v-else>{{ scope.row.withdrawLimit ? getScope(scope.row.withdrawLimit) : $t('setting.quota.unLimit') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sellLimit" :label="$t('setting.quota.labelTabel6')" width="140" align="right">
        <template slot-scope="scope">
          <!-- <span>{{ getScope(scope.row.sellLimit) }}</span> -->
          <span v-if="scope.row.sellLimit == 0">{{ getScope(scope.row.sellLimit) }}</span>
          <span v-else>{{ scope.row.sellLimit ? getScope(scope.row.sellLimit) : $t('setting.quota.unLimit') }}</span>
        </template>
      </el-table-column>
    </base-table>
  </div>
</template>
<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import PopupConfirm from '../components/popup/PopupConfirm.vue'
  import { filter } from 'lodash'
  import EventBus from '@/utils/eventBus'
  import { AuthRepository } from '@/services/repositories/auth'
  import getRepository from '@/services'
  import { SettingRepository } from '@/services/repositories/setting'

  const api: SettingRepository = getRepository('setting')

  @Component({ components: { PopupConfirm } })
  export default class Quota extends Mixins(PopupMixin) {
    apiAuth!: AuthRepository
    dataTabel: Array<Record<string, any>> = []
    getScope(number: Record<string, any>): void {
      let num: any = ''
      if (!isNaN(Number(number))) {
        num = '$' + this.$options.filters?.numberWithCommas(number)
      } else {
        num = number
      }
      return num
    }
    title = ''
    getTitle(value: string): void {
      if (value == '0') {
        this.title = 'thanhnt198'
      }
      // if (name === 'verify-phone') {
      //   return 'verify-phone'
      // }
      // if (name === 'verify-email') {
      //   return 'verify-email'
      // }
      // return 'verify-app'
    }
    getGroupName(level: Record<string, any>): string {
      if (level.groupName !== 'Default') {
        return this.$t('setting.quota.level', { level: level.groupName.match(/\d+/)[0] }) as string
      } else {
        return this.$t('setting.quota.default') as string
      }
    }
    localTrade(row: any): void {
      let local: any = ''
      if (row.totalTrade) {
        local = this.$t('setting.quota.textTabel') + ' $' + this.$options.filters?.numberWithCommas(row.totalTrade)
      } else {
        if (row.groupName == 'Default') {
          local = this.$t('setting.quota.textTabel1')
        }
        if (row.groupName == 'LEVEL 1') {
          local = this.$t('setting.quota.textTabel2')
        }
      }
      return local
    }
    async getDataTabel(): Promise<any> {
      api.limitDetails().then((res: any) => {
        this.dataTabel = res
      })
    }
    async init(): Promise<any> {
      await this.getDataTabel()
    }
    getLevelUser(userGroupId: string | number): string {
      const level = filter(this.dataTabel, level => level.id == userGroupId)[0]
      if (level) {
        if (level.groupName !== 'Default') {
          return this.$t('setting.quota.level', { level: level.groupName.match(/\d+/)[0] }) as string
        } else {
          return this.$t('setting.quota.default') as string
        }
      }
      return ''
    }
    created(): void {
      this.apiAuth = getRepository('auth')
      this.getUser()
      this.init()
    }
    level = ''
    getUser(): void {
      this.apiAuth
        ?.getInfo()
        .then((res: any) => {
          console.log('res', res)
          console.log('thanh', res.userGroupId)
          this.level = res.userGroupId
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
</script>
<style scoped lang="scss">
  .setting-quota {
    background: var(--bc-color-white);
    padding: 24px;
    box-shadow: var(--bc-box-shadow);
    border-radius: 0 0 4px 4px;
    margin-bottom: 24px;
    .title-box {
      color: var(--bc-text-primary);
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
    }
    .discription {
      color: var(--bc-text-discript2);
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      margin-top: 8px;
    }
    .inline {
      display: inline-block;
    }
    .box-level {
      display: inline-block;
      border-radius: 4px;
      width: 80px;
      height: 24px;
      background: #e4f9e2;
      text-align: center;
      color: #129961;
      line-height: 24px;
      margin-left: 8px;
      font-weight: 500;
      font-size: 12px;
    }
    .line {
      margin-top: 24px;
      border-top: 1px solid var(--bc-btn-border);
    }
    .mgt-24 {
      margin-top: 24px;
    }
    .mgb-20 {
      margin-bottom: 8px;
    }
  }
</style>
