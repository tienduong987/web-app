<template>
  <div class="affilicate-header be-flex align-center jc-space-between mb-24 bg-white">
    <div class="affilicate-header-left">
      <h2 class="affilicate-left-title">
        <p>{{ $t('affiliate.invite') }}{{ nameCoin }}{{ $t('affiliate.invite2') }} <base-icon icon="icon-cups" size="48"></base-icon></p>
      </h2>
      <div class="affilicate-header-description" v-if="listBonus">
        <div v-for="item in listBonus" :key="item.id" class="bonus"> {{ item }}</div>
      </div>
      <el-form ref="dataInput" :model="dataInput" :rules="rules" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false">
        <el-form-item :label="`${$t('affiliate.referralLink')}`" style="width: auto; color: red" prop="address">
          <el-input v-model="linkRef" class="style-input" />
          <div class="split-button cursor">
            <copy-to-clipboard :text="linkRef" @copy="handleCopy">
              <base-icon icon="Addons" size="46" />
            </copy-to-clipboard>
          </div>
        </el-form-item>

        <!-- <el-form-item :label="`${$t('affiliate.send-invite')}`" prop="address" style="color: red" class="label-send-invite">
          <el-input v-model="email" prop="email" class="send-invite-input style-input" />
          <el-button
            :class="disableButton ? 'btn-style send-invite-button backgroundDisable' : 'btn-style send-invite-button'"
            :disabled="disableButton"
            type="primary"
            @click="handleSendInvite"
            >{{ $t('affiliate.send-invite') }}</el-button
          >
        </el-form-item> -->

        <!-- test -->
        <el-form-item :label="`${$t('affiliate.send-invite')}`" prop="address" style="color: red" class="label-send-invite">
          <div style="width: 100%">
            <el-select
              popper-class="dropdown-select"
              v-model="testValue"
              multiple
              filterable
              remote
              clearable
              :placeholder="$t('affiliate.placehoder')"
              :remote-method="remoteMethod"
              automatic-dropdown="false"
              class="send-invite-input style-input select-item"
              :loading="loading"
            >
              <el-option v-for="item in responseList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>

            <el-button
              :class="disableButton ? 'btn-style btn--disabled send-invite-button backgroundDisable' : 'btn-style send-invite-button btn-theme'"
              :disabled="disableButton"
              style="position: absolute; height: 48px; margin-top: 0px"
              type="primary"
              @click="handleSendInvite"
              >{{ $t('affiliate.send-invite') }}</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="affilicate-header-right">
      <div>
        <qrcode-vue :value="qrCodeData" size="160" level="H"></qrcode-vue>
      </div>
      <div class="affilicate-right-decriptCode">
        <div class="right-decriptCode-title">{{ $t('affiliate.referral-code') }}</div>
        <copy-to-clipboard :text="affiliationCode" @copy="handleCopy">
          <p class="right-decriptCode cursor">{{ affiliationCode }} <base-icon icon="addons-noborder" size="20" /></p
        ></copy-to-clipboard>

        <!-- <p class="right-decriptCode">{{ affiliationCode }} <base-icon icon="addons-noborder" size="20" /></p> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import QrcodeVue from 'qrcode.vue'
  import { Component, Watch } from 'vue-property-decorator'
  import getRepository from '@/services'
  import { affiliateRepository } from '@/services/repositories/affiliate'
  import PublicRepository from '@/services/repositories/public'
  import EventBus from '@/utils/eventBus'
  import CopyToClipboard from 'vue-copy-to-clipboard'
  import { debounce, result, trim } from 'lodash'
  import { namespace } from 'vuex-class'
  const beBase = namespace('beBase')
  const apiPublic: PublicRepository = getRepository('public')
  @Component({ components: { QrcodeVue, Vue, CopyToClipboard } })
  export default class AffiliateHeader extends Vue {
    @beBase.State('coinMain') coinMain!: string
    api?: affiliateRepository
    options = [
      // {
      //   value: 'example@gmail.com',
      //   label: 'example@gmail.com'
      // }
    ]
    disableButton = true
    nameCoin = ''
    linkRef = ''
    qrCodeData = ''
    affiliationCode = ''
    testValue: any = []
    data: any = {}
    value1 = []
    value = []
    listDescription: any = []
    optionsSelect: any = [
      {
        value: 'Option1',
        label: 'Option1'
      },
      {
        value: 'Option2',
        label: 'Option2'
      },
      {
        value: 'Option3',
        label: 'Option3'
      },
      {
        value: 'Option4',
        label: 'Option4'
      },
      {
        value: 'Option5',
        label: 'Option5'
      }
    ]
    email = ''
    // @Watch('email') watchListInvite(email: string): void {
    //   this.disableButton = email.length > 0 ? false : true
    // }
    @Watch('testValue') watchList(value: any): void {
      this.disableButton = value.length > 0 ? false : true
    }

    rules: any = {
      email: [
        {
          required: true,
          message: 'Email không được để trống',
          trigger: 'blur'
        },
        { min: 8, max: 8, message: 'CIF phải có 8 ký tự', trigger: 'change' }
      ]
    }
    responseList: any = []
    finalEmail = ''

    remoteMethod(query: string): void {
      // if(query)
      if (trim(query).length > 0 || trim(this.testValue).length > 0) {
        this.disableButton = false
      } else {
        this.disableButton = true
      }
      // this.disableButton = query.length > 0 ? false : true
      if (trim(query).slice(-1) == ';' || trim(query).slice(-1) == ',') {
        const item = {
          label: trim(query).substring(0, trim(query).length - 1),
          value: trim(query).substring(0, trim(query).length - 1)
        }
        this.responseList.push(item)
        this.testValue.push(trim(query).substring(0, trim(query).length - 1))
        // this.query = ''
        // console.log('query', query)
      }
      this.finalEmail = trim(query)
    }
    handleCopy(result): void {
      let message: any = ''
      message = this.$t('notify.copy')
      this.$message.success(message)
    }
    handleSendInvite(): void {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let that = this
      if (this.finalEmail.length > 0) {
        this.testValue.push(this.finalEmail)
      }
      console.log('final', this.finalEmail.length)
      this.finalEmail = ''
      this.debounceSendInvite(that)
    }

    debounceSendInvite = debounce((that: any) => {
      // console.log('that', that.email)
      // const list = that.email.split(',')
      // console.log('ll', list)
      // const str = that.testValue.replace(/\s/g, '')
      const params = {
        invitedEmailList: that.testValue
      }
      that.api
        ?.sendInvite(params)
        .then(() => {
          const message: any = this.$t('affiliate.notifi')
          this.$message.success(message)
          that.testValue = []
          EventBus.$emit('reload-ref')
          // this.$message.success('Send email invite success')
          // console.log('hahaha', res)
        })
        .catch(e => {
          console.log(e)
          // this.$message.success('Toang rồi')
        })
    }, 300)
    listBonus: any = []
    getDataAffiliate(): void {
      this.api
        ?.getDataAffiliate()
        .then((res: any) => {
          this.data = res
          this.linkRef = res.affiliationUrl
          this.affiliationCode = res.affiliationCode
          this.qrCodeData = res.affiliationUrl
          this.sendMessage()
        })
        .catch(e => {
          console.log(e)
        })
    }
    sendMessage(): void {
      EventBus.$emit('inputData', this.data)
      this.data = ''
    }
    destroyed(): void {
      EventBus.$off('inputData')
    }
    async getBonusProgram(): Promise<void> {
      const reusult = await apiPublic.getBonusParams()

      const list = reusult.data.filter(item => item.group == 'For Referrers')
      this.listDescription = list[0].programs

      const a = window.localStorage.getItem('bc-lang')!
      for (let i = 0; i < this.listDescription.length; i++) {
        if (a == 'en') {
          // this.listDescription[i].descriptions
          this.listBonus.push(this.listDescription[i]?.descriptions?.en)
          // console.log(this.listDescription[i].descriptions.en)
        } else {
          this.listBonus.push(this.listDescription[i]?.descriptions?.vi)
        }
      }

      console.log('listBonus', this.listBonus)
    }
    mounted(): void {
      const a = window.localStorage.getItem('bc-lang')!
      console.log('a', a)
      this.getDataAffiliate()
      this.getBonusProgram()
    }
    created(): void {
      this.api = getRepository('affiliate')
      if (this.coinMain == 'LYNK') {
        this.nameCoin = 'LynKey'
      } else if (this.coinMain == 'CLM') {
        this.nameCoin = 'CleverMe'
      }
    }
  }
