<template>
  <div class="bc-login">
    <el-dialog title="Mua token" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <!-- <span>This is a message</span> -->
      <el-input placeholder="Nhập số token muốn mua" v-model="numberToken"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" @click="testSendTransaction">Thanh toán</el-button>
      </span>
    </el-dialog>
    <header-login />
    <div class="form">
      <el-form class="form-item" :model="form" :rules="rules" ref="form-signup">
        <button type="button" class="btn is-none-border w-100 cursor" @click="handleConnectMetamask">Connect</button>
        <!-- <button type="button" class="btn is-none-border w-100 cursor" @click="testSendTransaction">Send Eth</button> -->
        <button type="button" class="btn is-none-border w-100 cursor" @click="handleOpenDialog">Mua Token</button>
      </el-form>
      <!-- <verify-page v-else class="form-item" /> -->
    </div>
    <div class="text-center mt-2 language">
      <el-select v-model="selectLanguage" @change="handleChangeLanguage">
        <el-option :label="`${$t('login.en')}`" value="en">
          <template>
            <div class="be-flex flag">
              <base-icon icon="flag-usa" />
              <span>{{ $t('login.en') }}</span>
            </div>
          </template>
        </el-option>
        <el-option :label="`${$t('login.vi')}`" value="vi">
          <template>
            <div class="be-flex flag">
              <base-icon icon="flag-vn" size="20" />
              <span>{{ $t('login.vi') }}</span>
            </div>
          </template>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
  import VueRecaptcha from 'vue-recaptcha'
  import HeaderLogin from '../components/HeaderLogin.vue'
  import VerifyPage from './Verify.vue'
  import { Component, Vue } from 'vue-property-decorator'

  import Web3 from 'web3'
  import Web3Modal from 'web3modal'
  import WalletConnectProvider from '@walletconnect/web3-provider'
  import Fortmatic from 'fortmatic'
  // import Qrcode from 'v-qrcode'
  interface FormLogin {
    email: string | boolean
    password: string | boolean
  }

  @Component({ components: { VueRecaptcha, HeaderLogin, VerifyPage } })
  export default class LoginPage extends Vue {
    language = 'en'
    siteKey = '6LfA7qkcAAAAAG7aA8BvQnBwrjayDeNhzHIxfAh1'
    form: FormLogin = {
      email: '',
      password: ''
    }
    numberToken = null
    dialogVisible = false
    provider: any = null
    qrCls = 'qrcode'
    levelL = 'H'
    qrText = 'ahihih'
    qrValue = 'My secret value'
    name = 'HelloWorld'
    remember = false
    selectLanguage = ''
    isVerifyCaptcha = false
    handleClose(): void {
      this.dialogVisible = false
    }
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
        }
      ],
      password: [
        {
          required: true,
          message: this.$t('login.wrong-password'),
          trigger: 'blur'
        }
      ]
    }
    handleOpenDialog(): void {
      this.numberToken = null
      this.dialogVisible = true
    }
    created(): void {
      this.language = window.localStorage.getItem('bc-lang')!
      this.selectLanguage = this.language
    }
    handleChangeLanguage(lang: string): void {
      this.$i18n.locale = lang
      window.localStorage.setItem('bc-lang', lang)
      location.reload()
    }

    verifyCaptcha(): void {
      this.isVerifyCaptcha = true
    }
    handleSignUp(): void {
      this.$router.push({ name: 'sign-up' })
    }
    handleLoginForm(): void {
      this.$router.push({ name: 'login' })
    }
    async testSendTransaction(): Promise<any> {
      const { ethereum } = window
      ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: this.getAccount[0],
              to: '0xe98d6A61Ae6490dAbC5b473C25513DcA8B1365EC',
              value: '100000000000000'
              // gasPrice: '0x09184e72a000',
              // gas: '0x2710'
            }
          ]
        })
        .then(txHash => console.log('tx', txHash))
        .catch(error => console.error)
      // console.log('a')
    }
    mounted(): void {
      this.handleConnectMetamask
      // console.log('account', this.getAccount)
    }
    getAccount: any = ''
    async handleConnectMetamask(): Promise<any> {
      // const WalletConnectProvider = window.WalletConnectProvider.default
      // const EvmChains = window.EvmChains
      // const Fortmatic = window.Fortmatic
      const providerOptions = {
        // Example with injected providers
        // injected: {
        //   display: {
        //     logo: 'data:image/gif;base64,INSERT_BASE64_STRING',
        //     name: 'Injected',
        //     description: 'Connect with the provider in your Browser'
        //   },
        //   package: null
        // },
        // // Example with WalletConnect provider
        // walletconnect: {
        //   display: {
        //     logo: 'data:image/gif;base64,INSERT_BASE64_STRING',
        //     name: 'Mobile',
        //     description: 'Scan qrcode with your mobile wallet'
        //   },
        //   package: WalletConnectProvider,
        //   options: {
        //     infuraId: 'id' // required
        //   }
        // }
      }
      const web3Modal = new Web3Modal({
        network: 'mainnet', // optional
        cacheProvider: true, // optional
        providerOptions // required
      })
      this.provider = await web3Modal.connect()
      const web3 = new Web3(this.provider)
      const networkId = await web3.eth.net.getId()
      const account = await web3.eth.getAccounts()
      this.getAccount = await web3.eth.getAccounts()
      // alert(`address is: ${account}`)
      console.log('netId', networkId)
    }
    handleLogin(): void {
      //@ts-ignore
      this.$refs['form-signup']?.validate(valid => {
        if (valid && this.isVerifyCaptcha) {
          this.$router.push({ name: 'verify-phone' })
        } else {
          this.$message.error('Vui lòng xác minh captcha')
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .bc-login {
    background-color: #f6f8fc;
    height: 100vh;
    .textButton {
      font-size: 16px;
      padding-top: 1px;
    }
    .form {
      width: 512px;
      margin: 40px auto 0;
      box-shadow: 0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);
      border-radius: 8px;
      background-color: var(--bc-bg-white);

      .form-item {
        padding: 30px 24px;
      }

      .btn {
        padding: 14px 0;
        font-size: 16px;
        line-height: 24px;
        margin: 24px 0;
      }
    }
  }
</style>
