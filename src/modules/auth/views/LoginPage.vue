<template>
  <div class="bc-login">
    <header-login />
    <div class="form">
      <el-form class="form-item" v-if="$route.name === 'login'" :model="form" :rules="rules" ref="form-login">
        <div class="text-3xl text-semibold text-center mb-2 title-form">{{ $t('login.title-form') }}</div>
        <el-form-item prop="email">
          <el-input placeholder="Email" type="email" v-model="form.email" />
        </el-form-item>
        <el-form-item prop="password" class="input-password">
          <el-input class="input-password" :type="showPass == true ? 'text' : 'password'" :placeholder="$t('login.placeholder.password')" v-model="form.password" />
          <span class="icon-show-password" @click="showPass = !showPass">
            <base-icon :icon="showPass == true ? 'icon-eye-off' : 'icon-eye'" size="22" />
          </span>
        </el-form-item>
        <div class="be-flex jc-space-between w-100 mt-2">
          <el-checkbox v-model="remember"
            ><span class="text-base" style="color: #201f1e; font-weight: 400; margin-left: -2px">{{ $t('login.remember') }}</span></el-checkbox
          >
          <span @click="handleForgotPass" class="text-base text-hyperlink cursor">{{ $t('login.forgot') }}</span>
        </div>
        <div class="captcha be-flex jc-space-center mt-2" v-if="urlSystem && urlSystem['api.auto.test'] !== '1'">
          <vue-recaptcha ref="recaptcha" :loadRecaptchaScript="true" :language="language" :sitekey="siteKey" @verify="verifyCaptcha" @expired="expiredCaptcha"></vue-recaptcha>
        </div>
        <el-button :loading="isLoading" :class="getDisableBtn ? 'btn--disabled' : null" class="btn w-100 is-none-border cursor" @click="handleLogin"
          >{{ $t('login.title-form') }}
        </el-button>
        <!-- <button :class="getDisableBtn ? 'btn--disabled' : null" type="button" class="btn is-none-border w-100 cursor" @click="handleLogin">{{ $t('login.title-form') }}</button> -->
        <div class="text-base be-flex jc-space-center" style="color: #201f1e">
          {{ $t('login.question') }} &nbsp;<span @click="handleSignUp" class="text-hyperlink text-semibold cursor"> {{ $t('login.sign-up') }} </span>
        </div>
      </el-form>
      <verify-page v-else class="form-item" ref="verify" />
    </div>
    <!-- <language :isReload="$route.name === 'login' ? true : false" @changeLanguage="handleChangeLanguage" /> -->
  </div>
</template>

