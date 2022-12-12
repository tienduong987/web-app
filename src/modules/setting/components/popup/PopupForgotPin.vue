<template>
  <base-popup name="popup-forgot-pin" class="popup-forgot-pin" :close="handleClose" width="480px">
    <div slot="title">
      <span>{{ title ? $t('forgotPin.title2') : $t('forgotPin.title') }}</span>
    </div>
    <div class="content">
      <el-form class="form-forgot-pin" ref="forgotPin" :rules="rules" :model="form">
        <div class="label label-top">{{ $t('forgotPin.label1') }}</div>
        <el-form-item prop="pin" class="box-input">
          <el-input type="password" v-model="form.pin" :placeholder="$t('forgotPin.label1')" maxlength="4" @keyup.native="numberFormat($event)"></el-input>
        </el-form-item>
        <div class="label">{{ $t('forgotPin.label2') }}</div>
        <el-form-item prop="confirmPin" class="box-input">
          <el-input type="password" v-model="form.confirmPin" :placeholder="$t('forgotPin.label2')" maxlength="4" @keyup.native="numberFormat($event)"></el-input>
          <div v-if="error" class="error">{{ $t('forgotPin.errorPin') }}</div>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="footer">
      <div @click="handleCancel" class="btn-action btn-close">{{ $t('forgotPin.cancel') }}</div>
      <div @click="handleSubmit" class="btn-action btn-submit">{{ title ? $t('forgotPin.reset2') : $t('forgotPin.reset') }}</div>
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
  export default class PopupForgotPin extends Mixins(PopupMixin) {
    @Prop() dataCode!: string
    @Prop() title!: string
    @Prop() valuePin!: boolean
    form: Record<string, any> = {
      pin: '',
      confirmPin: '',
      verificationCode: '',
      pinEnabled: 1,
      type: 'EMAIL'
    }
    error = false
    rules: any = {
      pin: [
        {
          required: true,
          message: this.$t('forgotPin.wrong-newPin'),
          trigger: 'blur'
        },
        {
          len: 4,
          message: this.$t('forgotPin.error-length'),
          trigger: 'blur'
        }
      ],
      confirmPin: [
        {
          required: true,
          message: this.$t('forgotPin.wrong-confirmPin'),
          trigger: 'blur'
        },
        {
          len: 4,
          message: this.$t('forgotPin.error-length'),
          trigger: 'blur'
        }
      ],
      verificationCode: [
        {
          required: true,
          message: this.$t('forgotPin.wrong-code'),
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
    @Watch('form.confirmPin') watchConfirmPassword(pass: string): void {
      if (pass.length > 0 && this.form.pin !== pass) {
        this.error = true
      } else {
        this.error = false
      }
    }
    handleReset(): void {
      this.form = {
        pin: '',
        confirmPin: '',
        verificationCode: '',
        pinEnabled: 1,
        type: 'EMAIL'
      }
      this.error = false
      if (this.$refs.forgotPin) {
        //@ts-ignore
        this.$refs.forgotPin.clearValidate()
      }
    }

    handleCancel(): void {
      this.setOpenPopup({
        popupName: 'popup-forgot-pin',
        isOpen: false
      })
    }
    handleClose(): void {
      this.handleReset()
      if (this.nextValuePin == 0) {
        this.$emit('reloadValuePin', !this.valuePin)
      }
    }
    validateForm(): boolean {
      let forgotPin: any = this.$refs.forgotPin
      let valid = false
      forgotPin.validate((_valid: boolean) => {
        valid = _valid
      })
      return valid
    }
    // debounce chan doble click
    debounceFilter = debounce((nameAction: any) => {
      if (nameAction == 'handleSubmit') {
        this.submit()
      }
    }, 400)
    async handleSubmit(): Promise<void> {
      const valid = this.validateForm()
      this.form.verificationCode = this.dataCode
      if (valid && !this.error) {
        this.debounceFilter('handleSubmit')
      }
    }
    async submit(): Promise<void> {
      const pin = this.$options.filters?.encryptPassword(this.form.pin)
      await api
        .onPin({ ...this.form, pin: pin, confirmPin: '' })
        .then(() => {
          this.nextValuePin = 1
          let message: any = this.$t('changePin.changePinSuccess')
          this.$message.success(message)
          this.$emit('reloadPin')
          this.setOpenPopup({
            popupName: 'popup-forgot-pin',
            isOpen: false
          })
        })
        .catch(() => {
          let message: any = this.$t('changePin.errorOldPin')
          this.$message.error(message)
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
  }
</script>
<style scoped lang="scss">
  .popup-forgot-pin {
    .content {
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
