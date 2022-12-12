<template>
  <base-popup name="popup-change-password" class="popup-change-password" width="480px" :open="handleOpen" :close="handleClose">
    <div slot="title">
      <span>{{ $t('changePassword.title') }}</span>
    </div>
    <div class="content">
      <el-form class="form-change-password" ref="changePassword" :rules="rules" :model="form">
        <div class="label label-top">{{ $t('changePassword.label1') }}</div>
        <el-form-item prop="oldPass" class="box-input input-password">
          <el-input :type="showPass == true ? 'text' : 'password'" v-model="form.oldPass" :placeholder="$t('changePassword.label1')"></el-input>
          <span class="icon-show-password" @click="showPass = !showPass">
            <base-icon :icon="showPass == true ? 'icon-eye-off' : 'icon-eye'" size="22" />
          </span>
        </el-form-item>
        <div class="label" style="margin-bottom: 8px">{{ $t('changePassword.label2') }}</div>
        <el-form-item prop="newPass" class="input-password">
          <el-popover placement="right" width="auto" trigger="manual" v-model="visible" popper-class="popper-validate-password">
            <template>
              <div class="check-password">
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate && validate.length" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.length') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.lowercase" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.lowercase') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.uppercase" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.uppercase') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.number" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.number') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.specialCharacter" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.specialCharacter') }}</span>
                </div>
              </div>
            </template>
            <el-input type="password" slot="reference" v-model="form.newPass" :placeholder="$t('changePassword.label2')" @focus="visible = true" @blur="visible = false"></el-input>
          </el-popover>
          <div v-if="errorValidate && form.newPass.length > 0" class="error">{{ $t('changePassword.errorValidatePassword') }}</div>
        </el-form-item>
        <div class="label">{{ $t('changePassword.label3') }}</div>
        <!-- <el-form-item prop="confirmPassword" class="box-input">
          <el-input type="password" v-model="form.confirmPassword" :placeholder="$t('changePassword.label3')"></el-input>
          <div v-if="error" class="error">{{ $t('changePassword.errorPassword') }}</div>
        </el-form-item> -->
        <el-form-item prop="confirmPassword" class="input-password box-input">
          <el-popover placement="right" width="auto" trigger="manual" v-model="visible2" popper-class="popper-validate-password">
            <template>
              <div class="check-password">
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate2 && validate2.length" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.length') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate2.lowercase" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.lowercase') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate2.uppercase" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.uppercase') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate2.number" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.number') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate2.specialCharacter" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.specialCharacter') }}</span>
                </div>
              </div>
            </template>
            <el-input
              type="password"
              slot="reference"
              v-model="form.confirmPassword"
              :placeholder="$t('changePassword.label3')"
              @focus="visible2 = true"
              @blur="visible2 = false"
            ></el-input>
          </el-popover>
          <div v-if="!errorValidateConfirm && error" class="error">{{ $t('changePassword.errorPassword') }}</div>
          <div v-if="errorValidateConfirm && form.confirmPassword.length > 0" class="error">{{ $t('changePassword.errorValidatePassword') }}</div>
        </el-form-item>
        <div class="line"></div>
        <div class="big-title">{{ $t('verified.titleContent3') }}</div>
        <div class="box-input-authentication">
          <div class="box-icon">
            <base-icon icon="setting-email" size="40"></base-icon>
          </div>
          <div class="box-right">
            <span>{{ $t('changePassword.label4') }}</span>
            <el-form-item prop="verificationCode" style="width: 339px">
              <el-input v-model="form.verificationCode" :placeholder="$t('changePassword.placeholder')" maxlength="6"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="discription">
          {{ $t('changePassword.discription') }} <span class="re-send-code" @click="handleResendCode">{{ $t('changePassword.link') }}</span>
        </div>
      </el-form>
    </div>
    <div slot="footer" class="footer">
      <div @click="handleClose" class="btn-action btn-close">{{ $t('changePassword.cancel') }}</div>
      <div @click="handleSubmit" class="btn-action btn-submit">{{ $t('changePassword.confirm') }}</div>
    </div>
  </base-popup>
