<template>
  <base-popup name="popup-change-pin" class="popup-change-pin" width="480px" :open="handleOpen" :close="handleClose">
    <div slot="title">
      <span>{{ $t('changePin.title') }}</span>
    </div>
    <div class="content">
      <el-form class="form-change-password" ref="changePin" :rules="rules" :model="form">
        <div class="label label-top">{{ $t('changePin.label1') }}</div>
        <el-form-item prop="oldPin" class="box-input input-password">
          <el-input
            :type="showPass == true ? 'text' : 'password'"
            v-model="form.oldPin"
            :placeholder="$t('changePin.label1')"
            maxlength="4"
            @keyup.native="numberFormat($event)"
          ></el-input>
          <span class="icon-show-password" @click="showPass = !showPass">
            <base-icon :icon="showPass == true ? 'icon-eye-off' : 'icon-eye'" size="22" />
          </span>
        </el-form-item>
        <div class="label" style="margin-bottom: 8px">{{ $t('changePin.label2') }}</div>
        <el-form-item prop="newPin" class="box-input">
          <el-input type="password" v-model="form.newPin" :placeholder="$t('changePin.label2')" maxlength="4" @keyup.native="numberFormat($event)"></el-input>
        </el-form-item>
        <div class="label">{{ $t('changePin.label3') }}</div>
        <el-form-item prop="confirmPin" class="box-input">
          <el-input type="password" v-model="form.confirmPin" :placeholder="$t('changePin.label3')" maxlength="4" @keyup.native="numberFormat($event)"></el-input>
          <div v-if="error" class="error">{{ $t('changePin.errorPin') }}</div>
        </el-form-item>
        <div class="line"></div>
        <div class="big-title">
          {{ $t('verified.titleContent3') }}
        </div>
        <div class="box-input-authentication">
          <div class="box-icon">
            <base-icon icon="setting-email" size="40"></base-icon>
          </div>
          <div class="box-right">
            <span>{{ $t('changePin.label4') }}</span>
            <el-form-item prop="verificationCode" style="width: 339px">
              <el-input v-model="form.verificationCode" :placeholder="$t('changePin.placeholder')"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="discription">
          {{ $t('changePin.discription') }} <span class="re-send-code" @click="handleResendCode">{{ $t('changePin.link') }}</span>
        </div>
      </el-form>
    </div>
    <div slot="footer" class="footer">
      <div @click="handleClose" class="btn-action btn-close">{{ $t('changePin.cancel') }}</div>
      <div @click="handleSubmit" class="btn-action btn-submit">{{ $t('changePin.confirm') }}</div>
    </div>
  </base-popup>
</template>
<script lang="ts">
  import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  import { SettingRepository } from '@/services/repositories/setting'
  import { debounce } from 'lodash'
  const api: SettingRepository = getRepository('setting')
  @Component({ components: {} })
  export default class PopupChangePin extends Mixins(PopupMixin) {
    @Prop() type!: any
    form: Record<string, any> = {
      oldPin: '',
      newPin: '',
      confirmPin: '',
      verificationCode: ''
    }
    error = false
    showPass = false
    rules: any = {
      oldPin: [
        {
          required: true,
          message: this.$t('changePin.wrong-oldPin'),
          trigger: 'blur'
        }
      ],
      newPin: [
        {
          required: true,
          message: this.$t('changePin.wrong-newPin'),
          trigger: 'blur'
        },
        {
          len: 4,
          message: this.$t('changePin.error-length'),
          trigger: 'blur'
        }
      ],
      confirmPin: [
        {
          required: true,
          message: this.$t('changePin.wrong-confirmPin'),
          trigger: 'change'
        },
        {
          len: 4,
          message: this.$t('changePin.error-length'),
          trigger: 'blur'
        }
      ],
      verificationCode: [
        {
          required: true,
          message: this.$t('changePin.wrong-code'),
          trigger: 'blur'
        },
        {
          len: 6,
          message: this.$t('changePassword.errorLengthVerificationCode'),
          trigger: 'blur'
        }
      ]
    }
    @Watch('form.confirmPin') watchConfirmPassword(pass: string): void {
      if (pass.length > 0 && this.form.newPin !== pass) {
        this.error = true
      } else {
        this.error = false
      }
    }
    handleReset(): void {
      this.form = {
        oldPin: '',
        newPin: '',
        confirmPin: '',
        verificationCode: ''
      }
      this.showPass = false
      this.error = false
      if (this.$refs.changePin) {
        //@ts-ignore
        this.$refs.changePin.clearValidate()
      }
    }
    handleOpen(): void {
      console.log('open')
    }
    handleClose(): void {
      this.handleReset()
      this.$emit('reloadPin')
      this.setOpenPopup({
        popupName: 'popup-change-pin',
        isOpen: false
      })
    }
    validateForm(): boolean {
      let changePin: any = this.$refs.changePin
      let valid = false
      changePin.validate((_valid: boolean) => {
        valid = _valid
      })
      return valid
    }
    // debounce chan doble click
    debounceFilter = debounce((nameAction: any) => {
      if (nameAction == 'handleSubmit') {
        this.submit()
      }
      if (nameAction == 'handleResendCode') {
        this.resendCode()
      }
    }, 400)
    async handleSubmit(): Promise<void> {
      const valid = this.validateForm()
      if (valid && !this.error) {
        this.debounceFilter('handleSubmit')
      }
    }
    async submit(): Promise<void> {
      const form = {
        oldPin: this.$options.filters?.encryptPassword(this.form.oldPin),
        newPin: this.$options.filters?.encryptPassword(this.form.newPin),
        verificationCode: this.form.verificationCode,
        pinEnabled: 1,
        type: 'email'
      }
      await api
        .changePin(form)
        .then(() => {
          let message: any = this.$t('changePin.changePinSuccess')
          this.$message.success(message)
          this.handleClose()
          this.$emit('apply')
        })
        .catch(error => {
          console.log(error)
        })
    }
    numberFormat(event: FocusEvent): void {
      const _event: any = event
      let fnumber = _event.target.value
      if (!isNaN(fnumber)) {
        _event.target.value = fnumber
      } else {
        _event.target.value = ''
      }
    }
    handleResendCode(): void {
      this.debounceFilter('handleResendCode')
    }
    async resendCode(): Promise<void> {
      const data = {
        type: 'EMAIL',
        reason: 'FOR_CHANGE_PIN'
      }
      api
        .genCode(data)
        .then(() => {
          let message: any = this.$t('verified.resendCodeMess')
          this.$message.success(message)
        })
        .catch(() => {
          let message: any = this.$t('notify.user-blocked-resend-code')
          this.$message.error(message)
        })
    }
  }
