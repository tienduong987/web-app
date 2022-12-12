<template>
  <base-popup name="popup-verify-app" class="popup-verify-app" :open="handleOpen" :close="handleClose" width="480px">
    <div slot="title">
      <span>{{ $t('enableAuthenticator.title') }}</span>
    </div>
    <div class="content">
      <el-form class="form-enable-authenticator-support">
        <div class="box-qr">
          <img src="@/assets/images/qr-code.png" alt="" />
          <!-- <img v-if="this.dataQR.qrUri" :src="this.dataQR.qrUri" alt="" /> -->
        </div>
        <div class="discript">
          <div class="dot"></div>
          <div class="box-title">
            {{ $t('enableAuthenticator.discript1') }}
            <a href="https://chrome.google.com/webstore/detail/authenticator/bhghoamapcdpbohphigoooaddinpkbai" target="_blank">{{ $t('enableAuthenticator.link') }}</a>
          </div>
        </div>
        <div class="discript" style="margin-bottom: 24px">
          <div class="dot"></div>
          <div class="box-title">{{ $t('enableAuthenticator.discript2') }}</div>
        </div>
      </el-form>
    </div>
    <div slot="footer" class="footer">
      <div @click="handleClose" class="btn-action btn-close">{{ $t('popupChangeNumberPhone.cancel') }}</div>
    </div>
  </base-popup>
</template>
<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  import { SettingRepository } from '@/services/repositories/setting'
  const api: SettingRepository = getRepository('setting')
  @Component({ components: {} })
  export default class PopupEnableAuthenticatorSupport extends Mixins(PopupMixin) {
    handleOpen(): void {
      console.log('open')
    }
    handleClose(): void {
      this.setOpenPopup({
        popupName: 'popup-verify-app',
        isOpen: false
      })
    }
  }
</script>
<style scoped lang="scss">
  .popup-verify-app {
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
        background: var(--bc-btn-bg-default);
        border: none;
        &:hover {
          border: none;
          color: var(--bc-color-white);
          background: var(--bc-btn-bg-default-hover);
        }
      }
    }
  }
</style>
