<template>
  <div class="setting-security">
    <div class="phone-box">
      <div class="title-box">{{ $t('setting.verified.phoneNumber') }}</div>
      <div class="discription">{{ $t('setting.verified.discript1') }}</div>
      <div class="box-input-phone">
        <div class="box-input">
          {{ getPhone() }}
          <div class="verified">{{ $t('setting.verified.verified') }}</div>
        </div>
        <div class="button-change btn-color" @click="handleChangePhone()">{{ $t('setting.verified.change') }}</div>
      </div>
    </div>
    <div class="hr" />
    <div class="box-pin-code">
      <div class="left">
        <div class="title-box">{{ $t('setting.verified.title2') }}</div>
        <div class="discription">{{ $t('setting.verified.discript6') }}</div>
        <div v-if="pinEnabled == 1" class="for-got-pin" @click="handleForgotPin">{{ $t('setting.verified.forgot-pin') }}</div>
      </div>
      <div class="right">
        <div class="switch">
          <el-switch @change="handleTurnOnPin" v-model="value" active-color="#129961"> </el-switch>
        </div>
        <div v-if="pinEnabled == 1" class="btn-color button-change-pin" @click="handleOpenPopup('popup-change-pin')">{{ $t('setting.verified.change') }}</div>
      </div>
    </div>

    <div class="hr" />
    <div class="box-authentication">
      <div class="title-box">{{ $t('setting.verified.title1') }}</div>
      <div class="discription">{{ $t('setting.verified.discript2') }}</div>
      <div class="mini-content-authentication">{{ $t('setting.verified.miniTitle1') }}</div>
      <div class="blur-title">{{ $t('setting.verified.current') }}</div>
      <div class="mini-box-authen">
        <div class="box-content" v-if="type2fa && type2fa == 'APP'">
          <div class="box-left">
            <div class="box-icon-phone">
              <base-icon icon="phone" size="40"></base-icon>
            </div>
            <div class="box-cmt">
              <span class="title">{{ $t('setting.verified.boxMiniTitle1') }}</span>
              <span class="discript">{{ $t('setting.verified.boxMiniDiscript1') }}</span>
            </div>
          </div>
          <div class="box-right btn-change-manage" @click="handleChange('APP')">{{ $t('setting.verified.manage') }}</div>
        </div>
        <div class="box-content" v-if="type2fa && type2fa == 'SMS'">
          <div class="box-left">
            <div class="box-icon-phone">
              <base-icon icon="phoneSms" size="50"></base-icon>
            </div>
            <div class="box-cmt">
              <span class="title">{{ $t('setting.verified.boxMiniTitle2') }}</span>
              <span class="discript">{{ $t('setting.verified.phoneNumber') }}: {{ getPhone() }}</span>
            </div>
          </div>
        </div>
        <div class="box-content" v-if="type2fa && type2fa == 'EMAIL'">
          <div class="box-left">
            <div class="box-icon-phone">
              <base-icon icon="setting-email" size="30"></base-icon>
            </div>
            <div class="box-cmt">
              <span class="title">{{ $t('setting.verified.boxMiniTitle3') }}</span>
              <span class="discript">{{ $t('setting.verified.boxMiniDiscript2') }}: {{ getMail() }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="blur-title">{{ $t('setting.verified.otherOptions') }}</div>
      <div class="mini-box-authen">
        <div class="box-content" v-if="type2fa && type2fa != 'APP'">
          <div class="box-left">
            <div class="box-icon-phone">
              <base-icon icon="phone" size="40"></base-icon>
            </div>
            <div class="box-cmt">
              <span class="title">{{ $t('setting.verified.boxMiniTitle1') }}</span>
              <span class="discript">{{ $t('setting.verified.boxMiniDiscript1') }}</span>
            </div>
          </div>
          <div class="box-right btn-color" @click="handleChange('APP')">{{ $t('setting.verified.select') }}</div>
        </div>
        <div class="box-content" v-if="type2fa && type2fa != 'SMS'">
          <div class="box-left">
            <div class="box-icon-phone">
              <base-icon icon="phoneSms" size="50"></base-icon>
            </div>
            <div class="box-cmt">
              <span class="title">{{ $t('setting.verified.boxMiniTitle2') }}</span>
              <span class="discript">{{ $t('setting.verified.phoneNumber') }}: {{ getPhone() }}</span>
            </div>
          </div>
          <div class="box-right btn-color" @click="handleChange('SMS')">{{ $t('setting.verified.select') }}</div>
        </div>
        <div class="box-content" v-if="type2fa && type2fa != 'EMAIL'">
          <div class="box-left">
            <div class="box-icon-phone">
              <base-icon icon="setting-email" size="30"></base-icon>
            </div>
            <div class="box-cmt">
              <span class="title">{{ $t('setting.verified.boxMiniTitle3') }}</span>
              <span class="discript">{{ $t('setting.verified.boxMiniDiscript2') }}: {{ getMail() }}</span>
            </div>
          </div>
          <div class="box-right btn-color" @click="handleChange('EMAIL')">{{ $t('setting.verified.select') }}</div>
        </div>
      </div>
      <div class="mini-content-authentication">{{ $t('setting.verified.miniTitle2') }}</div>
      <div class="check-box">
        <el-checkbox v-model="checked1" disabled
          ><span class="content-checkbox">{{ $t('setting.verified.checkbox1') }}</span></el-checkbox
        >
        <el-checkbox v-model="checked2"
          ><span class="content-checkbox">{{ $t('setting.verified.checkbox2') }}</span></el-checkbox
        >
      </div>
      <div class="box-btn">
        <div class="btn-action btn-reset" @click="handleReset">{{ $t('setting.verified.reset') }}</div>
        <div class="btn-action btn-save btn-color" @click="handleSave">{{ $t('setting.verified.save') }}</div>
      </div>
      <!-- <div class="btn-action" @click="handleOpenPopup('popup-enable-authenticator-support')">test</div> -->
    </div>
    <popup-verified
      :action="type2fa"
      :type="type"
      :pin="pin"
      :pinEnabled="pinEnabled"
      :valuePin="value"
      :check2fa="checked2"
      @apply="init"
      @applyApp="applyApp"
      @openEnable="openEnable"
      @openPopup="openPopup"
      @forGotPin="forGotPin"
      @reloadCheckbox="init"
      @reloadPin="reloadPin"
      @reloadValuePin="reloadValuePin"
    />
    <popup-change-number-phone @apply="handleOpenPopup" />
    <popup-verification :stage="stage" @apply="init" />
    <popup-enable-authenticator-support @apply="handleReload" :dataQR="dataQR" :type="typeApp" />
    <popup-change-pin :type="type2fa" @apply="init" @reloadPin="init" />
    <popup-forgot-pin :valuePin="value" :dataCode="dataCode" @apply="init" :title="titleSetupPin" @reloadPin="reloadPin" @reloadValuePin="reloadValuePin" />
    <popup-setup-pin :dataCode="dataCode" @apply="init" />
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import PopupVerified from '../components/popup/PopupVerified.vue'
  import PopupChangeNumberPhone from '../components/popup/PopupChangeNumberPhone.vue'
  import PopupChangePin from '../components/popup/PopupChangePin.vue'
  import PopupForgotPin from '../components/popup/PopupForgotPin.vue'
  import PopupSetupPin from '../components/popup/PopupSetupPin.vue'
  import PopupVerification from '../components/popup/PopupVerification.vue'
  import PopupEnableAuthenticatorSupport from '../components/popup/PopupEnableAuthenticatorSupport.vue'
  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  import { SettingRepository } from '@/services/repositories/setting'
  import { debounce } from 'lodash'
  const api: SettingRepository = getRepository('setting')
  @Component({
    components: { PopupVerified, PopupChangeNumberPhone, PopupVerification, PopupEnableAuthenticatorSupport, PopupChangePin, PopupForgotPin, PopupSetupPin }
  })
  export default class Security extends Mixins(PopupMixin) {
    titleSetupPin: any = ''
    checked1 = true
    checked2 = false
    checked3 = false
    value = false
    phone = ''
    type = ''
    email = ''
    dataInfo: any = {}
    stage: any = {}
    type2fa: any = {}
    pin: any = ''
    pinEnabled: any = 0
    dataCode: any = ''
    dataQR: any = {}
    typeApp: any = ''
    //chan doble click
    debounceFilter = debounce((nameAction: any) => {
      if (nameAction == 'handleChange') {
        this.actionGet2fa()
      }
      if (nameAction == 'handleReset') {
        this.init()
      }
      if (nameAction == 'handleTurnOnPin') {
        this.turnOnPin()
      }
    }, 400)

    async handleChange(type: string): Promise<void> {
      this.type = type
      this.debounceFilter('handleChange')
    }
    async actionGet2fa(): Promise<void> {
      this.get2fa(this.$store.state.beAuth.user.email)
      if (this.type == 'popup-setup-pin' || this.type == 'popup-forgot-pin' || this.type == 'popup-forgot-pin2') {
        const data = {
          type: 'EMAIL',
          reason: ''
        }
        if (this.type == 'popup-forgot-pin2') {
          data.reason = 'FOR_FORGOT_PIN'
        }
        await api.genCode(data).then(() => {
          this.setOpenPopup({
            popupName: 'popup-verified',
            isOpen: true
          })
        })
      } else {
        const data = {
          type: '',
          reason: 'FOR_CHANGE_2FA',
          check2fa: this.checked2
        }
        if (this.type == 'NONE') {
          data.reason = 'FOR_TURNOFF_2FA'
        }
        await api.genCode(data).then(() => {
          this.setOpenPopup({
            popupName: 'popup-verified',
            isOpen: true
          })
        })
      }
    }
    handleReload(): void {
      this.typeApp = ''
      this.init()
    }
    handleReset(): void {
      this.debounceFilter('handleReset')
    }
    handleChangePhone(): void {
      this.setOpenPopup({
        popupName: 'popup-change-number-phone',
        isOpen: true
      })
    }
    async handleOpenPopup(namePopup: string, data: any): Promise<void> {
      this.get2fa(this.$store.state.beAuth.user.email)
      if (data) {
        this.stage = data
      }
      if (namePopup == 'popup-change-pin') {
        if (!this.pin) {
          this.handleChange('popup-setup-pin')
        } else {
          const data = {
            type: 'EMAIL',
            reason: 'FOR_CHANGE_PIN'
          }
          await api.genCode(data).then(() => {
            this.setOpenPopup({
              popupName: namePopup,
              isOpen: true
            })
          })
        }
      } else {
        this.setOpenPopup({
          popupName: namePopup,
          isOpen: true
        })
      }
    }
    openEnable(data: any): void {
      this.dataQR = data
      this.setOpenPopup({
        popupName: 'popup-enable-authenticator-support',
        isOpen: true
      })
    }
    openPopup(dataCode: string): void {
      this.dataCode = dataCode
      if (this.dataCode) {
        this.setOpenPopup({
          popupName: 'popup-setup-pin',
          isOpen: true
        })
      }
    }
    forGotPin(dataCode): void {
      this.dataCode = dataCode
      this.setOpenPopup({
        popupName: 'popup-forgot-pin',
        isOpen: true
      })
    }
    getPhone(): void {
      let phone: any = ''
      if (this.phone) {
        let test = `${this.phone.split('').reverse().join('').slice(0, 3)}`
        for (let i: any = 1; i <= this.phone.split('').reverse().length - 3; i++) {
          test = test + 'x'
        }
        phone = `+${test.split('').reverse().join('')}`
      }

      return phone
    }
    getMail(): void {
      let email: any = ''
      if (this.email) {
        let test = `${this.email.slice(0, 2)}`
        let test2 = `${this.email.split('').reverse().join('').slice(0, 10)}`
        email = `${test.split('').join('') + '*******' + test2.split('').reverse().join('')}`
      }

      return email
    }
    handleSave(): void {
      if (this.checked2 != this.checked3) {
        this.handleChange('NONE')
      }
    }
    handleTurnOnPin(): void {
      this.debounceFilter('handleTurnOnPin')
    }
    turnOnPin(): void {
      if (this.value) {
        this.titleSetupPin = this.$t('verified.titleSetupPin')
        this.handleChange('popup-forgot-pin')
      } else {
        this.handleChange('popup-setup-pin')
      }
    }
    async getInfo(): Promise<void> {
      api.getInfo().then((res: any) => {
        this.dataInfo = res
        this.phone = res.phone
        if (res.email) {
          this.email = res.email
          this.get2fa(res.email)
        }
        this.pin = res.pin
        this.pinEnabled = res.pinEnabled
        if (res.pinEnabled == 0) {
          this.value = false
        } else if (res.pinEnabled == 1) {
          this.value = true
        }
        if (res.login2faEnabled == 0) {
          this.checked2 = false
          this.checked3 = false
        } else if (res.login2faEnabled == 1) {
          this.checked2 = true
          this.checked3 = true
        }
        if (res.transaction2faEnabled == 0) {
          this.checked1 = false
        } else if (res.transaction2faEnabled == 1) {
          this.checked1 = true
        }
      })
    }
    get2fa(email: string): void {
      const params = {
        email: email
      }
      api.get2fa(params).then((res: any) => {
        this.type2fa = res
      })
    }
    async init(): Promise<void> {
      await this.getInfo()
      this.$forceUpdate()
    }
    reloadPin(): void {
      api.getInfo().then((res: any) => {
        this.pinEnabled = res.pinEnabled
        this.pin = res.pin
        if (res.pinEnabled == 0) {
          this.value = false
        } else if (res.pinEnabled == 1) {
          this.value = true
        }
      })
    }
    reloadValuePin(value: boolean): void {
      console.log('vao day')

      console.log('value: ', value)
      this.value = value
    }
    applyApp(data: any): void {
      this.dataQR = data
      this.typeApp = 'changeApp'
      this.setOpenPopup({
        popupName: 'popup-enable-authenticator-support',
        isOpen: true
      })
    }
    handleForgotPin(): void {
      this.titleSetupPin = ''
      this.handleChange('popup-forgot-pin2')
    }
    created(): void {
      this.init()
    }
  }
</script>

<style scoped lang="scss">
  .setting-security {
    background: var(--bc-color-white);
    min-height: 528px;
    padding: 24px;
    box-shadow: var(--bc-box-shadow);
    border-radius: 0 0 4px 4px;
    .hr {
      width: 100%;
      border-top: 1px solid var(--bc-input-border);
      margin: 24px 0;
    }
    .title-box {
      color: var(--bc-text-primary);
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
    }
    .discription {
      color: var(--bc-text-discript);
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      margin-top: 8px;
    }
    a {
      color: var(--bc-btn-bg-default-hover);
    }
    .phone-box {
      .box-input-phone {
        .box-input {
          width: 380px;
          height: 39px;
          margin-right: 16px;
          border: 1px solid var(--bc-border-input);
          border-radius: 4px;
          text-align: left;
          line-height: 39px;
          color: var(--bc-text-primary);
          font-size: 16px;
          padding-left: 12px;
          padding-right: 12px;
          display: flex;
          justify-content: space-between;
          .verified {
            color: var(--bc-status-success);
            font-size: 14px;
          }
        }
        display: flex;
        margin-top: 24px;
        div {
          display: inline-block;
        }
        .box-input-change {
          .el-input {
            width: 404px;
            height: 40px;
            margin-right: 16px;
          }
        }

        .button-change {
          width: 120px;
          height: 40px;
          border-radius: 6px;
          text-align: center;
          line-height: 40px;
          font-weight: 400;
          font-size: 14px;
        }
      }
    }
    .box-pin-code {
      display: flex;
      .left {
        max-width: 289px;
        margin-right: 65px;
        .for-got-pin {
          color: var(--bc-btn-bg-default-hover);
          font-weight: 400;
          font-size: 14px;
          cursor: pointer;
          margin-top: 8px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        padding-top: 24px;
        .button-change-pin {
          margin-left: 28px;
          width: 120px;
          height: 40px;
          border-radius: 6px;
          text-align: center;
          line-height: 40px;
          font-weight: 400;
          font-size: 14px;
        }
      }
    }

    .box-authentication {
      .mini-content-authentication {
        margin-top: 24px;
        color: var(--bc-text-primary);
        font-weight: 600;
        font-size: 16px;
      }
      .blur-title {
        color: var(--bc-text-discript);
        margin-top: 16px;
        font-weight: 600;
        font-size: 16px;
      }
      .mini-box-authen {
        width: 540px;
        min-height: 56px;
        padding: 16px 16px 0 16px;
        border: 1px solid var(--bc-btn-border);
        margin-top: 8px;
        border-radius: 4px;
        .box-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          .box-left {
            display: flex;
            .box-icon-phone {
              width: 56px;
              height: 56px;
              background: var(--bc-color-grey20);
              border-radius: 5.6px;
              text-align: center;
              line-height: 56px;
              display: inline-block;
              margin-right: 8px;
            }
            .box-cmt {
              display: inline-block;
              min-height: 56px;
              span {
                display: block;
              }
              .title {
                color: var(--bc-text-primary);
                font-weight: 400;
                font-size: 16px;
              }
              .discript {
                color: var(--bc-text-discript);
                font-weight: 400;
                font-size: 12px;
              }
            }
          }
          .box-right {
            display: inline-block;
            min-width: 80px;
            height: 40px;
            border: 1px solid var(--bc-btn-border);
            border-radius: 6px;
            text-align: center;
            line-height: 40px;
            color: var(--bc-btn-text);
            font-size: 14px;
            cursor: pointer;
          }
          .btn-change-manage {
            padding: 0 20px;
            &:hover {
              color: var(--bc-btn-default-text-hover);
              border: 1px solid var(--bc-btn-default-border-hover);
            }
          }
        }
      }
      .check-box {
        .el-checkbox {
          width: 200px;
          display: block;
          margin-top: 16px;
          font-weight: 400;
          font-size: 16px;
          .content-checkbox {
            color: var(--bc-text-primary);
          }
        }
      }
    }
    margin-bottom: 24px;
    .btn-action {
      width: 100px;
      height: 40px;
      background: var(--bc-color-white);
      color: var(--bc-btn-text);
      font-weight: 400;
      font-size: 14px;
      border: 1px solid var(--bc-btn-border);
      border-radius: 6px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      &:hover {
        color: var(--bc-btn-bg-default);
        border: 1px solid var(--bc-btn-bg-default);
      }
    }
    .box-btn {
      margin-top: 24px;
      display: flex;
      .btn-reset {
        margin-right: 16px;
        min-width: 120px;
        &:hover {
          background: var(--bc-btn-default-text-hover);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          border: 1px solid var(--bc-btn-default-border-hover);
        }
      }
      .btn-save {
        min-width: 120px;
      }
    }
    .btn-color {
      background: var(--bc-theme-primary-gradient);
      color: var(--bc-color-white) !important;
      cursor: pointer;
      &:hover {
        border: none;
        color: var(--bc-btn-default-text-hover);
        background: var(--bc-theme-primary-gradient-hover) !important;
      }
      border: none !important;
    }
  }
</style>