</script>
<style scoped lang="scss">
  .popup-change-pin {
    .re-send-code {
      color: var(--bc-btn-bg-default-hover);
      cursor: pointer;
    }
    .input-password {
      position: relative;
    }
    .icon-show-password {
      cursor: pointer;
      position: absolute;
      top: 3px;
      right: 14px;
      .span-icon {
        color: var(--bc-color-grey90);
      }
    }
    .content {
      padding-bottom: 24px;
      .error {
        color: var(--bc-required);
        font-size: 12px;
        margin-top: -10px;
      }
      .label {
        margin-top: 24px;
        color: var(--bc-text-primary);
        font-weight: 400;
        font-size: 14px;
      }
      .label-top {
        margin-top: 0px;
      }
      .box-input {
        margin-top: 8px;
        height: 48px;
      }
      .input-password {
        position: relative;
      }
      .line {
        margin-top: 24px;
        border-top: 1px solid var(--bc-btn-border);
      }
      .big-title {
        margin-top: 24px;
        color: var(--bc-text-primary);
        font-weight: 600;
        font-size: 24px;
        word-break: break-word;
        text-align: center;
      }
      .box-input-authentication {
        margin-top: 24px;
        min-height: 80px;
        width: 100%;
        display: flex;
        .box-icon {
          width: 80px;
          height: 80px;
          background: var(--bc-color-grey20);
          border-radius: 8px;
          margin-right: 8px;
          text-align: center;
          line-height: 80px;
        }
        .box-right {
          span {
            display: block;
            color: var(--bc-text-discript);
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 8px;
          }
          .el-form-item {
            margin-bottom: 0px;
          }
        }
      }
      .discription {
        margin-top: 24px;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        color: var(--bc-text-discript);
        a {
          color: var(--bc-btn-bg-default-hover);
          text-decoration: none;
        }
      }
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn-action {
        width: 100px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
        border-radius: 6px;
        &:hover {
          color: var(--bc-btn-default-text-hover);
          border: 1px solid var(--bc-btn-default-border-hover);
        }
      }
      .btn-close {
        background: var(--bc-color-white);
        border: 1px solid var(--bc-color-grey50);
        color: var(--bc-color-grey150);
        margin-right: 16px;
        &:hover {
          border-color: var(--bc-btn-default-border-hover);
          background: var(--bc-btn-default-text-hover);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .btn-submit {
        color: var(--bc-color-white);
        background: var(--bc-theme-primary-gradient);
        border: none;
        &:hover {
          border: none;
          color: var(--bc-color-white);
          background: var(--bc-theme-primary-gradient-hover) !important;
        }
      }
    }
  }
</style>
