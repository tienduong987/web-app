<template>
  <base-popup name="popup-verification" class="popup-verification" width="480px" :open="handleOpen" :close="handleClose" :isShowFooter="false">
    <div slot="title">
      <span>{{ $t('verification.title') }}</span>
    </div>
    <div class="content">
      <el-form class="form-verification" ref="dataInput" :model="dataInput" :rules="rules">
        <div class="big-title">{{ $t('verification.bigTitle') }}</div>
        <div class="label" style="margin-top: 0px">{{ $t('verification.label1') }}</div>
        <el-form-item prop="verificationCodeOldPhone" class="input-phone1">
          <el-input v-model="dataInput.verificationCodeOldPhone" :placeholder="$t('verification.placeholder')"></el-input>
          <div class="btn-resend-code1" @click="handleResendCode('old')">{{ $t('verification.sendCode') }}</div>
        </el-form-item>
        <div class="label">{{ $t('verification.label2') }}</div>
        <el-form-item prop="verificationCodeNewPhone" class="input-phone2">
          <el-input v-model="dataInput.verificationCodeNewPhone" :placeholder="$t('verification.placeholder')"></el-input>
          <div class="btn-resend-code2" @click="handleResendCode('new')">{{ $t('verification.sendCode') }}</div>
        </el-form-item>
      </el-form>
      <div @click="handleSubmit" class="btn-action btn-submit">{{ $t('verification.submit') }}</div>
    </div>
  </base-popup>
</template>
<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  import { SettingRepository } from '@/services/repositories/setting'
  import { debounce } from 'lodash'
  interface IListCountry {
    name: string
    dialCode: string
    isoCode: string
    flag: string
  }
  const api: SettingRepository = getRepository('setting')
  @Component({ components: {} })
  export default class PopupVerification extends Mixins(PopupMixin) {
    @Prop() stage!: Record<string, any>
    dataInput: any = {
      verificationCodeOldPhone: '',
      verificationCodeNewPhone: '',
      countryCode: '',
      country: '',
      newPhone: ''
    }
    rules: any = {
      verificationCodeOldPhone: [
        {
          required: true,
          message: this.$t('verification.wrong-oldPhone'),
          trigger: 'blur'
        },
        {
          len: 6,
          message: this.$t('changePassword.errorLengthVerificationCode'),
          trigger: 'blur'
        }
      ],
      verificationCodeNewPhone: [
        {
          required: true,
          message: this.$t('verification.wrong-newPhone'),
          trigger: 'blur'
        },
        {
          len: 6,
          message: this.$t('changePassword.errorLengthVerificationCode'),
          trigger: 'blur'
        }
      ]
    }
    handleReset(): void {
      this.dataInput = {
        verificationCodeOldPhone: '',
        verificationCodeNewPhone: '',
        countryCode: '',
        country: '',
        newPhone: ''
      }
      if (this.$refs.dataInput) {
        //@ts-ignore
        this.$refs.dataInput.clearValidate()
      }
    }
    validateForm(): boolean {
      let formInput: any = this.$refs.dataInput
      let valid = false
      formInput.validate((_valid: boolean) => {
        valid = _valid
      })
      return valid
    }
    handleOpen(): void {
      this.dataInput.countryCode = this.stage.countryCode
      this.dataInput.country = this.stage.country
      this.dataInput.newPhone = this.stage.newPhone
    }
    handleClose(): void {
      this.handleReset()
      this.setOpenPopup({
        popupName: 'popup-verification',
        isOpen: false
      })
    }
    // debounce chan doble click
    debounceFilter = debounce((nameAction: any) => {
      if (nameAction == 'handleSubmit') {
        this.submit()
      }
    }, 400)
    async handleSubmit(): Promise<void> {
      const valid = this.validateForm()
      if (valid) {
        this.debounceFilter('handleSubmit')
      }
    }
    async submit(): Promise<void> {
      await api
        .changePhoneVerification(this.dataInput)
        .then(() => {
          let message: any = this.$t('notify.verify-success')
          this.$message.success(message)
          this.$emit('apply')
          this.handleClose()
        })
        .catch(error => {
          console.log(error)
        })
    }
    async handleResendCode(string: string): Promise<void> {
      if (string) {
        const params = {
          resendCode: string
        }
        api
          .changePhone(this.stage, params)
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
  .popup-verification {
    .content {
      padding-bottom: 24px;
      .label {
        margin-top: 24px !important;
        color: var(--bc-text-primary);
        font-size: 14px;
        font-weight: 400;
      }
      .big-title {
        text-align: center;
        font-weight: 600;
        font-size: 24px;
        color: var(--bc-text-primary);
        word-break: break-word;
      }
      .form-verification {
        .input-phone1,
        .input-phone2 {
          position: relative;
        }
        .btn-resend-code1,
        .btn-resend-code2 {
          position: absolute;
          top: 11px;
          right: 10px;
          color: var(--bc-btn-bg-default-hover);
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .btn-action {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      font-weight: 400;
      cursor: pointer;
      border-radius: 6px;
    }
    .btn-submit {
      color: var(--bc-color-white);
      background: var(--bc-theme-primary-gradient);
      &:hover {
        border: none;
        color: var(--bc-color-white);
        background: var(--bc-theme-primary-gradient-hover) !important;
      }
    }
  }
</style>
