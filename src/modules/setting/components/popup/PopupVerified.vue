<template>
  <base-popup name="popup-verified" class="popup-verified" width="480px" :open="handleOpen" :close="handleClose" :isShowFooter="false">
    <div slot="title">
      <span>{{ $t('verified.titlePopup') }}</span>
    </div>
    <div class="content">
      <el-form class="form-verified" ref="verified" :rules="rules" :model="form" @submit.prevent.native="checkEnter">
        <div v-if="action && action == 'APP' && type != 'popup-forgot-pin' && type != 'popup-forgot-pin2' && type != 'popup-setup-pin'" class="box-content-title">
          {{ $t('verified.titleContent') }}
        </div>
        <div v-if="action && action == 'SMS' && type != 'popup-forgot-pin' && type != 'popup-forgot-pin2' && type != 'popup-setup-pin'" class="box-content-title">
          {{ $t('verified.titleContent2') }}
        </div>
        <div v-if="(action && action == 'EMAIL') || type == 'popup-forgot-pin' || type == 'popup-forgot-pin2' || type == 'popup-setup-pin'" class="box-content-title">
          {{ $t('verified.titleContent3') }}
        </div>
        <div class="box-input">
          <div class="box-icon">
            <base-icon
              v-if="action && action == 'APP' && type != 'popup-forgot-pin' && type != 'popup-forgot-pin2' && type != 'popup-setup-pin'"
              icon="phone"
              size="50"
            ></base-icon>
            <base-icon
              v-if="action && action == 'SMS' && type != 'popup-forgot-pin' && type != 'popup-forgot-pin2' && type != 'popup-setup-pin'"
              icon="phoneSms"
              size="60"
            ></base-icon>
            <base-icon
              v-if="(action && action == 'EMAIL') || type == 'popup-forgot-pin' || type == 'popup-forgot-pin2' || type == 'popup-setup-pin'"
              icon="setting-email"
              size="40"
            ></base-icon>
          </div>
          <div class="box-right">
            <span>{{ $t('verified.miniTitle') }}</span>
            <el-form-item prop="code">
              <el-input v-model="form.code" :placeholder="$t('verified.placeholder')" maxlength="6"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="btn-submit" @click="handleSubmit">{{ $t('verified.submit') }}</div>
        <div v-if="action != 'APP' || type == 'popup-forgot-pin' || type == 'popup-forgot-pin2' || type == 'popup-setup-pin'" class="title-bottom">
          {{ $t('verified.contact') }} <span class="re-send-code" @click="handleResendCode">{{ $t('verified.resendCode') }}</span>
        </div>
      </el-form>
    </div>
  </base-popup>
