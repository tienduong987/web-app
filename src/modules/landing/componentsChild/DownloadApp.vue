<template>
  <div class="box-download-app">
    <div class="grid wide">
      <div class="content">
        <div class="title-mobile title-1">
          <div class="title-folder">
            <div class="title-folder-top">
              <img src="../../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
              <span>{{ $t('download.download') }}</span>
            </div>
            <div class="title-folder-center">
              {{ $t('download.download-app') }}
            </div>
          </div>
        </div>
        <div class="content-left po-relative">
          <img class="image-desktop" src="../../../assets/image/mobile-cta.png" alt="" />
          <img class="image-mobile" src="../../../assets/image/mobile.png" alt="" />
        </div>
        <div class="content-right">
          <div class="title-desktop title-1">
            <div class="title-folder">
              <div class="title-folder-top">
                <img src="../../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
                <span> DOWNLOAD </span>
              </div>
              <div class="title-folder-center">APPLICATION</div>
            </div>
          </div>
          <div class="mark">
            <div class="title-2">{{ $t('download.available') }}</div>
          </div>
          <div class="btn-download">
            <a href="https://apps.apple.com/us/app/lynkey/id1591160349" target="_blank" class="btn-download-style">
              <img src="../../../assets/image/ios.png" alt="" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=vn.beedu.blockchain" target="_blank" class="btn-download-style">
              <img src="../../../assets/image/android.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import image1 from "../../assets/image/mobile-cta.png";
  // import image2 from "../../assets/image/mobile.png";
  export default {
    data() {
      return {
        // image1: image1,
        // image2: image2,
      }
    }
  }
</script>

<style lang="scss">
  .box-download-app {
    background-image: url('../../../assets/image/download-app-bg.png');
    background-color: #1d1a1a;
    background-size: cover;
    padding-bottom: 400px;

    .title-mobile {
      display: none;
      visibility: hidden;
    }

    .content {
      display: flex;
      align-items: center;
      padding-top: 180px;
      justify-content: center;
      .title-1 {
        span {
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 24px;
          color: #ececec;
          opacity: 0.5;
        }

        .title-folder-center {
          font-style: normal;
          font-weight: 600;
          font-size: 48px;
          line-height: 56px;
          color: #ececec;
        }
      }

      .title-2 {
        margin-top: 20px;
        font-weight: 400;
        font-size: 28px;
        max-width: 680px;
        line-height: 76px;
      }

      //.content-left {
      //  margin-right: 140px;
      //}

      .btn-download {
        margin-top: 24px;
        display: flex;

        a {
          display: block;
          cursor: pointer;
          margin-right: 16px;

          &:last-of-type {
            margin-right: 0;
          }
        }
      }
      .content-left {
        z-index: 1;
        .image-mobile {
          display: none;
          visibility: hidden;
        }
      }
    }
    .btn-download-style {
      transform: scale(1);
      transition: transform 0.4s ease;
    }
    .btn-download-style:hover {
      transform: scale(0.9);
      @media (max-width: 739px) {
        transform: unset;
      }
    }

    @media (max-width: 1475px) {
      background-image: none;
      padding-bottom: 250px;
      .content {
        flex-direction: row;
        padding-top: 80px !important;
        align-items: center;
        justify-content: center;
      }
      .deep-image {
        display: none;
      }
      .content-right {
        display: block;
        margin-left: 40px !important;
        position: relative;
        z-index: 10;
      }
      .content-left {
        .image-mobile {
          display: none !important;
          visibility: hidden !important;
        }
      }
      .title-mobile {
        display: none;
        visibility: hidden;
        margin: 0 auto 40px auto;

        .title-folder-top {
          span {
            font-style: normal;
            font-weight: 600 !important;
            font-size: 20px !important;
            line-height: 24px !important;
            /* identical to box height, or 120% */

            text-transform: uppercase;

            color: #ececec;
          }
        }

        .title-folder-center {
          font-style: normal;
          font-weight: 600 !important;
          font-size: 32px !important;
          line-height: 33px !important;
          color: #ececec !important;
        }
      }
      .title-desktop {
        display: block;
        visibility: visible;
        .title-folder-top {
          span {
            font-size: 18px;
          }
        }

        .title-folder-center {
          font-style: normal;
          font-weight: 600 !important;
          font-size: 32px !important;
          line-height: 33px !important;
          color: #ececec !important;
        }
      }
      .title-2 {
        margin-top: 20px !important;
        font-style: normal;
        font-weight: 400 !important;
        font-size: 24px !important;
        line-height: 48px !important;
        display: block;
        max-width: 340px !important;
        color: #ffffff;
      }
      .content-left {
        margin-right: 0 !important;
        width: auto;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          //width: 287px!important;
        }
      }
      .btn-download {
        flex-direction: column;
        margin-top: 24px;
        a {
          margin-right: 16px !important;
          margin-bottom: 27px;

          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
    @media (max-width: 767px) {
      background-image: none;
      .content {
        flex-direction: column;
        padding-top: 56px !important;
        align-items: flex-start;
      }
      .content-left {
        margin-top: -40px;
        .image-mobile {
          display: block !important;
          visibility: visible !important;
        }
        .image-desktop {
          display: none;
          visibility: hidden;
        }
      }
      .deep-image {
        display: none;
      }
      .content-right {
        margin-left: 0px !important;
        width: 100%;
        display: block;
        .mark {
          display: flex;
          justify-content: center;
        }
      }
      .title-mobile {
        display: block;
        visibility: visible;
        margin-left: 20px;
        margin-bottom: 48px;

        .title-folder-top {
          span {
            font-style: normal;
            font-weight: 600 !important;
            font-size: 16px !important;
            line-height: 24px !important;
            /* identical to box height, or 120% */

            text-transform: uppercase;

            color: #ececec;
          }
        }

        .title-folder-center {
          font-style: normal;
          font-weight: 600 !important;
          font-size: 24px !important;
          line-height: 33px !important;
          color: #ececec !important;
        }
      }
      .title-desktop {
        display: none;
        visibility: hidden;
      }
      .title-2 {
        margin-top: 20px !important;
        font-style: normal;
        font-weight: 400 !important;
        font-size: 24px !important;
        line-height: 33px !important;
        display: flex;
        align-items: flex-end;
        text-align: center;
        /* White */

        color: #ffffff;
      }
      .content-left {
        margin-right: 0 !important;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .btn-download {
        text-align: center;

        a {
          margin-right: 0 !important;
          margin-bottom: 27px;

          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
    @media (max-width: 375px) {
      .content {
        flex-direction: column;
      }
    }
  }
</style>
