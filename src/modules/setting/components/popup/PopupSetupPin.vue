<template>
  <base-popup name="popup-setup-pin" class="popup-setup-pin" width="480px" :close="handleClose" :open="handleOpen">
    <div slot="title">
      <span>{{ $t('setupPin.title') }}</span>
    </div>
    <div class="content">
      <el-form class="form-setup-pin" ref="setupPin" :rules="rules" :model="form">
        <div class="label label-top">{{ $t('setupPin.label1') }}</div>
        <el-form-item prop="newPin" class="box-input">
          <el-input type="password" v-model="form.newPin" :placeholder="$t('setupPin.label1')" maxlength="4" @keyup.native="numberFormat($event)"></el-input>
        </el-form-item>
        <div class="label">{{ $t('setupPin.label2') }}</div>
        <el-form-item prop="confirmPin" class="box-input">
          <el-input type="password" v-model="form.confirmPin" :placeholder="$t('setupPin.label2')" maxlength="4" @keyup.native="numberFormat($event)"></el-input>
          <div v-if="error" class="error">{{ $t('setupPin.errorPin') }}</div>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="footer">
      <div @click="handleClose" class="btn-action btn-close">{{ $t('setupPin.cancel') }}</div>
      <div @click="handleSubmit" class="btn-action btn-submit">{{ $t('setupPin.reset') }}</div>
    </div>
  </base-popup>
</template>
<script lang="ts">
  import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  import { SettingRepository } from '@/services/repositories/setting'
  const api: SettingRepository = getRepository('setting')
  @Component({ components: {} })
  export default class PopupSetupPin extends Mixins(PopupMixin) {
    @Prop() dataCode!: string
    form: Record<string, any> = {
      newPin: '',
      confirmPin: ''
    }
    error = false
    rules: any = {
      newPin: [
        {
          required: true,
          message: this.$t('setupPin.wrong-newPin'),
          trigger: 'blur'
        },
        {
          len: 4,
          message: this.$t('setupPin.error-length'),
          trigger: 'blur'
        }
      ],
      confirmPin: [
        {
          required: true,
          message: this.$t('setupPin.wrong-confirmPin'),
          trigger: 'blur'
        },
        {
          len: 4,
          message: this.$t('setupPin.error-length'),
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
        newPin: '',
        confirmPin: ''
      }
      this.error = false
      if (this.$refs.setupPin) {
        //@ts-ignore
        this.$refs.setupPin.clearValidate()
      }
    }
    handleOpen(): void {
      console.log('open')
    }
    handleClose(): void {
      this.handleReset()
      this.setOpenPopup({
        popupName: 'popup-setup-pin',
        isOpen: false
      })
    }
    validateForm(): boolean {
      let setupPin: any = this.$refs.setupPin
      let valid = false
      setupPin.validate((_valid: boolean) => {
        valid = _valid
      })
      return valid
    }
    async handleSubmit(): Promise<void> {
      const valid = this.validateForm()
      if (valid && !this.error) {
        const data = {
          pin: this.form.newPin,
          verificationCode: this.dataCode,
          pinEnabled: 1
        }
        await api.onPin(data).then(() => {
          this.$emit('apply')
          this.handleClose()
        })
      }
    }
    numberFormat(event: FocusEvent): void {
      const _event: any = event
      let fnumber = _event.target.value
      if (!isNaN(parseInt(fnumber))) {
        _event.target.value = parseInt(fnumber)
      } else {
        _event.target.value = ''
      }
    }
  }
</script>
<style lang="scss" scoped>
  .popup-setup-pin {
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
