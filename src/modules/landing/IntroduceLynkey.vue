<template>
  <div class="lyn_key" id="lyn_key">
    <div class="main-header" :class="isScroll ? 'header-scroll' : null">
      <MainHeader class="header-website" />
    </div>

    <div class="">
      <div class="sack-menu">
        <div class="sack-menu-fix" id="menu-scroll">
          <!-- <a class="navbar-brand" href="#"> -->
          <!-- <img src="../../assets/image/logo-menu.png" alt="Logo" class="style-logo style-logo--white" />
            <img src="../../assets/image/logo-main.png" alt="Logo" class="style-logo style-logo--scroll" /> -->
          <!-- <img
              src="../assets/image/logo noel.png"
              alt="Logo"
              class="style-logo style-logo--white"
            />
            <img
              src="../assets/image/logo noel scroll.png"
              alt="Logo"
              class="style-logo style-logo--scroll"
            /> -->
          <!-- </a> -->
          <div class="language-sm">
            <el-dropdown trigger="click" @command="handleChangeLanguage" disabled>
              <span class="el-dropdown-link">
                <img v-if="selectLanguage === 'en'" src="../../assets/image/icon-us.png" alt="" width="20" height="20" style="margin-right: 9px; width: 20px; height: 20px" />
                <img src="../../assets/image/icon-vn.png" width="20" height="20" v-if="selectLanguage === 'vi'" alt="" style="width: 20px; height: 20px" />
                <img src="../../assets/image/china.png" width="20" height="20" v-if="selectLanguage === 'chi'" alt="" style="width: 20px; height: 20px" />
                <img src="../../assets/image/korea.png" width="20" height="20" v-if="selectLanguage === 'ko'" alt="" style="width: 20px; height: 20px" />
                <img src="../../assets/image/japan.png" width="20" height="20" v-if="selectLanguage === 'ja'" alt="" style="width: 20px; height: 20px" />
                <img src="../../assets/image/rusia.png" width="20" height="20" v-if="selectLanguage === 'ru'" alt="" style="width: 20px; height: 20px" />
              </span>
              <el-dropdown-menu slot="dropdown" class="dropdown-language">
                <el-dropdown-item command="vi">
                  <div class="be-flex">
                    <img src="../../assets/image/icon-vn.png" alt="" width="20" height="20" style="margin-right: 9px; width: 20px; height: 20px" />
                    <span>{{ $t('language.vi') }}</span>
                  </div></el-dropdown-item
                >
                <el-dropdown-item command="en">
                  <div class="be-flex">
                    <img src="../../assets/image/icon-us.png" alt="" width="20" height="20" style="margin-right: 9px; width: 20px; height: 20px" />
                    <span>{{ $t('language.en') }}</span>
                  </div></el-dropdown-item
                >
                <el-dropdown-item command="chi">
                  <div class="be-flex">
                    <img src="../../assets/image/china.png" alt="" width="20" height="20" style="margin-right: 9px; width: 20px; height: 20px" />
                    <span>{{ $t('language.chi') }}</span>
                  </div></el-dropdown-item
                >
                <el-dropdown-item command="ko">
                  <div class="be-flex">
                    <img src="../../assets/image/korea.png" alt="" width="20" height="20" style="margin-right: 9px; width: 20px; height: 20px" />
                    <span>{{ $t('language.ko') }}</span>
                  </div></el-dropdown-item
                >
                <el-dropdown-item command="ja">
                  <div class="be-flex">
                    <img src="../../assets/image/japan.png" alt="" width="20" height="20" style="margin-right: 9px; width: 20px; height: 20px" />
                    <span>{{ $t('language.ja') }}</span>
                  </div></el-dropdown-item
                >
                <el-dropdown-item command="ru">
                  <div class="be-flex">
                    <img src="../../assets/image/rusia.png" alt="" width="20" height="20" style="margin-right: 9px; width: 20px; height: 20px" />
                    <span>{{ $t('language.ru') }}</span>
                  </div></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
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
            <li class="menu-item item-docs" @click="handleClickTab(2)">
              <a class="menu-link" href="#docs">{{ $t('menu.Docs') }}<i class="sack-menu-effect"></i></a>
            </li>
            <li class="menu-item">
              <a class="menu-link" href="#roadmap">{{ $t('menu.Roadmap') }}<i class="sack-menu-effect"></i></a>
            </li>

            <li class="menu-item">
              <a class="menu-link" href="#team">{{ $t('menu.Team') }}<i class="sack-menu-effect"></i></a>
            </li>
            <!-- <li class="menu-item">
              <a class="menu-link menu-link--btn" href="https://app.lynkey.com/login" target="_blank"> <div class="btn btn-login">Buy now</div></a>
            </li>
            <li class="menu-item">
              <div class="language-change">
                <el-select v-model="selectLanguage" @change="handleChangeLanguage" class="select-language" disabled popper-class="select-language-dropdown">
                  <el-option :label="`${$t('language.en')}`" class="style-text-lang" value="en">
                    <template>
                      <div class="be-flex flag">
                        <img src="../../assets/image/icon-us.png" alt="" width="20" height="20" style="margin-right: 9px; margin-top: 5px; width: 20px; height: 20px" />
                        <span class="lang style-text-lang">{{ $t('language.en') }}</span>
                      </div></template
                    >
                  </el-option>
                  <el-option :label="`${$t('language.vi')}`" class="style-text-lang" value="vi">
                    <template>
                      <div class="be-flex flag">
                        <img src="../../assets/image/icon-vn.png" alt="" width="20" height="20" style="margin-right: 9px; margin-top: 6px; width: 20px; height: 20px" />
                        <span class="lang style-text-lang">{{ $t('language.vi') }}</span>
                      </div></template
                    >
                  </el-option>
                  <el-option :label="`${$t('language.chi')}`" class="style-text-lang" value="chi">
                    <template>
                      <div class="be-flex flag">
                        <img src="../../assets/image/china.png" alt="" width="20" height="20" style="margin-right: 9px; margin-top: 6px; width: 20px; height: 20px" />
                        <span class="lang style-text-lang">{{ $t('language.chi') }}</span>
                      </div></template
                    >
                  </el-option>
                  <el-option :label="`${$t('language.ko')}`" class="style-text-lang" value="ko">
                    <template>
                      <div class="be-flex flag">
                        <img src="../../assets/image/korea.png" alt="" width="20" height="20" style="margin-right: 9px; margin-top: 6px; width: 20px; height: 20px" />
                        <span class="lang style-text-lang">{{ $t('language.ko') }}</span>
                      </div></template
                    >
                  </el-option>
                  <el-option :label="`${$t('language.ja')}`" class="style-text-lang" value="ja">
                    <template>
                      <div class="be-flex flag">
                        <img src="../../assets/image/japan.png" alt="" width="20" height="20" style="margin-right: 9px; margin-top: 6px; width: 20px; height: 20px" />
                        <span class="lang style-text-lang">{{ $t('language.ja') }}</span>
                      </div></template
                    >
                  </el-option>
                  <el-option :label="`${$t('language.ru')}`" class="style-text-lang" value="ru">
                    <template>
                      <div class="be-flex flag">
                        <img src="../../assets/image/rusia.png" alt="" width="20" height="20" style="margin-right: 9px; margin-top: 6px; width: 20px; height: 20px" />
                        <span class="lang style-text-lang">{{ $t('language.ru') }}</span>
                      </div></template
                    >
                  </el-option>
                  <div class="suffix" slot="prefix">
                    <img src="../../assets/image/icon-us.png" width="20" height="20" v-if="getIcon === 'flag-usa'" alt="" style="margin-top: 10px; width: 20px; height: 20px" />
                    <img
                      src="../../assets/image/icon-vn.png"
                      width="20"
                      height="20"
                      v-if="getIcon === 'flag-vn'"
                      alt=""
                      class="flag-vn"
                      style="margin-top: 0px; width: 20px; height: 20px"
                    />
                    <img src="../../assets/image/china.png" width="20" height="20" v-if="getIcon === 'flag-chi'" alt="" class="flag-chi" style="width: 20px; height: 20px" />
                    <img src="../../assets/image/korea.png" width="20" height="20" v-if="getIcon === 'flag-ko'" alt="" class="flag-ko" style="width: 20px; height: 20px" />
                    <img src="../../assets/image/japan.png" width="20" height="20" v-if="getIcon === 'flag-ja'" alt="" class="flag-vn" style="width: 20px; height: 20px" />
                    <img
                      src="../../assets/image/rusia.png"
                      width="20"
                      height="20"
                      v-if="getIcon === 'flag-ru'"
                      alt=""
                      class="flag-ru"
                      style="margin-top: 0px; width: 20px; height: 20px"
                    /></div
                ></el-select>
              </div>
            </li> -->
          </ul>
          <label for="nav-mobile-input" class="navbar-menu-icon">
            <!-- <img class="icon-menu-white" src="../../assets/image/noun_menu.svg" alt="" /> -->
            <!-- <img class="icon-menu-black" src="../../assets/image/icon-menu-black.png" alt="" /> -->
          </label>
          <input type="checkbox" class="nav-input" id="nav-mobile-input" />
          <nav class="nav__mobile">
            <label for="nav-mobile-input" class="nav__mobile-close">
              <img src="../../assets/image/iconX.png" alt="" />
            </label>
            <ul class="menu__mobile-items">
              <li class="menu-item nav__mobile-item">
                <a class="menu-link" href="#ecosystem"> <label> Ecosystem </label> <i class="sack-menu-effect"></i></a>
              </li>
              <li class="menu-item nav__mobile-item">
                <a class="menu-link" href="#product">Product <i class="sack-menu-effect"></i></a>
              </li>
              <li class="menu-item nav__mobile-item">
                <a class="menu-link" href="#tokenomics">Token <i class="sack-menu-effect"></i></a>
              </li>
              <li class="menu-item nav__mobile-item">
                <a class="menu-link" href="#docs">Docs <i class="sack-menu-effect"></i></a>
              </li>
              <li class="menu-item nav__mobile-item">
                <a class="menu-link" href="#roadmap">Roadmap <i class="sack-menu-effect"></i></a>
              </li>

              <li class="menu-item nav__mobile-item">
                <a class="menu-link" href="#team"> Team <i class="sack-menu-effect"></i></a>
              </li>
              <li class="menu-item menu-item--btn">
                <a class="menu-link menu-link--btn" href="https://app.lynkey.com/login" target="_blank"> <div class="btn-ido btn-login">Buy now</div></a>
              </li>
              <li class="menu-item">
                <div class="language-change">
                  <el-select v-model="selectLanguage" @change="handleChangeLanguage" class="select-language" disabled popper-class="select-language-dropdown">
                    <el-option :label="`${$t('language.en')}`" value="en">
                      <template>
                        <div class="be-flex flag">
                          <img src="../../assets/image/icon-us.png" alt="" width="20" height="20" style="margin-right: 9px; margin-top: 5px; width: 20px; height: 20px" />
                          <span class="lang">{{ $t('language.en') }}</span>
                        </div></template
                      >
                    </el-option>
                    <el-option :label="`${$t('language.vi')}`" value="vi">
                      <template>
                        <div class="be-flex flag">
                          <img src="../../assets/image/icon-vn.png" alt="" width="20" height="20" style="margin-right: 9px; margin-top: 6px; width: 20px; height: 20px" />
                          <span class="lang" style="">{{ $t('language.vi') }}</span>
                        </div></template
                      >
                    </el-option>
                    <el-option :label="`${$t('language.chi')}`" value="chi">
                      <template>
                        <div class="be-flex flag">
                          <img src="../../assets/image/china.png" alt="" width="20" height="20" style="margin-right: 9px; margin-top: 6px; width: 20px; height: 20px" />
                          <span class="lang" style="">{{ $t('language.chi') }}</span>
                        </div></template
                      >
                    </el-option>
                    <el-option :label="`${$t('language.ko')}`" value="ko">
                      <template>
                        <div class="be-flex flag">
                          <img src="../../assets/image/korea.png" alt="" width="20" height="20" style="margin-right: 9px; margin-top: 6px; width: 20px; height: 20px" />
                          <span class="lang" style="">{{ $t('language.ko') }}</span>
                        </div></template
                      >
                    </el-option>
                    <el-option :label="`${$t('language.ja')}`" value="ja">
                      <template>
                        <div class="be-flex flag">
                          <img src="../../assets/image/japan.png" alt="" width="20" height="20" style="margin-right: 9px; margin-top: 6px; width: 20px; height: 20px" />
                          <span class="lang" style="">{{ $t('language.ja') }}</span>
                        </div></template
                      >
                    </el-option>
                    <el-option :label="`${$t('language.ru')}`" value="ru">
                      <template>
                        <div class="be-flex flag">
                          <img src="../../assets/image/rusia.png" alt="" width="20" height="20" style="margin-right: 9px; margin-top: 6px; width: 20px; height: 20px" />
                          <span class="lang" style="">{{ $t('language.ru') }}</span>
                        </div></template
                      >
                    </el-option>
                    <div class="suffix" slot="prefix">
                      <img src="../../assets/image/icon-us.png" width="20" height="20" v-if="getIcon === 'flag-usa'" alt="" style="width: 20px; height: 20px" />
                      <img
                        src="../../assets/image/icon-vn.png"
                        width="20"
                        height="20"
                        v-if="getIcon === 'flag-vn'"
                        alt=""
                        class="flag-vn"
                        style="margin-top: 0px; width: 20px; height: 20px"
                      />
                      <img
                        src="../../assets/image/china.png"
                        width="20"
                        height="20"
                        v-if="getIcon === 'flag-chi'"
                        alt=""
                        class="flag-chi"
                        style="margin-top: 0px; width: 20px; height: 20px"
                      />
                      <img
                        src="../../assets/image/korea.png"
                        width="20"
                        height="20"
                        v-if="getIcon === 'flag-ko'"
                        alt=""
                        class="flag-ko"
                        style="margin-top: 0px; width: 20px; height: 20px"
                      />
                      <img
                        src="../../assets/image/japan.png"
                        width="20"
                        height="20"
                        v-if="getIcon === 'flag-ja'"
                        alt=""
                        class="flag-ja"
                        style="margin-top: 0px; width: 20px; height: 20px"
                      />
                      <img
                        src="../../assets/image/rusia.png"
                        width="20"
                        height="20"
                        v-if="getIcon === 'flag-ru'"
                        alt=""
                        class="flag-ru"
                        style="margin-top: 0px; width: 20px; height: 20px"
                      /></div
                  ></el-select>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <canvas></canvas>
    <!-- src="https://www.youtube.com/embed/v8nUHyqlVIc?autoplay=1&modestbranding=1&autohide=1&mute=1&controls=0&loop=1&showinfo=0&playlist=v8nUHyqlVIc" -->
    <section class="sack-k1">
      <div class="sack-banner" :class="isWatchVideo && 'background-none'">
        <div class="section">
          <!-- <div
            class="video-container"
            v-bind:style="{
              width: 100 / ratio + '%',
              left: ratio2 > 1 ? 0 : -1 / ratio2 + (-1 / ratio2) * 15 + '%',
            }"
          >
            <div class="color-overlay"></div>
            <iframe
              width="100%"
              height="100%"
              ref="videoBackground"
              src="https://www.youtube.com/embed/dlpvmPUMLfw?autoplay=1&modestbranding=1&autohide=2&mute=1&controls=0&loop=1&showinfo=0&playlist=dlpvmPUMLfw"
              frameborder="0"
              allowfullscreen="allowfullscreen"
              mozallowfullscreen="mozallowfullscreen"
              msallowfullscreen="msallowfullscreen"
              oallowfullscreen="oallowfullscreen"
              webkitallowfullscreen="webkitallowfullscreen"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen;muted
              "
            ></iframe> -->
          <!-- <div
              class="po-absolute icon-play--back"
              @click="videoBackChange = true"
            >
              <img
                v-bind:style="{
                  width: ratio * 100 + 15 + 'px',
                  height: ratio * 100 + 15 + 'px',
                }"
                src="../assets/image/icon-play.png"
                class="icon-play-back"
              />
            </div> -->
          <!-- </div> -->

          <div class="video-container" v-bind:style="{ width: 100 / ratio + '%' }">
            <div class="color-overlay"></div>
            <iframe
              width="100%"
              height="100%"
              ref="videoBackground"
              src="https://www.youtube.com/embed/v8nUHyqlVIc?autoplay=1&modestbranding=1&autohide=1&mute=1&controls=0&loop=1&showinfo=0&playlist=v8nUHyqlVIc"
              title="YouTube video player"
              frameborder="0"
              allowfullscreen="allowfullscreen"
              mozallowfullscreen="mozallowfullscreen"
              msallowfullscreen="msallowfullscreen"
              oallowfullscreen="oallowfullscreen"
              webkitallowfullscreen="webkitallowfullscreen"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen;muted"
            ></iframe>
          </div>
        </div>
        <div class="sack-banner-top dacbiet" :class="isWatchVideo && 'po-absolute'">
          <div class="banner-text-header">{{ $t('introduce.bigTitle') }}</div>
          <div class="banner-text-desc">{{ $t('introduce.discript') }}</div>
          <div class="banner-link">
            <a style="text-decoration: none" @click="handleClickBuyNow">
              <button class="btn-ido btn-style be-flex al-center" style="border: 2px solid #fff">
                {{ $t('introduce.btn-text3') }}
              </button>
            </a>
            <div @click="handleWatchVideo2()">
              <img style="margin-top: 40px; width: 48px; height: 48px; display: none; visibility: hidden" src="../../assets/image/icon-play.png" class="icon-play-2" />
            </div>
          </div>
        </div>
        <div class="sack-banner-bottom" :class="isWatchVideo && 'absolute-video'">
          <div class="sack-angelSales">
            <div class="sack-angelSales-left">
              <div class="sack-angelSales-end">
                <span v-if="isEndOn">{{ getRoundNumber }} {{ $t('introduce.end-on') }}:</span>
                <span v-else>{{ getRoundNumber }} {{ $t('introduce.ready') }}:</span>
              </div>
              <div class="sack-angelSales-time">
                <div class="sack-angelSales-count-day style-time-dot">
                  <span id="count-day" class="style-time">{{ day }}</span>
                  <p class="style-time-note">{{ $t('introduce.Day') }}</p>
                </div>
                <div class="sack-angelSales-count-hours style-time-dot">
                  <span id="count-hours" class="style-time">{{ hour }}</span>
                  <p class="style-time-note">{{ $t('introduce.Hours') }}</p>
                </div>
                <div class="sack-angelSales-count-minutes style-time-dot">
                  <span id="count-minutes" class="style-time">{{ minute }}</span>
                  <p class="style-time-note">{{ $t('introduce.Minutes') }}</p>
                </div>
                <div class="sack-angelSales-count-seconds">
                  <span id="count-seconds" class="style-time style-time--none-after">{{ second }}</span>
                  <p class="style-time-note">{{ $t('introduce.Seconds') }}</p>
                </div>
              </div>
            </div>
            <div class="sack-angelSales-right">
              <div class="sack-progress-top">
                <div class="progress-top">
                  <!--{{(roundCurrent && roundCurrent.percentageSold * 1000) / 10}}% -->
                  <span class="amount">{{ roundCurrent && roundCurrent.totalSold | formatNumber }}</span>
                  LYNK {{ $t('introduce.soid') }}
                </div>
                <div class="progress-top">
                  <!--{{$t("introduce.Raised")}}: ${{roundCurrent && (roundCurrent.totalSold * roundCurrent.price) | convertAmountDecimal("USD")}}from{{roundCurrent && roundCurrent.totalBacker | formatNumber}}{{$t("introduce.backers")}}-->
                  <span class="amount">{{ roundCurrent && roundCurrent.totalAvailable | formatNumber }}</span>
                  LYNK {{ $t('introduce.left') }}
                </div>
              </div>
              <div class="sack-progress-center">
                <div class="progress1">
                  <el-progress :percentage="progressbar" color="#26A542" :show-text="true" :stroke-width="28"></el-progress>
                </div>
              </div>
              <div class="sack-progress-under">
                <div class="sack-progress-under-k1 style-under">
                  <div class="progress-under-title">
                    <!--{{roundCurrent && roundCurrent.totalSold | formatNumber}}LYNK{{$t("introduce.soid")}}-->
                  </div>
                  <div class="progress-under-description">
                    <!--{{roundCurrent && roundCurrent.totalAvailable | formatNumber}}LYNK{{$t("introduce.left")}}-->{{ $t('introduce.Raised') }}: ${{
                      roundCurrent && (roundCurrent.totalSold * roundCurrent.price) | convertAmountDecimal('USD')
                    }}
                    from
                    {{ roundCurrent && roundCurrent.totalBacker | formatNumber }}
                    {{ $t('introduce.backers') }}
                  </div>
                </div>
              </div>
              <!-- <button class="btn btn-style btn-buy">{{$t("introduce.btn-text3")}}</button> -->
            </div>
          </div>
          <div class="title-we-accept">We accept</div>
          <div class="wrap-list-coin">
            <div class="ishidemobile">
              <div class="be-flex list-coin">
                <div class="btn-ido btn-style btn-coin">
                  <img src="../../assets/image/icon-btc.png" class="icon-coin" />
                  <span class="italic">bitcoin</span>
                </div>
                <div class="btn-ido btn-style btn-coin">
                  <img src="../../assets/image/icon-eth.png" class="icon-coin" />
                  <span class="eth">ethereum</span>
                </div>
                <div class="btn-ido btn-style btn-coin">
                  <img src="../../assets/image/icon-bnb.png" class="icon-coin" />
                  <span>binance</span>
                </div>
              </div>
              <div class="be-flex list-coin">
                <div class="btn-ido btn-style btn-coin">
                  <img src="../../assets/image/icon-usdt.png" class="icon-coin" />
                  <span>USDT</span>
                </div>
                <div class="btn-ido btn-style btn-coin">
                  <img src="../../assets/image/icon-usdc.png" class="icon-coin" />
                  <span>USDC</span>
                </div>
                <div class="btn-ido btn-style btn-coin">
                  <img src="../../assets/image/icon-busd.png" class="icon-coin" />
                  <span>BUSD</span>
                </div>
              </div>
            </div>
            <div class="isVisible">
              <div class="be-flex list-coin">
                <div class="btn-ido btn-style btn-coin">
                  <img src="../../assets/image/icon-btc.png" class="icon-coin" />
                  <span class="italic">bitcoin</span>
                </div>
                <div class="btn-ido btn-style btn-coin">
                  <img src="../../assets/image/icon-eth.png" class="icon-coin" />
                  <span class="eth">ethereum</span>
                </div>
                <div class="btn-ido btn-style btn-coin">
                  <img src="../../assets/image/icon-bnb.png" class="icon-coin" />
                  <span>binance</span>
                </div>
                <div class="btn-ido btn-style btn-coin">
                  <img src="../../assets/image/icon-usdt.png" class="icon-coin" />
                  <span>USDT</span>
                </div>
                <div class="btn-ido btn-style btn-coin">
                  <img src="../../assets/image/icon-usdc.png" class="icon-coin" />
                  <span>USDC</span>
                </div>
                <div class="btn-ido btn-style btn-coin">
                  <img src="../../assets/image/icon-busd.png" class="icon-coin" />
                  <span>BUSD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="footer-video hide-on-mobile"
          v-bind:style="{
            bottom: ratio !== 1 ? (ratio >= 1024 / 1920 && ratio <= 1280 / 1920 ? (1 / ratio) * 80 + 'px' : (1 / ratio) * 50 + 'px') : '0'
          }"
        >
          <img src="../../assets/video/purple-line2.png" />
        </div>
        <el-dialog class="style_video_back" title="" :visible.sync="videoBackChange">
          <iframe
            v-if="videoBackChange === true"
            v-bind:height="ratio * 720 + 'px'"
            src="https://www.youtube.com/embed/dlpvmPUMLfw?autoplay=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </el-dialog>
      </div>
      <div class="sack-k2" :class="isWatchVideo && 'sack-k2-video'">
        <div class="sack-k2-back">
          <div class="grid wide" id="ecosystem">
            <div class="sack-k2-content" :class="isWatchVideo && 'sack-k2-content-video'">
              <div class="sack-k2-left">
                <div class="title-folder">
                  <div class="title-folder-top">
                    <img src="../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
                    <span>{{ $t('eco-system.eco-system') }}</span>
                  </div>
                  <div class="title-folder-center">
                    {{ $t('eco-system.title') }}
                  </div>
                  <div class="title-folder-bottom">
                    {{ $t('eco-system.discript') }}
                  </div>
                </div>
              </div>
              <div class="sack-k2-right">
                <img src="../../assets/image/map-eco.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <LynkeyProduct /> <LynkeyAssets /> <LynkeyTokenomics />
    <LynkeyFundraising v-if="show" />
    <intro-lynkey2 v-if="show" :id="2" /> <LynkeyFooter2 />
    <div
      v-if="isWatchVideo2 === true"
      style="position: fixed; top: 0; left: 0; z-index: 2000; display: flex; justify-content: center; width: 100%; align-items: center; height: 100vh"
    >
      <div style="position: fixed; top: 0; left: 0; background-color: #21242a; width: 100%; height: 100%; z-index: -1" @click="handleWatchVideo2()"></div>
      <div style="z-index: 20; width: 90%; height: 50vw">
        <iframe
          src="https://www.youtube.com/embed/v8nUHyqlVIc?autoplay=1"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen="allowfullscreen"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen"
          style="width: 100%; height: 100%"
        ></iframe>
      </div>
    </div>
    <div id="backtop" @click="toTop" v-show="scY > 300">
      <div class="icon-backtop">
        <img src="../../assets/image/iconbackop.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
  import IntroLynkey2 from './IntroLynkey2'
  import LynkeyProduct from './componentsChild/LynkeyProduct.vue'
  import LynkeyAssets from './componentsChild/LynkeyAssets.vue'
  import LynkeyTokenomics from './componentsChild/LynkeyTokenomics.vue'
  import LynkeyFundraising from './componentsChild/LynkeyFundraising.vue'
  // import LynkeyFooter from "./componentsChild/LynkeyFooter.vue";
  import LynkeyFooter2 from './componentsChild/LynkeyFooter2.vue'
  import MainHeader from '../../components/header/MainHeader.vue'

  import firebase from '@/utils/firebase'
  import findIndex from 'lodash/findIndex'
  import forEach from 'lodash/forEach'
  import JSEncrypt from 'jsencrypt'
  import request from '@/plugins/request'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      IntroLynkey2,
      LynkeyProduct,
      LynkeyAssets,
      LynkeyTokenomics,
      LynkeyFundraising,
      // LynkeyFooter,
      LynkeyFooter2,
      MainHeader
    },
    data() {
      return {
        scTimer: 0,
        scY: 0,
        play: false,
        getDataDate: 80,
        selectLanguage: 'en',
        ratio: window.innerWidth / 1920,
        ratio2: window.innerWidth / 1440,
        listener: null,
        listRound: [],
        roundCurrent: {},
        isEndOn: false,
        progressbar: 0,
        timing: null,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        dialogVisible: false,
        isWatchVideo: false,
        isWatchVideo2: false,
        isVideoActive: true,
        videoBackChange: false,
        show: false,
        isScroll: false
      }
    },
    // watch: {
    //   isVideoActive: function () {
    //     var vm = this;
    //     setTimeout(function () {
    //       vm.isVideoActive = false;
    //     }, 500);
    //   },
    // },
    computed: {
      ...mapGetters('beAuth', ['isLogin']),

      getIcon() {
        if (this.selectLanguage === 'vi') {
          return 'flag-vn'
        }
        if (this.selectLanguage === 'en') {
          return 'flag-usa'
        }
        if (this.selectLanguage === 'chi') {
          return 'flag-chi'
        }
        if (this.selectLanguage === 'ko') {
          return 'flag-ko'
        }
        if (this.selectLanguage === 'ja') {
          return 'flag-ja'
        }
        return 'flag-ru'
        // return this.selectLanguage === "vi" ? "flag-vn" : "flag-usa";
      },
      getRoundNumber() {
        return this.roundCurrent?.name
      },

      getIsEndRound() {
        const index = findIndex(this.listRound, elm => elm.id === this.roundCurrent.id)
        if (index === this.listRound.length - 1) {
          return true
        }
        return false
      }
    },
    async created() {
      // this.isLoading = true;
      await this.handleSignInFireBase()
      await this.handleTurnOnFirebase()
      this.show = true
      const lang = window.localStorage.getItem('bc-lang')
      if (!lang) {
        window.localStorage.setItem('bc-lang', 'en')
      } else {
        this.selectLanguage = lang
      }
    },

    mounted() {
      window.addEventListener('scroll', this.handleScroll)
      let btnScroll = document.getElementById('menu-scroll')
      let menuLink = document.querySelectorAll('.menu-link')
      let menuLinkEffect = document.querySelectorAll('.sack-menu-effect')
      let btnLogin = document.querySelector('.btn-login')

      // var lang = document.querySelector(".btn-login");
      // var colorLanguge = document.querySelector(".el-input__inner");
      window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
          this.isScroll = true
          // btnScroll.classList.add('changeBack')
          // btnLogin.classList.add('color-sign-in')
          // colorLanguge.classList.add("black");
          // for (var i = 0; i < menuLink.length; i++) {
          //   menuLink[i].classList.add('color-text-scroll')
          // }
          // for (i = 0; i < menuLinkEffect.length; i++) {
          //   menuLinkEffect[i].classList.add('bg-text-gadient')
          // }
        } else {
          this.isScroll = false
          // btnScroll.classList.remove('changeBack')
          // btnLogin.classList.remove('color-sign-in')
          // colorLanguge.classList.remove("black");
          // for (i = 0; i < menuLink.length; i++) {
          //   menuLink[i].classList.remove('color-text-scroll')
          //   menuLink[i].classList.remove('active')
          // }
          // for (i = 0; i < menuLinkEffect.length; i++) {
          //   menuLinkEffect[i].classList.remove('bg-text-gadient')
          // }
          // menuLink.classList.remove("color-text-scroll");
        }
      })

      let makeActive = function () {
        for (let i = 0; i < menuLink.length; i++) menuLink[i].classList.remove('active')

        // this.classList.add('active')
      }

      for (let i = 0; i < menuLink.length; i++) menuLink[i].addEventListener('click', makeActive)

      setTimeout(function () {
        this.isVideoActive = false
      }, 500)

      //tuyet roi
    },

    destroyed() {
      const leadsRef = firebase.database().ref('crowd-sales')
      leadsRef.off('value', this.listener)
    },
    methods: {
      handleClickBuyNow() {
        if (this.isLogin) {
          this.$router.push({ name: 'CrowdSale' })
        } else {
          this.$router.push({ name: 'login' })
        }
      },

      async handleSignInFireBase() {
        try {
          const data = {
            password: this.encryptPassword('#!@Firebase-web-client@!#')
          }
          const result = await this.getToken(data)
          await firebase.auth().signInWithCustomToken(result.authToken)
        } catch (error) {
          console.log(error)
        }
      },
      encryptPassword(pass) {
        const PUBLIC_KEY =
          'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgw0IeOV0DZL1ZfzsSSbZDRu9XPPBkb4EVsFKYODFJnEEMdVK3IBhCyehoUbJFufIvdQD78LyfRo46fB5B6k+EsLC/4vofQiYyE/R13r+Fd+xufTXpxDKkj544LtfBfvsh/fYFx+vUH1/5XtuCplBX4cOsIdMni026zZv46clJswIDAQAB'
        const RSAEncrypt = new JSEncrypt()
        RSAEncrypt.setPublicKey(PUBLIC_KEY)
        return RSAEncrypt.encrypt(pass)
      },
      async getToken(data) {
        try {
          const result = await request.post('api/v1/firebase/auth', data)
          return Promise.resolve(result.data.data)
        } catch (error) {
          return Promise.reject(error)
        }
      },

      async handleTurnOnFirebase() {
        const leadsRef = firebase.database().ref('crowd-sales')
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let _this = this
        this.listener = leadsRef.on('value', function (snapshot) {
          // console.log("round get firebase", snapshot.val());

          _this.listRound = snapshot.val()
          const roundActive = snapshot.val().filter(round => round.isActive)
          // console.log("roundActive", roundActive);

          if (!roundActive.length) {
            _this.roundCurrent = null
            _this.isEndOn = false
            _this.handleGetRoundNext()
            // EventBus.$emit('activeRound', false)
            // _this.setIsActiveRound(false);
          } else {
            _this.roundCurrent = roundActive[0]
            _this.isEndOn = true
            _this.progressbar = _this.$options.filters.convertAmountDecimal((_this.roundCurrent.percentageSold * 1000) / 10, 'PERCENT')
            _this.handleGetData()
            // EventBus.$emit('activeRound', true)
            // _this.setIsActiveRound(true);
          }
        })
      },

      handleGetRoundNext() {
        const leadsRef = firebase.database().ref('crowd-sales')
        leadsRef.off('value', this.listener)

        /**
         * Nếu response là round cuối
         * response là null <=> chưa vào round nào => lấy round 1
         */

        if (!this.roundCurrent) {
          const roundFirst = this.listRound[0]
          const roundLast = this.listRound[this.listRound.length - 1]

          const toDay = Date.now()
          const fromTimeRoundFirst = new Date(roundFirst.fromDate.time).getTime()
          const toTimeRoundLast = new Date(roundLast.toDate.time).getTime()

          // Nếu today > time roundLast
          if (toDay > toTimeRoundLast) {
            this.day = '00'
            this.hour = '00'
            this.minute = '00'
            this.second = '00'
            this.roundCurrent = roundLast
            this.isEndOn = true
            // this.isLoading = false;
          }
          // Nếu today < time roundFirst
          if (toDay < fromTimeRoundFirst) {
            this.roundCurrent = this.listRound[0]
            this.progressbar = this.$options.filters.convertAmountDecimal((this.roundCurrent.percentageSold * 1000) / 10, 'PERCENT')
            this.handleGetData('from')
          }
          // Nếu fromTimeRoundFirst < today < toTimeRoundLast
          if (toDay > fromTimeRoundFirst && toDay < toTimeRoundLast) {
            forEach(this.listRound, round => {
              const fromTime = new Date(round.fromDate.time).getTime()
              if (toDay < fromTime) {
                this.roundCurrent = round
                return false
              }
            })

            this.isEndOn = false
            this.progressbar = this.$options.filters.convertAmountDecimal((this.roundCurrent.percentageSold * 1000) / 10, 'PERCENT')
            this.handleGetData('from')
          }
        }
      },

      handleGetData(type = 'to') {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let _this = this
        this.countDownDate = type === 'to' ? new Date(this.roundCurrent.toDate.time).getTime() : new Date(this.roundCurrent.fromDate.time).getTime()

        this.timing = setInterval(function () {
          let now = new Date().getTime()

          let distance = _this.countDownDate - now

          //case ready start chạy hết time
          if (distance <= 0 && !_this.isEndOn) {
            // console.log("vao day 1");
            _this.countDownDate = new Date(_this.roundCurrent.toDate.time).getTime()
            _this.handleTurnOnFirebase()
            _this.isEndOn = true
            // _this.isLoading = false;
          }

          //case chạy hết time end on và không phải round cuối
          if (distance <= 0 && _this.isEndOn && !_this.getIsEndRound) {
            // _this.isLoading = true;
            _this.handleTurnOnFirebase()
            _this.isEndOn = true
            // _this.isLoading = false;
            return
          }

          //case round cuối và hết hạn
          if (distance <= 0 && _this.isEndOn && _this.getIsEndRound) {
            clearInterval(_this.timing)
            const leadsRef = firebase.database().ref('crowd-sales')
            leadsRef.off('value', _this.listener)
            // EventBus.$emit('activeRound', false)
            _this.setIsActiveRound(false)

            // _this.isLoading = false;
            return
          }

          _this.day = Math.floor(distance / (1000 * 60 * 60 * 24)) >= 10 ? Math.floor(distance / (1000 * 60 * 60 * 24)) : '0' + Math.floor(distance / (1000 * 60 * 60 * 24))
          _this.hour =
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) >= 10
              ? Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
              : '0' + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          _this.minute =
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) >= 10
              ? Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
              : '0' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          _this.second = Math.floor((distance % (1000 * 60)) / 1000) >= 10 ? Math.floor((distance % (1000 * 60)) / 1000) : '0' + Math.floor((distance % (1000 * 60)) / 1000)
        }, 1000)
        // this.isLoading = false;
      },

      handleScroll: function () {
        if (this.scTimer) return
        this.scTimer = setTimeout(() => {
          this.scY = window.scrollY
          clearTimeout(this.scTimer)
          this.scTimer = 0
        }, 100)
      },
      toTop: function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      },

      handleChangeLanguage(lang) {
        console.log(lang)
        this.selectLanguage = lang
        // this.$i18n.locale = lang;
        // window.localStorage.setItem("bc-lang", lang);
      },
      handleWatchVideo() {
        this.isWatchVideo = !this.isWatchVideo
        //this.isWatchVideo = !this.isWatchVideo;
        // if (this.isWatchVideo === false) {
        //   this.$refs.videoBackground.play()
        // } else {
        //   this.$refs.videoBackground.pause()
        // }
      },

      handleWatchVideo2() {
        this.isWatchVideo2 = !this.isWatchVideo2
      },
      // async checkVideo() {
      //   setTimeout(this.isVideoActive, 500);
      // },
      handleClickTab(id) {
        if (id !== undefined) {
          let ids = id.toString()
          setTimeout(() => {
            if (document.getElementById(ids)) {
              // const yOffset = -80;
              const element = document.getElementById(ids)
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
              })
              // if (element) {
              //   const y =
              //     element.getBoundingClientRect().top +
              //     window.pageYOffset +
              //     yOffset;
              //   window.scrollTo({ top: y, behavior: "smooth" });
              // }
            }
          }, 300)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep.lyn_key {
    overflow: hidden;
    color: #fff;
    .main-header {
      // border-bottom: 1px solid #d2d0ce;
      padding: 0px;
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 1000;
      height: 80px;
      .header-website {
        color: #fff !important;
      }
      .body .content-left .dropdown-menu {
        color: #fff !important;
      }
      .body .content-right .content .router-header .wrap p {
        color: #fff;
      }
      .body .content-right .content .line {
        border: 1px solid #fff;
      }
      .body .content-left .dropdown-menu .el-icon--right {
        color: #fff !important;
      }
      .active {
        border-bottom: unset;
      }
    }
    .header-scroll {
      .header-website {
        color: #000 !important;
      }
      .body .content-left .dropdown-menu {
        color: #000 !important;
      }
      .body .content-right .content .router-header .wrap p {
        color: #000 !important;
      }
      .body .content-right .content .line {
        border: 1px solid #0e0b23;
      }
      .body .content-left .dropdown-menu .el-icon--right {
        color: #000 !important;
      }
      .active {
        position: relative;
        border-bottom: unset;
        font-weight: 700 !important;
        background: var(--bc-menu-active);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .ishidemobile {
      display: block;
    }
    .isVisible {
      display: none;
    }
    @media screen and (min-width: 1700px) {
      background-color: #000000;
    }
    //================================== video =========
    .section {
      //position: relative;
      //width: 100%;
      //height: 100vh;
      //display: flex;
      //align-items: center;
      //justify-content: center;
      overflow: hidden;
      opacity: 1;
      .video-container {
        @media (max-width: 1440px) {
          top: -225px;
        }
        @media (max-width: 1366px) {
          top: -223px;
        }
      }
      @media screen and (max-width: 1400px) {
      }
      @media screen and (max-width: 768px) {
        .video-container {
          display: none;
          visibility: hidden;
        }
      }
      .icon-play--back {
        top: 50%;
        right: 18%;
        cursor: pointer;
        transform: translateY(-138%);
        z-index: 10;
        @media (max-width: 1366px) {
          right: 36%;
        }
      }
    }

    .background-none {
      //background-image: none !important;
      @media screen and (max-width: 768px) {
        background: url('../../assets/image/bg-header.png') !important;
      }
    }

    .footer-video {
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .absolute-video {
      position: absolute;
      bottom: 0;
    }

    .sack-k2-video {
      height: 1378px !important;
    }

    .sack-k2-content-video {
      padding-top: 538px !important;
    }

    .video-container {
      position: absolute;
      top: -235px;
      left: 0;
      width: 100%;
      height: 100%;
      display: inline-block;
    }

    .color-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #1d1a1a;
      opacity: 0.5;
    }

    //================================== video =========
    .sack-menu {
      position: fixed;
      left: 0;
      top: 500px;
      transform: translateY(-50%);
      z-index: 500;
      margin: 0 auto;
      max-width: 1920px;
      display: none;
      .sack-menu-fix {
        // height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 82px 0;
        position: relative;
        padding-top: 10px;

        .style-logo--scroll {
          display: none;
        }
      }

      .language-sm {
        display: none;
        position: absolute;
        right: 121px;
      }

      .changeBack {
        height: 84px;
        padding-top: 0;
        transition: linear 0.3s;

        .style-logo--scroll {
          display: block;
        }

        .style-logo--white {
          display: none;
        }
      }

      .menu-link {
        text-decoration: none;
        color: #ececec;
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
        position: relative;
        animation: fadeIn linear 0.3s;
      }

      .menu-link.color-text-scroll {
        &:hover {
          background: -webkit-linear-gradient(0deg, rgba(74, 172, 248, 0.9) 2.48%, rgba(139, 95, 238, 0.9) 52.36%, rgba(176, 0, 206, 0.9) 98.2%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          padding-bottom: 28px;
        }
      }

      .menu-link.menu-link--btn.color-text-scroll {
        -webkit-text-fill-color: unset !important;
      }

      .menu-link.color-text-scroll.active {
        background: -webkit-linear-gradient(0deg, rgba(74, 172, 248, 0.9) 2.48%, rgba(139, 95, 238, 0.9) 52.36%, rgba(176, 0, 206, 0.9) 98.2%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-bottom: 28px;

        .sack-menu-effect {
          width: 100%;
        }
      }

      .menu-items {
        display: flex;
        align-items: start;
        flex-direction: column;
      }

      .menu-item {
        margin-bottom: 16px;
        padding: 0 28px;
        @media (max-width: 1500px) {
          padding: 0 20px;
        }
      }

      .sack-menu-effect {
        position: absolute;
        width: 0%;
        height: 2px;
        z-index: 1;
        background: white;
        bottom: -2px;
        left: 0;
        transition: width ease 0.3s;
        display: inline-block;
      }

      .menu-link:hover {
        color: #fff;
      }

      .menu-link:hover .sack-menu-effect {
        width: 100%;
      }

      .color-sign-in {
        background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
        // color: #151718;
        border: none;
        color: #ececec;
      }

      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }

      .el-icon-arrow-down {
        font-size: 12px;
      }

      .navbar-menu-icon {
        display: none;
      }

      .icon-menu-black {
        display: none;
      }

      .nav-input {
        display: none;
      }

      .nav__mobile {
        display: none;
      }

      .navbar-overley {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: none;
        animation: fadeIn linear 0.2s;
      }

      .nav__mobile {
        position: fixed;
        top: 0px;
        right: 0;
        left: 0;
        bottom: 0;
        display: none;
        background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
        transform: translateY(-150%);
        opacity: 0;
        transition: all linear 0.2s;

        .menu__mobile-items {
          text-align: center;
          padding-top: 100px;
        }

        .btn-login {
          display: inherit;
        }

        .menu-item {
          margin-bottom: 33px;
        }

        .menu-item:nth-child(7) {
          margin-top: 60px;
        }

        .menu-item:last-child {
          display: none;
        }

        .nav__mobile-close {
          position: absolute;
          top: 30px;
          right: 84px;
        }
      }

      .nav-input:checked ~ .navbar-overley {
        display: block;
      }

      .nav-input:checked ~ .nav__mobile {
        transform: translateY(0);
      }

      .style-logo {
        width: 188px;
        // margin-bottom: 19px;
        height: 64px;
      }
    }

    ::v-deep.suffix {
      // width: 40px;

      .flag-usa {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 7px;
        display: block;
      }

      .flag-vn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 6px;
        display: block;
      }

      .flag-chi {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 6px;
        display: block;
      }

      .flag-ko {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 6px;
        display: block;
      }

      .flag-ja {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 6px;
        display: block;
      }

      .flag-ru {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 6px;
        display: block;
      }

      .style-text-lang {
        font-size: 18px;
        line-height: 20px;
        font-weight: 400;
      }
    }

    .sack-banner {
      //background: url("../assets/image/bg-header.png");
      //background-position: center;
      width: 100%;
      //height: 1358px;
      position: relative;
      background-size: cover;
      background-color: #151718;
      //top: 550px;
      //margin-top: -550px;

      .wrap-icon-play {
        //img {
        //  width: 120px;
        //  height: 120px;
        //  opacity: 0.8;
        //}
      }

      .sack-banner-top {
        max-width: 715px;
        width: 100%;
        //padding-top: 257px;
        padding-top: 90px;
        padding-left: 15%;
        box-sizing: content-box;
        //position: absolute;
        position: relative;

        .banner-text-header {
          font-size: 48px;
          line-height: 72px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .banner-text-desc {
          font-size: 24px;
          line-height: 36px;
          font-weight: 400;
        }

        .banner-link {
          padding-top: 40px;
          display: flex;

          a {
            color: #fff;
          }

          .icon-video {
            padding-left: 16px;
          }

          .white-paper {
            padding-left: 24px;
            font-size: 18px;
            line-height: 24px;

            .style-right {
              padding-left: 6px;
            }
          }
        }
      }

      .sack-banner-bottom {
        margin: 125px auto 0;
        // width: 1366px;
        padding-left: 15%;
        //bottom: 0;
        //position: absolute;
        position: relative;
        z-index: 100;

        .sack-angelSales {
          width: fit-content;
          // margin: 0 auto;
          height: auto;
          box-shadow: 0px 3px 3px rgba(40, 52, 75, 0.08);
          border-radius: 24px;
          background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
          opacity: 0.9;
          border-radius: 20px;
          z-index: 40;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 69px 47px 89px 46px;
        }

        .sack-angelSales-left {
          width: 100%;

          .sack-angelSales-end {
            font-size: 24px;
            line-height: 48px;
            font-weight: 400;
          }

          .sack-angelSales-time {
            position: relative;
            margin-left: 0px;
            margin-top: 0px;
            width: 100%;
            display: flex;
            text-align: center;

            .style-time {
              font-size: 56px;
              line-height: 76px;
              font-weight: 700;

              &::after {
                position: absolute;
                font-size: 48px;
                font-weight: 600;
                top: -1px;
                right: -37px;
                content: ':';
                color: #c4c4c4;
              }
            }

            .style-time--none-after::after {
              display: none;
            }

            .style-time-note {
              font-size: 16px;
              line-height: 24px;
              font-weight: 400;
            }

            .style-time-dot {
              position: relative;
              margin-right: 65px;
              width: 25%;
            }
          }
        }

        .sack-angelSales-right {
          position: relative;
          width: 100%;
          margin-top: 50px;

          .progress {
            position: relative;
            width: 10%;
            height: 8px;
            background: #26a542;
            overflow: unset;
            border-top-left-radius: 24px;
            border-bottom-left-radius: 24px;
          }

          .progress1 {
            // background: #eaecf1;
            border-radius: 24px;
          }

          .sack-progress-top {
            font-size: 16px;
            line-height: 24px;
            font-weight: 400;
            margin-bottom: 7px;
            display: flex;
            justify-content: space-between;
            padding: 0 10px;

            .progress-top {
              font-size: 14px;
              line-height: 28px;

              .amount {
                font-size: 14px;
                font-weight: 600;
              }
            }
          }

          .sack-progress-center {
            width: 463px;

            .el-progress-bar {
              padding-right: 0;

              &__outer {
                background: #31353e;
              }
            }

            .el-progress__text {
              position: absolute;
              font-size: 14px !important;
              color: #fff;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
            }
          }

          .sack-progress-under-k1 {
            font-size: 24px;
            line-height: 28px;
            font-weight: 600;
            margin-top: 9px;
            display: flex;
            justify-content: space-between;
            padding: 0 10px;

            .progress-under-description {
              font-size: 14px;
              line-height: 24px;
            }
          }

          .btn-buy {
            float: right;
            margin-top: 45px;
          }
        }
        .title-we-accept {
          margin-top: 24px;
          font-size: 18px;
          line-height: 24px;
          font-weight: 400;
          color: #ececec;
          @media (max-width: 1024px) {
            text-align: center;
          }
          @media (max-width: 739px) {
            text-align: left;
            padding-left: 24px;
          }
        }
        .list-coin {
          margin-top: 16px;

          .btn-coin {
            width: 179px;
            height: 37px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;

            span {
              font-size: 16px;
              margin-left: 6px;
            }

            .italic {
              font-style: italic;
            }

            .eth {
              font-weight: 400;
            }
          }
        }
      }
    }

    .sack-k2 {
      background: #151718;
      //height: 1327px;
      width: 100%;
      padding-top: 100px;

      .title-folder {
        max-width: 590px;
        text-align: left;
      }

      .sack-k2-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        //padding-top: 464px;
        padding-bottom: 100px;
      }
    }
    .sack-k2-back {
      background: url('../../assets/image/bg-eco.png');
      background-repeat: no-repeat;
      background-position-x: 49%;
      background-position-y: -11px;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    #backtop {
      position: fixed;
      bottom: 100px;
      right: 14px;
      height: auto;
      z-index: 1000;
      cursor: pointer;
    }
    #ecosystem {
      scroll-margin-top: 150px;
      @media (max-width: 739px) {
        scroll-margin-top: -500px;
      }
    }
    // .dacbiet {
    //   opacity: 0;
    // }
  }

  @media (max-width: 1590px) {
    .lyn_key {
      .sack-banner {
        .wrap-icon-play {
          right: 14%;

          img {
            width: 90px;
          }
        }

        .sack-banner-bottom {
          // margin-top: 205px;

          .sack-angelSales {
            // justify-content: center;
            // flex-direction: column;
            // width: 80%;
          }

          .sack-angelSales-left {
            // text-align: center;

            .sack-angelSales-end {
              // font-size: 40px;
              // line-height: 48px;
              // font-weight: 600;
            }

            .sack-angelSales-time {
              justify-content: center;
            }
          }

          .sack-angelSales-right {
            // margin-top: 18px;
          }
        }
      }

      .sack-k2 {
        .sack-k2-content {
          //padding-top: 500px;
        }
      }
    }
  }

  @media (max-width: 1310px) {
    .lyn_key {
      .sack-menu {
        display: none;
        .navbar-menu-icon {
          display: block;
          width: 26px;
          height: 26px;
        }

        .language-sm {
          display: block;
        }

        .menu-items {
          display: none;
        }
        .nav__mobile {
          position: fixed;
          display: none;
          opacity: 0.98;
        }

        .sack-menu-fix {
          display: none;
        }
      }

      .style-logo--scroll {
        display: none;
      }

      .changeBack {
        // background: transparent;
        transition: linear 0.3s;

        .icon-menu-white {
          display: block;
        }

        .icon-menu-black {
          display: none;
        }

        .nav__mobile {
          .menu__mobile-items {
            .menu-item {
              .color-text-scroll {
                color: #ececec !important;
                padding-bottom: 15px !important;
              }

              .menu-link.color-text-scroll.active {
                -webkit-text-fill-color: unset;
                padding-bottom: 15px !important;

                i.sack-menu-effect.bg-text-gadient {
                  background: #fff !important;
                }
              }
              .menu-link.color-text-scroll {
                &:hover {
                  background: #fff;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  padding-bottom: 15px !important;
                  font-weight: 700;
                }
              }
              .bg-text-gadient {
                background: #fff !important;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          }
        }
      }

      .sack-k2 {
        .sack-k2-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          //padding-top: 500px;
        }
      }
    }
  }

  // tablet & mobile
  @media (max-width: 1024px) {
    .hide-on-mobile-tablet {
      display: none;
    }
    .lyn_key {
      .sack-banner {
        .sack-banner-top {
          max-width: 600px;
          width: 100%;
          padding-top: 262px;
          padding-left: 0;
          text-align: center;
          margin: 0 auto;

          .banner-text-header {
            font-size: 40px;
            line-height: 56px;
            font-weight: 700;
            margin-bottom: 24px;

            .banner-text-desc {
              font-size: 24px;
              line-height: 32px;
              font-weight: 400;
            }
          }

          .banner-text-desc {
            font-size: 30px;
            line-height: 40px;
            font-weight: 400;
          }

          .banner-link {
            padding-top: 40px;
            display: inline-flex;
            flex-direction: column;
            align-items: center;

            .white-paper {
              margin-top: 16px;
            }
          }
        }

        .wrap-icon-play {
          display: none;
        }

        .sack-banner-bottom {
          padding: 0;

          .sack-angelSales {
            margin: 0 auto;

            .sack-angelSales-left {
              width: 100%;

              .sack-angelSales-end {
                // font-size: 40px;
                // line-height: 48px;
                // font-weight: 600;
              }

              .sack-angelSales-time {
                position: relative;
                margin-left: 0px;
                margin-top: 0px;
                width: 100%;
                display: flex;
                text-align: center;

                .style-time {
                  // font-size: 72px;
                  // line-height: 96px;
                  // font-weight: 600;
                }

                .style-time-note {
                  font-size: 20px;
                  line-height: 24px;
                  font-weight: 400;
                }

                .style-time-dot {
                  position: relative;
                  margin-right: 55px;
                }

                // .style-time-dot::after {
                //   position: absolute;
                //   font-size: 64px;
                //   line-height: 96px;
                //   font-weight: 600;
                //   top: 0;
                //   right: 0;
                //   content: ":";
                //   margin-right: -36px;
                // }
              }
            }

            .sack-angelSales-right {
              position: relative;
              width: 100%;

              .progress {
                position: relative;
                width: 10%;
                height: 8px;
                background: #26a542;
                overflow: unset;
                border-top-left-radius: 24px;
                border-bottom-left-radius: 24px;
              }

              .progress1 {
                // background: #eaecf1;
                border-radius: 24px;
              }

              .sack-progress-top {
                font-size: 16px;
                line-height: 24px;
                font-weight: 400;
                margin-bottom: 10px;
                display: flex;
                justify-content: space-between;

                .progress-top,
                .amount {
                  font-size: 16px;
                }
              }

              .sack-progress-under {
                .sack-progress-under-k1 {
                  font-size: 24px;
                  line-height: 28px;
                  font-weight: 600;
                  margin-top: 8px;
                  display: flex;
                  justify-content: space-between;
                }
              }

              .btn-buy {
                float: right;
                margin-top: 45px;
              }
            }
          }

          .list-coin {
            justify-content: center;
          }
        }
      }

      .sack-k2 {
        //height: 1592px;

        .title-folder {
          max-width: 590px;
          text-align: center;
          margin-top: 80px;
        }

        .title-folder-top {
          justify-content: center;
        }

        .sack-k2-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          //padding-top: 550px;
          flex-direction: column;
        }
      }
      .sack-k2-back {
        background: unset;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }

  // tablet
  @media (min-width: 740px) and (max-width: 1024px) {
    .hide-on-tablet {
      display: none;
    }
    .sack-banner {
      background: url('../../assets/image/bg-header.png');
      background-position: center;
      width: 100%;
      height: 1358px;
      position: relative;
      background-size: cover;
      top: 550px;
      margin-top: -703px;
      .sack-banner-bottom {
        margin-top: 278px;
      }
      .section {
        display: none;
        visibility: hidden;
      }
      .footer-video {
        display: none;
        visibility: hidden;
      }
    }
    .sack-banner-top {
      .icon-play-2 {
        display: block !important;
        visibility: visible !important;
      }
    }
    .icon-play-back {
      display: none;
    }
    .sack-k2 {
      .sack-k2-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 550px;
        flex-direction: column;
      }
    }
    .dacbiet {
      opacity: 1 !important;
    }
  }

  // mobile
  @media (max-width: 739px) {
    .lyn_key {
      .ishidemobile {
        display: none;
      }
      .isVisible {
        display: block;
      }
    }
    .lyn_key .sack-banner .sack-banner-bottom .isVisible .list-coin {
      .btn-coin {
        width: 103px !important;
        span {
          font-size: 14px;
        }
      }
    }

    .hide-on-mobile {
      display: none;
    }
    .sack-banner {
      height: 1120px !important;
      background: url('../../assets/image/bg-header.png');
      background-position: center;
      width: 100%;
      position: relative;
      background-size: cover;
      top: 547px;
      margin-top: -703px;
    }
    .lyn_key {
      .sack-menu {
        .sack-menu-fix {
          padding: 0px 24px;
          padding-top: 10px;
        }

        .language-sm {
          right: 62px;
        }

        .style-logo {
          width: 140px;
          height: 48px;
        }

        .changeBack {
          height: unset;
          padding-bottom: 10px;
        }
      }

      .sack-banner {
        // background: url("../assets/image/bg-header-mobile.png");
        .sack-banner-top {
          max-width: 90%;

          .banner-text-header {
            line-height: 32px;
            font-size: 24px;
          }

          .banner-text-desc {
            display: none;
          }

          .banner-link {
            .white-paper {
              display: none;
            }
          }
        }

        .sack-banner-bottom {
          .sack-angelSales {
            // width: 90%;
            padding: 48px 22px 38px;

            .sack-angelSales-left {
              .sack-angelSales-end {
                font-size: 18px;
                line-height: 40px;
                font-weight: 600;
              }

              .sack-angelSales-time {
                position: relative;
                margin-left: 0px;
                margin-top: 0px;
                width: 100%;
                display: flex;
                text-align: center;

                .style-time {
                  font-size: 48px;
                  line-height: 56px;
                  font-weight: 600;

                  &::after {
                    right: -22px;
                  }
                }

                .style-time-note {
                  font-size: 16px;
                  line-height: 24px;
                  font-weight: 400;
                }

                .style-time-dot {
                  position: relative;
                  margin-right: 30px;
                  width: unset;
                  flex: 1;
                }

                .sack-angelSales-count-seconds {
                  flex: 1;
                }

                // .style-time-dot::after {
                //   position: absolute;
                //   font-size: 48px;
                //   line-height: 48px;
                //   font-weight: 600;
                //   top: 0;
                //   right: 0;
                //   content: ":";
                //   margin-right: -23px;
                // }
              }
            }

            .sack-angelSales-right {
              margin-top: 37px;

              .progress {
                position: relative;
                width: 10%;
                height: 8px;
                background: #26a542;
                overflow: unset;
                border-top-left-radius: 24px;
                border-bottom-left-radius: 24px;
              }

              .progress1 {
                // background: #eaecf1;
                border-radius: 24px;
              }

              .sack-progress-top {
                font-size: 10px;
                line-height: 24px;
                font-weight: 400;
                margin-bottom: 8px;
                display: flex;
                justify-content: space-between;

                .progress-top,
                .amount {
                  font-size: 12px;
                  font-weight: 600;
                  line-height: 16px;
                }
              }

              ::v-deep.sack-progress-center {
                width: auto;

                .el-progress-bar {
                  &__outer {
                    height: 18px !important;
                  }
                }

                .el-progress__text {
                  font-size: 10px !important;
                }
              }

              .sack-progress-under-k1 {
                font-size: 12px;
                line-height: 24px;
                font-weight: 400 !important;
                margin-top: 20px;
                display: flex;
                justify-content: space-between;

                .progress-under-description {
                  font-size: 12px !important;
                  font-weight: 400 !important;
                }
              }

              .btn-buy {
                float: right;
                margin-top: 45px;
              }
            }
          }

          .list-coin {
            margin: 14px auto 0;
            width: fit-content;
          }
        }
      }

      .sack-k2 {
        height: auto;
        padding: 0 24px;

        .title-folder {
          max-width: 590px;
          text-align: left;
          margin-top: 0;
        }
        .title-folder-top {
          justify-content: start;
        }

        .sack-k2-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 600px;
          flex-direction: column;
        }
      }
    }
    .sack-banner-top {
      .icon-play-2 {
        display: block !important;
        visibility: visible !important;
      }
    }
    .lyn_key {
      .sack-menu {
        .nav__mobile {
          .nav__mobile-close {
            position: absolute;
            top: 30px;
            right: 24px;
          }
        }
      }
    }
    .dacbiet {
      opacity: 1 !important;
    }
    #tokenomics,
    #product,
    #docs,
    #roadmap,
    #team {
      scroll-margin-top: 50px;
    }
    #docs {
      scroll-margin-top: 200px;
    }
  }

  @media (max-width: 412px) {
    .sack-angelSales {
      .sack-angelSales-left {
        .sack-angelSales-time {
          .style-time-dot {
            margin-right: 20px !important;

            .style-time::after {
              font-size: 32px !important;
              right: -14px !important;
            }
          }
        }

        .style-time-dot:nth-child(2) .style-time::after {
          right: -16px !important;
        }
      }
    }
  }

  .wrap-list-coin {
    overflow-x: auto;
  }
  .wrap-list-coin::-webkit-scrollbar {
    display: none;
  }

  .wrap-icon-play {
    cursor: pointer;
    position: absolute;
    top: 26%;
    right: 23%;
  }
  #particles-js {
    height: 500px;
    width: 100vw;
    background-color: red;
    position: absolute;
    z-index: 100;
    top: 0;
    right: 0;
  }
  ::v-deep.lyn_key {
    .header-scroll {
      background-color: #fff;
      z-index: 999;
      border-bottom: 1px solid #d2d0ce;
      .logo-second {
        display: inline-flex !important;
      }
      .logo-main {
        display: none !important;
      }
      .header {
        .content-right {
          .icon-main {
            display: none;
          }
          .icon-second {
            display: inline-flex;
          }
        }
      }
    }
  }
</style>
