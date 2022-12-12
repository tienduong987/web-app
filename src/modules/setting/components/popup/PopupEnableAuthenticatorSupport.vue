<template>
  <base-popup name="popup-enable-authenticator-support" class="popup-enable-authenticator-support" :open="handleOpen" :close="handleClose" width="480px">
    <div slot="title">
      <span>{{ $t('enableAuthenticator.title') }}</span>
    </div>
    <div class="content">
      <el-form class="form-enable-authenticator-support" ref="enableAuthenticator" :rules="rules" :model="form" @submit.prevent.native="handleSubmit">
        <div class="box-qr">
          <img v-if="!this.dataQR.qrUri" src="@/assets/images/qr-code.png" alt="" />
          <img v-if="this.dataQR.qrUri" :src="this.dataQR.qrUri" alt="" />
        </div>
        <div class="discript">
          <div class="dot"></div>
          <div class="box-title">
            {{ $t('enableAuthenticator.discript1') }}
            <a href="https://chrome.google.com/webstore/detail/authenticator/bhghoamapcdpbohphigoooaddinpkbai" target="_blank">{{ $t('enableAuthenticator.link') }}</a>
          </div>
        </div>
        <div class="discript">
          <div class="dot"></div>
          <div class="box-title">{{ $t('enableAuthenticator.discript2') }}</div>
        </div>
        <div class="line"></div>
        <div class="big-title">{{ $t('enableAuthenticator.bigTitle') }}</div>
        <div class="box-input">
          <div class="box-icon">
            <base-icon v-if="!action" icon="phone" size="50"></base-icon>
            <base-icon v-if="action && action == 'authen-phone'" icon="phoneSms" size="60"></base-icon>
            <base-icon v-if="action && action == 'authen-email'" icon="setting-email" size="40"></base-icon>
          </div>
          <div class="box-right">
            <span>{{ $t('verified.miniTitle') }}</span>
            <el-form-item prop="code">
              <el-input maxlength="6" v-model="form.code" :placeholder="$t('verified.placeholder')"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div slot="footer" class="footer">
      <div @click="handleCancel" class="btn-action btn-close">{{ $t('popupChangeNumberPhone.cancel') }}</div>
      <div @click="handleSubmit" class="btn-action btn-submit">{{ $t('verified.submit') }}</div>
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
  export default class PopupEnableAuthenticatorSupport extends Mixins(PopupMixin) {
    @Prop({ required: false, type: String, default: '' }) action!: string
    @Prop() dataQR!: Record<string, any>
    @Prop() type!: any
    form: Record<string, any> = {
      code: ''
    }
    rules: any = {
      code: [
        {
          required: true,
          message: this.$t('verified.wrong-verified'),
          trigger: 'blur'
        }
      ]
    }
    handleReset(): void {
      this.form.code = ''
      if (this.$refs.enableAuthenticator) {
        //@ts-ignore
        this.$refs.enableAuthenticator.clearValidate()
      }
    }
    validateForm(): boolean {
      let enableAuthenticator: any = this.$refs.enableAuthenticator
      let valid = false
      enableAuthenticator.validate((_valid: boolean) => {
        valid = _valid
      })
      return valid
    }
    handleOpen(): void {
      console.log('open')
    }
    handleClose(): void {
      this.handleReset()
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
      if (this.type == 'changeApp') {
        const data = {
          email: this.$store.state.beAuth.user.email,
          verificationCode: this.form.code,
          type: 'APP'
        }
        await api
          .change2faApp(data)
          .then(() => {
            let message: any = this.$t('notify.verify-success')
            this.$message.success(message)
            this.$emit('apply')
            this.setOpenPopup({
              popupName: 'popup-enable-authenticator-support',
              isOpen: false
            })
          })
          .catch((error: any) => {
            const { status } = error.response.data
            if (status === 'EXPIRED_VERIFICATION') {
              const message: any = this.$t('notify.qr-expired')
              this.$message.error({ message, duration: 5000 })
            }
            // const message: any = this.$t('notify.qr-expired')
          })
      } else {
        const data = {
          verificationCode: this.form.code
        }
        await api
          .changeAppDeviceVerify(data)
          .then(() => {
            let message: any = this.$t('notify.verify-success')
            this.$message.success(message)
            this.$emit('apply')
            this.setOpenPopup({
              popupName: 'popup-enable-authenticator-support',
              isOpen: false
            })
          })
          .catch(error => {
            const { status } = error.response.data

            if (status === 'EXPIRED_VERIFICATION') {
              const message: any = this.$t('notify.qr-expired')
              this.$message.error({ message, duration: 5000 })
            }
          })
      }
    }
    handleCancel(): void {
      this.setOpenPopup({
        popupName: 'popup-enable-authenticator-support',
        isOpen: false
      })
    }
  }
</script>
<style scoped lang="scss">
  .popup-enable-authenticator-support {
    .content {
      .form-enable-authenticator-support {
        .box-qr {
          text-align: center;
          img {
            width: 160px;
            height: 160px;
          }
        }
        .discript {
          margin-top: 24px;
          padding-left: 32px;
          position: relative;
          .dot {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #5b616e;
            border-radius: 50%;
            margin-right: 16px;
            top: 7px;
            left: 0px;
          }
          .box-title {
            color: #0a0b0d;
            font-size: 16px;
            font-weight: 400;
            word-break: break-word;
            a {
              color: blue;
              word-break: break-word;
            }
          }
        }
        .line {
          border: 1px solid #d2d0ce;
          margin-top: 24px;
        }
        .big-title {
          font-weight: 600;
          font-size: 24px;
          color: #0a0b0d;
          margin-top: 24px;
          word-break: break-word;
          text-align: center;
        }
        .box-input {
          margin-top: 24px;
          min-height: 80px;
          width: 100%;
          display: flex;
          margin-bottom: 24px;
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
            width: 100%;
            span {
              display: block;
              color: #5b616e;
              font-weight: 600;
              font-size: 16px;
              margin-bottom: 8px;
            }
          }
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