</template>
<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  import { SettingRepository } from '@/services/repositories/setting'
  import { debounce } from 'lodash'
  const api: SettingRepository = getRepository('setting')
  @Component({ components: {} })
  export default class PopupVerified extends Mixins(PopupMixin) {
    @Prop() action!: any
    @Prop() type!: string
    @Prop() pin!: string
    @Prop() pinEnabled!: any
    @Prop() valuePin!: boolean
    @Prop() check2fa!: boolean
    form: Record<string, any> = {
      code: ''
    }
    rules: any = {
      code: [
        {
          required: true,
          message: this.$t('verified.wrong-verified'),
          trigger: 'blur'
        },
        {
          len: 6,
          message: this.$t('changePassword.errorLengthVerificationCode'),
          trigger: 'blur'
        }
      ]
    }
    nextValuePin = 0

    checkEnter(): void {
      this.handleSubmit()
    }

    handleReset(): void {
      this.form.code = ''
      if (this.$refs.verified) {
        //@ts-ignore
        this.$refs.verified.clearValidate()
      }
    }
    validateForm(): boolean {
      let verified: any = this.$refs.verified
      let valid = false
      verified.validate((_valid: boolean) => {
        valid = _valid
      })
      return valid
    }
    handleOpen(): void {
      console.log('open')
    }
    handleClose(): void {
      this.handleReset()
      if ((this.type == 'popup-setup-pin' && this.pin) || this.type == 'popup-forgot-pin') {
        if (this.nextValuePin == 0) {
          this.$emit('reloadValuePin', !this.valuePin)
        }
      }
      this.setOpenPopup({
        popupName: 'popup-verified',
        isOpen: false
      })
    }
    async handleSubmit(): Promise<void> {
      const valid = this.validateForm()
      if (valid) {
        this.debounceFilter('handleSubmit')
      }
    }
    async submit(): Promise<void> {
      if (this.type == this.action) {
        const data = {
          verificationCode: this.form.code
        }
        await api
          .changeAppDevice(data)
          .then((res: any) => {
            let message: any = this.$t('notify.verify-success')
            this.$message.success(message)
            this.$emit('openEnable', res)
            this.handleClose()
          })
          .catch(error => {
            console.log(error)
          })
      } else if (this.type == 'popup-setup-pin') {
        if (!this.pin) {
          const data = {
            verificationCode: this.form.code
          }
          await api.pinVerify(data).then((res: any) => {
            this.$emit('openPopup', res)
            this.handleClose()
          })
        } else {
          const data = {
            verificationCode: this.form.code,
            pinEnabled: 0
          }
          await api
            .onPin(data)
            .then(() => {
              this.nextValuePin = 1
              let message: any = this.$t('verified.changeStatusPinSuccess')
              this.$message.success(message)
              this.$emit('reloadPin')
              this.handleClose()
            })
            .catch((error: any) => {
              console.log(error)
            })
        }
      } else if (this.type == 'popup-forgot-pin' || this.type == 'popup-forgot-pin2') {
        const data = {
          verificationCode: this.form.code
        }
        await api.pinVerify(data).then((res: any) => {
          this.$emit('forGotPin', res)
          this.handleClose()
        })
      } else {
        const data = {
          email: this.$store.state.beAuth.user.email,
          type: this.type,
          verificationCode: this.form.code
        }
        await api
          .change2fa(data)
          .then((res: any) => {
            this.nextValuePin = 1
            let message: any = this.$t('notify.verify-success')
            this.$message.success(message)
            if (this.type == 'APP') {
              this.$emit('applyApp', res)
            } else {
              this.$emit('apply')
            }
            this.handleClose()
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
    //chan doble click
    debounceFilter = debounce((nameAction: any) => {
      if (nameAction == 'handleResendCode') {
        this.resendCode()
      }
      if (nameAction == 'handleSubmit') {
        this.submit()
      }
    }, 400)
    handleResendCode(): void {
      this.debounceFilter('handleResendCode')
    }
    resendCode(): void {
      if (this.type == 'NONE') {
        const data = {
          type: '',
          reason: 'FOR_TURNOFF_2FA',
          check2fa: this.check2fa
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
      } else {
        const data = {
          type: '',
          reason: 'FOR_CHANGE_2FA'
        }
        if (this.type == 'popup-forgot-pin' || this.type == 'popup-forgot-pin2' || this.type == 'popup-setup-pin') {
          data.type = 'EMAIL'
          if (this.type == 'popup-forgot-pin2') {
            data.reason = 'FOR_FORGOT_PIN'
          }
          if (this.type == 'popup-setup-pin' || this.type == 'popup-forgot-pin') {
            data.reason = ''
          }
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
  }
</script>
<style scoped lang="scss">
  .popup-verified {
    .re-send-code {
      color: var(--bc-btn-bg-default-hover);
      cursor: pointer;
    }
    .content {
      min-height: 232px;
      margin-bottom: 24px;
      .box-content-title {
        word-break: break-word;
        font-weight: 600;
        font-size: 24px;
        text-align: center;
        color: #0a0b0d;
        min-height: 64px;
        padding: 0px 40px;
      }
      .box-input {
        margin-top: 24px;
        min-height: 80px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .box-icon {
          width: 80px;
          height: 80px;
          background: #f3f2f1;
          border-radius: 8px;
          margin-right: 8px;
          text-align: center;
          line-height: 80px;
        }
        .box-right {
          span {
            display: block;
            color: #5b616e;
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 8px;
          }
          .el-form-item {
            margin-bottom: 0px;
          }
        }
      }
      .btn-submit {
        margin-top: 24px;
        height: 40px;
        border-radius: 6px;
        text-align: center;
        line-height: 40px;
        background: var(--bc-theme-primary-gradient);
        color: var(--bc-color-white);
        cursor: pointer;
        &:hover {
          border: none;
          color: var(--bc-color-white);
          background: var(--bc-theme-primary-gradient-hover) !important;
        }
      }
      .title-bottom {
        margin-top: 24px;
        text-align: center;
        font-weight: 600;
        font-size: 16px;
        color: #5b616e;
      }
    }
  }
</style>
