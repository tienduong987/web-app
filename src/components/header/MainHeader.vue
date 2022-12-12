<template>
  <div class="header h-100">
    <div class="body h-100">
      <div class="content-left be-flex align-center">
        <div class="logo cursor content-left__item" style="display: inline-flex" @click="redirect">
          <!-- <base-icon v-if="coinMain === 'LYNK'" icon="logo-header" style="color: #9900cc; display: inline-flex" /> -->
          <div v-if="coinMain === 'LYNK' && !getLogo" style="display: inline-flex">
            <img src="@/assets/images/market/logo-purple.png" alt="" />
          </div>
          <div v-if="coinMain === 'LYNK' && getLogo" style="display: inline-flex" class="logo-main">
            <img src="@/assets/images/market/logo-white.png" alt="" />
          </div>
          <div v-if="coinMain === 'LYNK' && getLogo" style="display: inline-flex" class="logo-second">
            <img src="@/assets/images/market/logo-purple.png" alt="" />
          </div>
          <img v-if="coinMain === 'CLM'" src="../../icons/png/logo-clm.png" alt="" style="width: 160px; height: 48px; object-fit: contain" />
        </div>
        <div class="content-left__item text-base cursor menu content-none" @click="handleCommand('home')">
          <span :class="isActiveHome ? 'active' : null" v-if="$route.name != 'home'"> IDO</span>
          <el-dropdown trigger="hover" class="dropdown-menu" @command="handleCommand" v-else>
            <span class="el-dropdown-link" :class="isActiveHome ? 'active' : null">IDO<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown" class="dropdown-menu__content menu-ido">
              <!-- <el-dropdown-item>
                <p>{{ $t('leftMenu.tourism') }}</p>
              </el-dropdown-item> -->
              <el-dropdown-item>
                <ul class="menu-items">
                  <li class="menu-item">
                    <a class="menu-link" href="#ecosystem">{{ $t('menu.Ecosystem') }}<i class="sack-menu-effect"></i></a>
                  </li>
                  <li class="menu-item">
                    <a class="menu-link" href="#product">{{ $t('menu.Product') }}<i class="sack-menu-effect"></i></a>
                  </li>
                  <li class="menu-item">
                    <a class="menu-link" href="#tokenomics">{{ $t('menu.Token') }}<i class="sack-menu-effect"></i></a>
                  </li>
                  <li class="menu-item item-docs">
                    <a class="menu-link" href="#docs">{{ $t('menu.Docs') }}<i class="sack-menu-effect"></i></a>
                  </li>
                  <li class="menu-item">
                    <a class="menu-link" href="#roadmap">{{ $t('menu.Roadmap') }}<i class="sack-menu-effect"></i></a>
                  </li>

                  <li class="menu-item">
                    <a class="menu-link" href="#team">{{ $t('menu.Team') }}<i class="sack-menu-effect"></i></a>
                  </li>
                </ul>
              </el-dropdown-item>
              <!-- <el-dropdown-item>
                <p>{{ $t('leftMenu.entertainment') }}</p>
              </el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="content-left__item text-base cursor menu content-none">
          <el-dropdown trigger="hover" class="dropdown-menu" @command="handleCommand">
            <span class="el-dropdown-link">Marketplace<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown" class="dropdown-menu__content">
              <!-- <el-dropdown-item>
                <p>{{ $t('leftMenu.tourism') }}</p>
              </el-dropdown-item> -->
              <el-dropdown-item command="real-estate" :class="isActiveMenuEstate ? 'active' : null">
                <p>{{ $t('leftMenu.real-estate') }}</p>
              </el-dropdown-item>
              <!-- <el-dropdown-item>
                <p>{{ $t('leftMenu.entertainment') }}</p>
              </el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- <div class="content-left__item text-base cursor menu">
          <el-dropdown trigger="click" class="dropdown-menu">
            <span class="el-dropdown-link">Exchange<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown" class="dropdown-menu__content">
              <el-dropdown-item>
                <p>{{ $t('leftMenu.tourism') }}</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div> -->

        <!-- <div class="text-2xl title" style="color: ">{{ getTitle }}</div> -->
      </div>
      <div class="content-right align-center content-none">
        <div class="content">
          <router-link v-if="moduleConfig.Crowdsale && isLogin" :to="{ name: 'CrowdSale' }" class="router-header mr-24">
            <div class="wrap" @click="handleRedirectHome('CrowdSale')">
              <p class="text-base">{{ $t('leftMenu.crowdsale') }}</p>
            </div>
          </router-link>

          <router-link v-if="isLogin" :to="{ name: 'Wallet' }" class="router-header mr-24">
            <div class="wrap" @click="handleRedirectHome('Wallet')">
              <p class="text-base">{{ $t('leftMenu.wallet') }}</p>
            </div>
          </router-link>

          <!-- <router-link v-if="isLogin" :to="{ name: 'affiliate' }" class="router-header mr-24">
            <div class="wrap" @click="handleRedirectHome('Wallet')">
              <p class="text-base">{{ $t('leftMenu.order') }}</p>
            </div>
          </router-link> -->

          <div v-if="isLogin" class="line mr-24"></div>
          <span v-if="isLogin && !getLogo && !isActiveMenuAffiliate" @click="handleRedirect"> <base-icon icon="endow" size="24" class="cursor mr-24" /></span>
          <span v-if="isLogin && !getLogo && isActiveMenuAffiliate" @click="handleRedirect"> <base-icon icon="endow-active" size="26" class="cursor mr-24" /></span>
          <span v-if="isLogin && getLogo" @click="handleRedirect" class="icon-main"> <base-icon icon="endow-mk" size="24" class="cursor mr-24" /></span>
          <span v-if="isLogin && getLogo" @click="handleRedirect" class="icon-second"> <base-icon icon="endow-mk-second" size="24" class="cursor mr-24" /></span>

          <span v-if="isLogin && !getLogo" @click="handleRedirectSupport"><base-icon icon="question" size="24" class="cursor mr-24" /></span>
          <span v-if="isLogin && getLogo" @click="handleRedirectSupport" class="icon-main"><base-icon icon="question-mk" size="24" class="cursor mr-24" /></span>
          <span v-if="isLogin && getLogo" @click="handleRedirectSupport" class="icon-second"><base-icon icon="question-mk-second" size="24" class="cursor mr-24" /></span>

          <div v-if="isLogin" class="avatar mr-24">
            <el-dropdown trigger="click" class="pl-2 login-page-header" @command="handleCommand">
              <span class="el-dropdown-link" style="color: #201f1e">
                <base-icon v-if="!user.avatar" icon="default-avatar" size="32" style="display: inline-flex" />
                <img v-else :src="user.avatar" />
              </span>

              <el-dropdown-menu slot="dropdown" class="header-downloadapp header-dropdown">
                <div class="dropdown-group">
                  <el-dropdown-item class="item-above">
                    <span class="text-base text-bold" style="padding-bottom: 4px">{{ user.fullName }}</span>
                    <span v-if="user.email" class="text-sm" style="color: #5b616e">{{ user.email }}</span>
                  </el-dropdown-item>
                  <div class="line-drop"></div>
                  <!-- <el-dropdown-item
                    ><span>{{ $t('leftMenu.favorites') }}</span></el-dropdown-item
                  > -->
                  <!-- <el-dropdown-item
                    ><span>{{ $t('leftMenu.voucher') }}</span></el-dropdown-item
                  >
                  <div class="line-drop"></div> -->
                  <el-dropdown-item command="setting"
                    ><span :class="isActiveMenuSetting ? 'active' : null">{{ $t('leftMenu.setting') }}</span></el-dropdown-item
                  >
                  <el-dropdown-item command="logout"
                    ><span>{{ $t('logout.title') }}</span></el-dropdown-item
                  >
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div v-if="!isLogin" class="be-flex align-center mr-24 login" @click="handleCommand('login')">
            <base-icon icon="icon-not-login" size="28" style="display: inline-flex" />
            <span>{{ $t('leftMenu.login') }}</span>
          </div>
          <div class="line" style="margin-right: 12px"></div>
          <div class="language" :style="selectLanguage === 'vi' ? 'width:135px' : 'width:115px'">
            <el-select
              class="select-language select-language--header select-language--disable"
              v-model="selectLanguage"
              @change="handleChangeLanguage"
              popper-class="select-language-dropdown popper-select-language-header"
            >
              <el-option :label="`${$t('login.en')}`" value="en">
                <template>
                  <div class="be-flex flag">
                    <base-icon icon="flag-usa" size="14" style="margin-right: 4px" />
                    <span class="lang">{{ $t('login.en') }}</span>
                  </div>
                </template>
              </el-option>
              <el-option :label="`${$t('login.vi')}`" value="vi">
                <template>
                  <div class="be-flex flag">
                    <base-icon icon="flag-vn" size="19" style="margin-right: 4px; margin-left: -2px" />
                    <span class="lang" style="margin-left: 1px">{{ $t('login.vi') }}</span>
                  </div>
                </template>
              </el-option>
              <div class="suffix" slot="prefix">
                <base-icon v-if="getIcon === 'flag-usa'" class="flag-usa d-iflex lh-default" :icon="getIcon" size="22" />
                <base-icon v-else class="flag-vn d-iflex lh-default" :icon="getIcon" size="29" />
              </div>
            </el-select>
          </div>
          <!-- <div class="avatar">
            <img src="@/assets/images/avatar.png" alt="" />
          </div> -->
        </div>
      </div>
    </div>
    <div class="navbar-menu-icon">
      <div class="icon-menu-white">
        <img src="../../assets/image/noun_menu_white.png" alt="" />
      </div>
      <div class="icon-menu-black isHidden">
        <img src="../../assets/image/icon-menu-black.png" alt="" />
      </div>
    </div>
    <nav class="nav__mobile">
      <div class="nav__mobile-close">
        <img src="../../assets/image/iconX.png" alt="" />
      </div>
      <el-collapse class="menu__mobile-items" v-model="activeName" accordion>
        <el-collapse-item v-if="isActiveHome" class="collapse-item" title="IDO" name="1">
          <ul class="collapse-menu">
            <li class="collapse-menu__item">
              <a class="menu-link" href="#ecosystem">{{ $t('menu.Ecosystem') }}<i class="sack-menu-effect"></i></a>
            </li>
            <li class="collapse-menu__item">
              <a class="menu-link" href="#product">{{ $t('menu.Product') }}<i class="sack-menu-effect"></i></a>
            </li>
            <li class="collapse-menu__item">
              <a class="menu-link" href="#tokenomics">{{ $t('menu.Token') }}<i class="sack-menu-effect"></i></a>
            </li>
            <li class="collapse-menu__item">
              <a class="menu-link" href="#docs">{{ $t('menu.Docs') }}<i class="sack-menu-effect"></i></a>
            </li>
            <li class="collapse-menu__item">
              <a class="menu-link" href="#roadmap">{{ $t('menu.Roadmap') }}<i class="sack-menu-effect"></i></a>
            </li>

            <li class="collapse-menu__item">
              <a class="menu-link" href="#team">{{ $t('menu.Team') }}<i class="sack-menu-effect"></i></a>
            </li>
          </ul>
        </el-collapse-item>
        <div v-else class="collapse-item-ido" @click="handleCommand('home')">IDO</div>
        <el-collapse-item title="Marketplace" name="2">
          <ul class="collapse-menu">
            <li class="collapse-menu__item">
              <router-link :to="{ name: 'MarketMain' }" class="menu-link">
                {{ $t('leftMenu.real-estate') }}
              </router-link>
            </li>
          </ul>
        </el-collapse-item>
        <!-- <el-collapse-item title="Exchange" name="3">
          <div>Simplify the process: keep operating process simple and intuitive;</div>
          <div>Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;</div>
          <div>Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.</div>
        </el-collapse-item> -->
      </el-collapse>
      <!-- <ul class="menu__mobile-items"> -->
      <!-- <li class="menu-item nav__mobile-item" @click="handleCommand('home')">
          <span :class="isActiveHome ? 'active' : null" v-if="$route.name != 'home'"> IDO</span>
        </li> -->
      <!-- <li class="menu-item nav__mobile-item">
          <div class="content-left__item text-base cursor menu">
            <el-dropdown trigger="click" class="dropdown-menu" @command="handleCommand">
              <span class="el-dropdown-link">Marketplace<i class="el-icon-arrow-down el-icon--right"></i> </span>
              <el-dropdown-menu slot="dropdown" class="dropdown-menu__content">
                <el-dropdown-item command="real-estate" :class="isActiveMenuEstate ? 'active' : null">
                  <p>{{ $t('leftMenu.real-estate') }}</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <i class="sack-menu-effect"></i>
        </li> -->
      <!-- <li class="menu-item nav__mobile-item" v-if="moduleConfig.Crowdsale && isLogin" style="height: 25px">
          <router-link :to="{ name: 'CrowdSale' }" class="router-header mr-24">
            <div class="wrap" @click="handleRedirectHome('CrowdSale')">
              <p class="text-base">{{ $t('leftMenu.crowdsale') }}</p>
            </div>
          </router-link>
          <i class="sack-menu-effect"></i>
        </li>
        <li class="menu-item nav__mobile-item" v-if="isLogin" style="height: 25px">
          <router-link :to="{ name: 'Wallet' }" class="router-header mr-24">
            <div class="wrap" @click="handleRedirectHome('Wallet')">
              <p class="text-base">{{ $t('leftMenu.wallet') }}</p>
            </div>
          </router-link>
          <i class="sack-menu-effect"></i>
        </li>
        <li class="menu-item nav__mobile-item">
          <div v-if="isLogin" class="avatar">
            <el-dropdown trigger="click" class="pl-2 login-page-header" @command="handleCommand">
              <span class="el-dropdown-link" style="color: #201f1e">
                <base-icon v-if="!user.avatar" icon="default-avatar" size="32" style="display: inline-flex" />
                <img v-else :src="user.avatar" style="width: 32px; height: 32px; border-radius: 50%" />
              </span>

              <el-dropdown-menu slot="dropdown" class="header-downloadapp header-dropdown" placement="bottom">
                <div class="dropdown-group">
                  <el-dropdown-item class="item-above">
                    <span class="text-base text-bold" style="padding-bottom: 4px">{{ user.fullName }}</span>
                    <span v-if="user.email" class="text-sm" style="color: #5b616e">{{ user.email }}</span>
                  </el-dropdown-item>
                  <div class="line-drop"></div>
                  <el-dropdown-item
                    ><span>{{ $t('leftMenu.favorites') }}</span></el-dropdown-item
                  >
                  <el-dropdown-item
                    ><span>{{ $t('leftMenu.voucher') }}</span></el-dropdown-item
                  >
                  <div class="line-drop"></div>
                  <el-dropdown-item command="setting"
                    ><span :class="isActiveMenuSetting ? 'active' : null">{{ $t('leftMenu.setting') }}</span></el-dropdown-item
                  >
                  <el-dropdown-item command="logout"
                    ><span>{{ $t('logout.title') }}</span></el-dropdown-item
                  >
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-if="!isLogin" class="be-flex align-center jf-bettwen login" @click="handleCommand('login')">
            <base-icon icon="icon-not-login" size="28" style="display: inline-flex" />
            <span>{{ $t('leftMenu.login') }}</span>
          </div>
          <i class="sack-menu-effect"></i>
        </li> -->
      <!-- </ul> -->
    </nav>
  </div>