</template>
<script lang="ts">
  import { Component, Mixins, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  import { SettingRepository } from '@/services/repositories/setting'
  import { debounce } from 'lodash'

  import { namespace } from 'vuex-class'
  const bcAuth = namespace('beAuth')

  const api: SettingRepository = getRepository('setting')
  @Component({ components: {} })
  export default class PopupChangePassword extends Mixins(PopupMixin) {
    @bcAuth.Action('logout') logout!: (status: boolean) => Promise<void>

    form: Record<string, any> = {
      oldPass: '',
      newPass: '',
      confirmPassword: '',
      verificationCode: '',
      email: '',
      type: 'EMAIL'
    }
    error = false
    showPass = false
    errorValidate = false
    errorValidateConfirm = false
    rules: any = {
      oldPass: [
        {
          required: true,
          message: this.$t('changePassword.wrong-oldPassword'),
          trigger: 'change'
        }
      ],
      newPass: [
        {
          required: true,
          message: this.$t('changePassword.wrong-newPassword'),
          trigger: 'change'
        }
      ],
      confirmPassword: [
        {
          required: true,
          message: this.$t('changePassword.wrong-confirmPassword'),
          trigger: 'change'
        }
      ],
      verificationCode: [
        {
          required: true,
          message: this.$t('changePassword.wrong-code'),
          trigger: 'change'
        },
        {
          len: 6,
          message: this.$t('changePassword.errorLengthVerificationCode'),
          trigger: 'blur'
        }
      ]
    }
    //toptip
    visible = false
    visible2 = false
    regLow = /(?=.*[a-z])/g
    regUp = /(?=.*[A-Z])/g
    regNumber = /(?=.*[0-9])/g
    regSpecial = /(?=.*[!@#$%^&*()_=+{}:;"'/?><.,-])/g
    regLow2 = /(?=.*[a-z])/g
    regUp2 = /(?=.*[A-Z])/g
    regNumber2 = /(?=.*[0-9])/g
    regSpecial2 = /(?=.*[!@#$%^&*()_=+{}:;"'/?><.,-])/g
    validate: Record<string, boolean> = {
      length: false,
      number: false,
      uppercase: false,
      lowercase: false,
      specialCharacter: false
    }
    validate2: Record<string, boolean> = {
      length: false,
      number: false,
      uppercase: false,
      lowercase: false,
      specialCharacter: false
    }
    @Watch('form.newPass') watchPassword(pass: string): void {
      if (this.validate && pass) {
        this.validate.length = pass.length >= 8
      }
      this.validate.number = this.regNumber.test(pass)
      this.validate.uppercase = this.regUp.test(pass)
      this.validate.lowercase = this.regLow.test(pass)
      this.validate.specialCharacter = this.regSpecial.test(pass)
      const isValidatePass = Object.values(this.validate).every(item => item)
      if (!isValidatePass) {
        this.errorValidate = true
      } else {
        this.errorValidate = false
      }
    }
    @Watch('form.confirmPassword') watchConfirmPassword(pass: string): void {
      if (pass && pass.length > 0 && this.form.newPass !== pass) {
        this.error = true
      } else {
        this.error = false
      }
      if (this.validate2 && pass) {
        this.validate2.length = pass.length >= 8
      }
      this.validate2.number = this.regNumber2.test(pass)
      this.validate2.uppercase = this.regUp2.test(pass)
      this.validate2.lowercase = this.regLow2.test(pass)
      this.validate2.specialCharacter = this.regSpecial2.test(pass)
      const isValidateRePass = Object.values(this.validate2).every(item => item)
      if (!isValidateRePass) {
        this.errorValidateConfirm = true
      } else {
        this.errorValidateConfirm = false
      }
    }
    get getDisableBtn(): boolean {
      const isValidatePass = Object.values(this.validate).every(item => item)
      const isValidateRePass = Object.values(this.validate2).every(item => item)
      return !(isValidatePass && isValidateRePass)
    }
    //endtoptip
    handleReset(): void {
      this.form = {
        oldPass: '',
        newPass: '',
        confirmPassword: '',
        verificationCode: '',
        email: '',
        type: 'EMAIL'
      }
      this.showPass = false
      this.error = false
      this.errorValidate = false
      this.errorValidateConfirm = false
      if (this.$refs.changePassword) {
        //@ts-ignore
        this.$refs.changePassword.clearValidate()
      }
    }
    handleOpen(): void {
      if (this.$refs.changePassword) {
        //@ts-ignore
        this.$refs.changePassword.clearValidate()
      }
    }
    handleClose(): void {
      this.handleReset()
      this.setOpenPopup({
        popupName: 'popup-change-password',
        isOpen: false
      })
    }
    validateForm(): boolean {
      let changePassword: any = this.$refs.changePassword
      let valid = false
      changePassword.validate((_valid: boolean) => {
        valid = _valid
      })
      return valid
    }
    async handleSubmit(): Promise<void> {
      const valid = this.validateForm()
      if (valid && !this.error) {
        if (this.getDisableBtn) {
          return
        } else {
          this.debounceFilter('handleSubmit')
        }
      }
    }
    async handleChangePassword(): Promise<void> {
      const userId = this.$store.state.beAuth.user.userId
      this.form.email = this.$store.state.beAuth.user.email
      // ma hoa password
      const encodeOlfPass = this.$options.filters?.encryptPassword(this.form.oldPass)
      const encodeNewPass = this.$options.filters?.encryptPassword(this.form.newPass)
      const confirmPassword = this.$options.filters?.encryptPassword(this.form.confirmPassword)
      await api
        .changePassword({ ...this.form, oldPass: encodeOlfPass, newPass: encodeNewPass, confirmPassword: confirmPassword }, userId)
        .then(() => {
          let message: any = this.$t('notify.pass-reset')
          this.$message.success({ message, duration: 5000 })
          this.handleClose()
          setTimeout(() => {
            this.logout(false).then(() => {
              this.$router.push({ name: 'login' })
            })
          }, 1000)
        })
        .catch(error => {
          console.log(error)
        })
    }
    handleResendCode(): void {
      this.debounceFilter('handleResendCode')
    }
    // debounce chan doble click
    debounceFilter = debounce((nameAction: any) => {
      if (nameAction == 'handleResendCode') {
        this.resendCode()
      }
      if (nameAction == 'handleSubmit') {
        this.handleChangePassword()
      }
    }, 400)
    resendCode(): void {
      const data = {
        email: this.$store.state.beAuth.user.email,
        type: 'EMAIL',
        reason: 'PROFILE_RESET_PASSWORD'
      }
      api.resendCode(data).then(() => {
        let message: any = this.$t('verified.resendCodeMess')
        this.$message.success(message)
      })
    }
  }
</script>
<style scoped lang="scss">
  .popup-change-password {
    .re-send-code {
      color: var(--bc-btn-bg-default-hover);
      cursor: pointer;
    }
    .input-password {
      position: relative;
      .error {
        position: absolute;
        color: var(--bc-required);
        font-size: 12px;
        margin-top: -10px;
      }
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
        &:hover {
          background: var(--bc-theme-primary-gradient-hover) !important;
        }
      }
    }
  }
</style>