</script>

<style scoped lang="scss">

  ::v-deep .el-form .el-form-item__label {
    color: var(--bc-text-discript);
  }
  ::v-deep .el-tag.el-tag--info {
    background-color: #f0f5ff !important;
    border-color: #e9e9eb;
    color: #909399;
  }
  .el-select-dropdown .el-scrollbar .el-select-dropdown__list .el-select-dropdown__item.selected {
    color: #5b616e;
  }
  .el-select-dropdown__list {
    display: none !important;
  }

  ::v-deep .el-select-dropdown .el-popper .is-multiple {
    display: none;
  }
  .affilicate-header {
    padding: 24px;
    box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
    border-radius: 4px;
    .el-button--primary {
      color: var(--bc-color-white);
      background-color: var(--bc-text-hyperlink);
      border-color: var(--bc-text-hyperlink);
    }
    .el-button--primary:hover {
      background: var(--bc-btn-bg-default-hover);
    }
    .btn-style {
      padding: 13px 23px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      transform: translateY(-1px);
      background: var(--bc-theme-primary-gradient);
      border: none;
    }
    .affilicate-left-title {
      font-size: 36px;
      line-height: 54px;
      font-weight: 600;
      color: var(--bc-text-primary);
    }
    .affilicate-header-description {
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      color: var(--bc-text-discript);
      margin-top: 8px;
      margin-bottom: 24px;
    }
    .split-button {
      position: absolute;
      right: 0px;
      top: 28px;
      z-index: 10;
    }
    ::v-deep .style-input {
      color: var(--bc-text-primary);
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      .el-input__inner:first-child {
        padding-right: 44px;
      }
    }
    .backgroundDisable {
      background: var(--bc-btn-disable);
      color: var(--bc-color-buton-disable) !important;
      border: none;
      &:hover {
        background: var(--bc-btn-disable) !important;
        border: none;
      }
    }
    .backgroundDisable:hover {
      background: var(--bc-btn-disable) !important;
      border: none;
    }
    .send-invite-input {
      width: 80%;
      margin-right: 16px;
    }
    .el-form-item__label {
      color: red;
    }
    .label-send-invite {
      //  color: var(--bc-text-discript) !important;
      font-size: 12px;
      color: red;
    }
    .label.el-form-item__label {
      color: var(--bc-text-color-tab-item) !important;
    }
    // .send-invite-button {
    //   &:hover {
    //     background: var(--bc-theme-primary-gradient-hover) !important;
    //   }
    // }
    ::v-deep .el-select-dropdown.el-popper.is-multiple {
      // min-width: 552.625px;
      position: absolute;
      top: 457px;
      left: 128px;
      transform-origin: center top;
      z-index: 2003;
      display: none;
      width: 0px;
    }
    ::v-deep p.el-select-dropdown__empty {
      display: none !important;
    }
    >>> .p {
      display: none;
    }
    >>> ::v-deep .el-input.el-input-group.el-input-group--append .el-select .el-input__suffix {
      display: none;
    }
    >>> .el-select-dropdown .el-popper is-multiple .style_none {
      display: none !important;
    }
    .el-select-dropdown .el-scrollbar .el-select-dropdown__list .el-select-dropdown__item.selected {
      /* color: var(--bc-theme-primary); */
      font-weight: 400;
      color: red;
    }
    >>> .el-select-dropdown.el-popper.is-multiple {
      // min-width: 552.625px;
      position: absolute;
      top: 457px;
      left: 128px;
      transform-origin: center top;
      z-index: 2003;
      display: none;
      width: 0px;
    }
    .affilicate-header-left {
      margin-bottom: -20px;
      max-width: 40%;
      width: 100%;
    }
    .affilicate-header-right {
      max-width: 60%;
      width: 100%;
      justify-content: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .right-decriptCode-title {
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      color: var(--bc-text-discript);
      margin-top: 16px;
      margin-bottom: 8px;
    }
    .right-decriptCode {
      font-size: 24px;
      font-weight: 600;
      line-height: 34px;
      color: var(--bc-text-primary);
    }
    .affilicate-right-decriptCode {
      text-align: center;
    }

    .el-form .el-form-item__label {
      padding-bottom: 4px;
      font-size: 12px;
      line-height: 16px;
      font-weight: 400;
      color: var(--bc-text-color-tab-item);
    }
    ::v-deep.style_none {
      display: none;
    }
    .backgroundDisable:hover {
      background: var(--bc-btn-disable) !important;
      border: none;
    }
    .btn-theme {
      &:hover {
        background: var(--bc-theme-primary-gradient-hover);
      }
    }
  }
</style>