</template>

<script lang="ts">
  import EventBus from '@/utils/eventBus'
  import { includes } from 'lodash'
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  const bcAuth = namespace('beAuth')
  const beBase = namespace('beBase')
  @Component
  export default class MainHeader extends Vue {
    @Prop({ required: false, type: Boolean, default: true }) showIdo!: boolean

    @bcAuth.Action('logout') logout!: () => Promise<any>
    @beBase.State('urlSystem') urlSystem!: Record<string, any>
    @bcAuth.State('user') user!: Record<string, any>
    @beBase.State('coinMain') coinMain!: string
    @bcAuth.State('moduleConfig') moduleConfig!: Record<string, any>
    @bcAuth.Getter('isLogin') isLogin!: boolean

    selectLanguage = ''
    image = ''

    activeName = '1'

    get getTitle(): string {
      switch (this.$route.name) {
        case 'WalletLyn':
          return this.$t('menu.wallet') as string
        case 'WalletBtc':
          return this.$t('menu.wallet') as string
        case 'WalletEth':
          return this.$t('menu.wallet') as string
        case 'WalletClm':
          return this.$t('menu.wallet') as string
        case 'WalletBnb':
          return this.$t('menu.wallet') as string
        case 'WalletUsdt':
          return this.$t('menu.wallet') as string
        case 'WalletUsdc':
          return this.$t('menu.wallet') as string
        case 'CrowdSale':
          return this.$t('menu.crowdsale') as string
        case 'affiliate':
          return this.$t('menu.affiliate') as string
        default:
          return this.$t('menu.setting') as string
      }
    }

    get getIcon(): string {
      return this.selectLanguage === 'vi' ? 'flag-vn' : 'flag-usa'
    }

    get getLogo(): boolean {
      if (this.$route.name === 'MarketPlace' || this.$route.name === 'home') {
        return true
      }
      return false
    }

    get isActiveMenuEstate(): boolean {
      return includes(this.$route.path, '/real-estate')
    }
    get isActiveHome(): boolean {
      return this.$route.name == 'home'
    }

    get isActiveMenuSetting(): boolean {
      return includes(this.$route.path, '/setting')
    }
    get isActiveMenuAffiliate(): boolean {
      return includes(this.$route.path, '/affiliate')
    }

    handleCommand(command: string): void {
      if (command === 'logout') {
        this.logout().then(() => {
          this.$router.push({ name: 'login' })
        })
      }
      if (command === 'setting') {
        this.$router.push({ name: 'Profile' })
      }
      if (command === 'real-estate') {
        this.$router.push({ name: 'MarketMain' })
      }
      if (command === 'login') {
        this.$router.push({ name: 'login' })
      }
      if (command === 'home') {
        this.$router.push({ name: 'home' })
      }
    }
    handleRedirect(): void {
      this.$router.push({ name: 'affiliate' })
    }

    handleRedirectSupport(): void {
      window.open(`${this.urlSystem['system.token.support.url']}`)
    }

    handleChangeLanguage(lang: string): void {
      this.$i18n.locale = lang
      window.localStorage.setItem('bc-lang', lang)
      location.reload()
    }

    handleRedirectHome(name: string): void {
      if (this.$route.name === name) {
        window.location.reload()
      } else {
        this.$router.push({ name }).catch()
      }
    }

    redirect(): void {
      this.$router.push({ name: 'home' })
    }
    created(): void {
      this.selectLanguage = window.localStorage.getItem('bc-lang')!
      EventBus.$on('pushAvatar', url => {
        this.user.avatar = url
      })
    }
    mounted(): void {
      let visibleMobile = document.querySelector('.navbar-menu-icon')! as HTMLElement
      let closeX = document.querySelector('.nav__mobile-close')! as HTMLElement
      let closeLI = document.querySelectorAll('.collapse-menu__item')
      let navMobile = document.querySelector('.nav__mobile')! as HTMLElement
      let iconMenuWhite = document.querySelector('.icon-menu-white')
      let iconMenuBlack = document.querySelector('.icon-menu-black')
      closeLI.forEach(item => {
        item.addEventListener('click', function () {
          navMobile.style.transform = 'translateX(150%)'
        })
      })
      visibleMobile.addEventListener('click', function () {
        navMobile.style.transform = 'translateX(0%)'
      })
      closeX.addEventListener('click', function () {
        navMobile.style.transform = 'translateX(150%)'
      })
      window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
          iconMenuBlack?.classList.remove('isHidden')
          iconMenuWhite?.classList.add('isHidden')
        } else {
          iconMenuBlack?.classList.add('isHidden')
          iconMenuWhite?.classList.remove('isHidden')
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .header {
    color: var(--bc-text-menu-header) !important;
    width: 99.9%;
    // height: 72px;
    // border-color: var(--bc-input-border);
    // border-bottom: 1px solid var(--bc-input-border);
    .body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 26px;
      ::v-deep.content-left {
        width: 50%;
        height: 100%;
        // padding: 20px 0px 20px 24px;

        &__item:not(:last-child) {
          margin-right: 40px;
        }

        .menu {
          &:hover {
            span {
              background: var(--bc-menu-active);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }

        .dropdown-menu {
          color: var(--bc-text-menu-header) !important;
          font-size: 16px;
          line-height: 24px;
          .el-icon--right {
            color: var(--bc-text-menu-header) !important;
          }
        }
      }
      .title {
        width: fit-content;
        height: 32px;
        font-weight: 600;
        color: var(--bc-text-discript2);
        line-height: 32px;
      }
      .content-right {
        width: 50%;
        height: 100%;
        // padding: 17px 24px 15px 0;
        display: flex;
        flex-direction: row-reverse;
        .content {
          // width: 232px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          div {
            display: inline-block;
            cursor: pointer;
          }
          .plus {
            width: 45.78px;
            height: 40px;
            border-radius: 50%;
            margin-right: 27px;
            position: relative;
            padding: 0;
            span {
              position: absolute;
              top: 20%;
              left: 20%;
            }
          }
          .notification {
            width: 24px;
            height: 24px;
            margin-right: 18px;
            position: relative;
            span {
              position: absolute;
              top: 8%;
              left: 8%;
            }
          }
          .endow {
            width: 24px;
            height: 24px;
            margin-right: 20px;
            position: relative;
            span {
              position: absolute;
              top: 8%;
              left: 8%;
            }
          }
          .question {
            width: 24px;
            height: 24px;
            margin-right: 24px;
            position: relative;
            span {
              position: absolute;
              top: 8%;
              left: 8%;
            }
          }
          .avatar {
            width: 32px;
            height: 32px;
            img {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              object-fit: cover;
            }
          }
          .language {
            .suffix {
              .flag-usa {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 2px;
                display: block;
              }
              .flag-vn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 1px;
                display: block;
              }
            }
          }
          .line {
            display: block;
            height: 16px;
            // background: red;
            border: 1px solid #0e0b23;
          }
          .login {
            display: flex;
            span:nth-child(2) {
              padding-left: 4px;
            }
          }
          .router-header {
            .wrap {
              p {
                color: var(--bc-text-menu-header);
              }
            }
            &:hover {
              .wrap {
                p {
                  background: var(--bc-menu-active);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                }
              }
            }
          }
          .router-link-active {
            position: relative;
            .wrap {
              p {
                font-weight: 700;
                background: var(--bc-menu-active);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            &::after {
              content: '';
              position: absolute;
              width: 100%;
              height: 2px;
              bottom: -22px;
              left: 0;
              background: var(--bc-menu-active);
            }
          }
        }
      }
    }
  }
  .menu-items {
    .menu-item {
      .menu-link {
        text-decoration: none;
        font-size: 16px;
        color: #0e0b23;
        line-height: 24px;
      }
    }
  }
  .nav__mobile {
    position: fixed;
    top: 0;
    left: 0;
    /* width: 100%; */
    bottom: 0;
    right: 0;
    text-align: center;
    background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
    transition: 0.5s;
    transform: translateX(100%);
    color: #fff !important;
    .text-base {
      font-size: 18px;
      line-height: 24px;
      font-weight: 400;
    }
    .el-dropdown {
      color: #fff;
      font-size: 18px;
      line-height: 24px;
      font-weight: 400;
    }
    a.router-header {
      text-decoration: none;
      color: #fff;
      font-size: 18px;
      line-height: 24px;
      font-weight: 400;
    }
    .nav__mobile-item {
      margin-top: 36px;
    }
  }
  .nav__mobile-close {
    float: right;
    margin-top: 20px;
    margin-right: 20px;
    transition: 0.5s;
  }
  ::v-deep.menu__mobile-items {
    margin-top: 84px;
    transition: 0.5s;
    padding: 0 20px 0 40px;
    border: none;
    .el-collapse-item {
      margin-top: 16px;
      &__header {
        background-color: transparent;
        font-size: 18px;
        line-height: 27px;
        color: #ececec;
        font-weight: 400;
        padding-bottom: 9px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        height: fit-content;
        .el-collapse-item__arrow {
          margin-right: 0;
        }
      }
      &__header.is-active {
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }
      &__wrap {
        margin-top: 16px;
        background: transparent;
        border-bottom: none;
        .el-collapse-item__content {
          padding-bottom: 14px;
          .collapse-menu {
            &__item {
              margin-bottom: 16px;
              text-align: left;
              width: fit-content;
              .menu-link {
                color: #ececec;
                text-decoration: none;
                font-size: 14px;
                line-height: 16px;
              }
            }
            &__item:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
    .collapse-item-ido {
      font-size: 18px;
      line-height: 27px;
      color: #ececec;
      font-weight: 400;
      padding-bottom: 9px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      text-align: left;
    }
  }
  .navbar-menu-icon {
    display: none;
  }
  @media (max-width: 1200px) {
    .header {
      padding: 0 24px;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      .body {
        padding: unset;
      }
      .content-none {
        display: none !important;
      }
      .logo-main {
        width: 140px;
      }
    }
    .header-scroll .logo-second {
      width: 140px;
    }
    .navbar-menu-icon {
      display: block;
    }
  }
  ::v-deep.logo-second {
    display: none !important;
  }
  .icon-second {
    display: none;
  }
  .isHidden {
    display: none;
  }
  .lyn_key .header-scroll .nav__mobile .active {
    position: relative;
    border-bottom: unset;
    font-weight: 700 !important;
    background: unset;
    color: #fff;
    -webkit-background-clip: unset;
    -webkit-text-fill-color: unset;
  }
</style>