<script lang="ts">
  import VueRecaptcha from 'vue-recaptcha'
  import HeaderLogin from '../components/HeaderLogin.vue'
  import Language from '../components/Language.vue'
  import VerifyPage from './Verify.vue'
  import getRepository from '@/services'
  import { AuthRepository } from '@/services/repositories/auth'
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const bcAuth = namespace('beAuth')
  const beBase = namespace('beBase')

  const apiAuth: AuthRepository = getRepository('auth')

  interface FormLogin {
    email: string
    password: string
  }

  @Component({ components: { VueRecaptcha, HeaderLogin, VerifyPage, Language } })
  export default class LoginPage extends Vue {
    @bcAuth.Action('login') login!: (data: Record<string, any>) => Promise<void>
    @beBase.State('siteKey') siteKey!: string
    @beBase.State('urlSystem') urlSystem!: Record<string, any>

    showPass = false
    language = 'en'
    // siteKey = '6LcbbKAcAAAAAGS9BixBvH4okIBVNsY7lywPDleX'
    form: FormLogin = {
      email: '',
      password: ''
    }
    remember = false
    isVerifyCaptcha = false
    captcha = ''
    isLoading = false
    optionLanguage: Array<Record<string, any>> = [
      {
        id: 1,
        lang: 'en'
      },
      {
        id: 2,
        lang: 'vi'
      }
    ]

    rules: Record<string, any> = {
      email: [
        {
          required: true,
          message: this.$t('login.wrong-email'),
          trigger: 'blur'
        },
        { type: 'email', message: this.$t('login.wrong-email-type'), trigger: 'blur' }
      ],
      password: [
        {
          required: true,
          message: this.$t('login.wrong-password'),
          trigger: 'blur'
        }
      ]
    }
    created(): void {
      this.language = window.localStorage.getItem('bc-lang')!
    }

    get getDisableBtn(): boolean {
      if (this.urlSystem && this.urlSystem['api.auto.test'] !== '1') {
        return !(this.form.email && this.form.password && this.isVerifyCaptcha)
      }
      return !(this.form.email && this.form.password)
    }

    verifyCaptcha(captcha: string): void {
      this.captcha = captcha
      this.isVerifyCaptcha = true
    }
    expiredCaptcha(): void {
      this.isVerifyCaptcha = false
    }

    handleSignUp(): void {
      this.$router.push({ name: 'sign-up' })
    }
    handleForgotPass(): void {
      this.$router.push({ name: 'forgot-password' })
    }
    handleChangeLanguage(): void {
      //@ts-ignore
      this.$refs['verify']?.clearValidate()
    }

    /**
     * * Luồng login: validate => verify => home
     */

    handleLogin(): void {
      if (this.getDisableBtn) {
        return
      }
      //@ts-ignore
      this.$refs['form-login']?.validate(async valid => {
        if (valid) {
          try {
            let message: any = ''
            this.isLoading = true
            //get 2FA
            // const res = await apiAuth.get2FA({ email: this.form.email }, this.captcha)
            // const type = res
            const encodePass = this.$options.filters?.encryptPassword(this.form.password)

            const res = await apiAuth.validateUser({ ...this.form, password: encodePass }, this.captcha)
            const type = res
            const nameRoute = type.type === 'EMAIL' ? 'verify-email' : type.type === 'SMS' ? 'verify-phone' : 'verify-app'

            if (!res.emailVerified && !res.phoneVerified) {
              try {
                // await apiAuth.resendCode({ email: this.form.email })
                this.$router.push({ name: 'verify-email', query: { type: 'EMAIL', email: this.form.email, reason: 'SIGN_UP' } })
                message = this.$t('notify.send-code')
                this.$message.success({ message, duration: 5000 })
              } catch (error) {
                message = this.$t('notify.send-code-fail')
                this.$message.error({ message, duration: 5000 })
              }
            }

            if (res.emailVerified && !res.phoneVerified) {
              console.log('1')

              this.$router.push({ name: 'verify-phone-number', query: { email: this.form.email } })
            }

            //send code
            if (res.emailVerified && res.phoneVerified && (type.type === 'EMAIL' || type.type === 'SMS')) {
              try {
                // await apiAuth.resendCode({ email: this.form.email })
                this.$router.push({ name: nameRoute, query: { type: type.type, email: this.form.email, pass: encodePass, reason: 'REQUEST_LOGIN' } })
                message = this.$t('notify.send-code')
                this.$message.success({ message, duration: 5000 })
              } catch (error) {
                message = this.$t('notify.send-code-fail')
                this.$message.error({ message, duration: 5000 })
              }
            }
            if (res.emailVerified && res.phoneVerified && type.type === 'APP') {
              this.$router.push({ name: nameRoute, query: { type: type.type, email: this.form.email, pass: encodePass, reason: 'REQUEST_LOGIN' } })
            }

            if (type.type === 'NONE') {
              this.login({ ...this.form, password: encodePass }).then(() => {
                this.$router.push({ name: 'CrowdSale' })
                message = this.$t('notify.login-success')
                this.$message.success({ message, duration: 5000 })
              })
            }

            this.isLoading = false
          } catch (error: any) {
            this.isLoading = false
            const { data } = error.response
            if (data.status === 'INVALID_CAPTCHA') {
              //@ts-ignore
              this.$refs['recaptcha'].reset()
              this.isVerifyCaptcha = false
            }
          }
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .bc-login {
    background-color: #f6f8fc;
    min-height: 100vh;
    @media screen and (max-height: 700px) {
      padding-bottom: 20px;
      height: auto;
    }
    .form {
      max-width: 512px;
      margin: 40px auto 0;
      box-shadow: 0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);
      border-radius: 8px;
      background-color: var(--bc-bg-white);

      .form-item {
        padding: 30px 24px;
        .title-form {
          color: #201f1e;
        }
      }

      .btn {
        padding: 12px 0 !important;
        font-size: 16px !important;
        line-height: 24px !important;
        margin: 24px 0 !important;
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
    }
  }
  @media (max-width: 600px) {
    .bc-login {
      .form {
        margin-right: 20px;
        margin-left: 20px;
      }
    }
  }
</style>
