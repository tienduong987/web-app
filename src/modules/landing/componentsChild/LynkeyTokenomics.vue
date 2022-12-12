<template>
  <div class="tokenomics" id="tokenomics">
    <div class="grid wide">
      <div class="title-product">
        <div class="title-folder-top">
          <img src="../../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
          <span>{{ $t('tokenomics.TOKENOMICS') }}</span>
        </div>
        <div class="title-folder-center">{{ $t('tokenomics.bigTitle') }}</div>
        <div class="title-folder-bottom">{{ $t('tokenomics.discript') }}</div>
      </div>
      <div class="tokenomics-center">
        <div class="tokenomics-standard">
          <div class="tokenomics-standard-top">
            {{ $t('tokenomics.Standard') }}
          </div>
          <div class="tokenomics-standard-bottom">ERC-20</div>
        </div>
        <div class="tokenomics-supply">
          <div class="tokenomics-supply-top">
            {{ $t('tokenomics.Total-supply') }}
          </div>
          <div class="tokenomics-supply-bottom">1,000,000,000 LYNK</div>
        </div>
      </div>
      <div class="tokenomics-under"><img src="../../../assets/image/map-tokenomics.png" alt="" /></div>
    </div>
  </div>
</template>

<script>
  // import image1 from "../../assets/image/map-tokenomics.png";
  export default {
    data() {
      return {
        // image1: image1,
      }
    }
  }
</script>

<style lang="scss">
  .tokenomics {
    background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
    padding: 100px 0px;
    .title-product {
      text-align: center;
      margin-bottom: 40px;
      .title-folder-bottom {
        // margin-top: 16px;
        color: #ececec;
      }
    }
    .title-folder-top {
      justify-content: center;
    }
  }

  .tokenomics {
    .tokenomics-center {
      display: flex;
      justify-content: center;
      text-align: center;
      .tokenomics-standard {
        margin-right: 80px;
      }
      .tokenomics-supply-top,
      .tokenomics-standard-top {
        font-size: 18px;
        line-height: 24px;
        font-weight: 400;
        color: #ececec;
      }
      .tokenomics-supply-bottom,
      .tokenomics-standard-bottom {
        font-size: 32px;
        line-height: 40px;
        font-weight: 700;
        color: #ececec;
      }
    }
    .tokenomics-under {
      text-align: center;
      margin-top: 56px;
      opacity: 0.9;
    }
  }

  // tablet & mobile
  @media (max-width: 1023px) {
    .hide-on-mobile-tablet {
      display: none;
    }
  }
  // tablet
  @media (min-width: 740px) and (max-width: 1023px) {
    .tokenomics {
      padding: 80px 0;
    }
    .hide-on-tablet {
      display: none;
    }
  }
  // mobile
  @media (max-width: 739px) {
    .hide-on-mobile {
      display: none;
    }
    .tokenomics {
      padding: 56px 0;
      .title-product {
        text-align: left;
        margin-bottom: 56px;
        padding: 0 24px;
      }
      .title-folder-top {
        justify-content: start;
      }
    }
    .tokenomics {
      .tokenomics-center {
        display: flex;
        justify-content: space-between;
        text-align: center;
        padding: 0 24px;
        .tokenomics-standard {
          margin-right: 80px;
        }
        .tokenomics-supply-top,
        .tokenomics-standard-top {
          font-size: 14px;
          line-height: 24px;
          font-weight: 400;
        }
        .tokenomics-supply-bottom,
        .tokenomics-standard-bottom {
          font-size: 18px;
          line-height: 40px;
          font-weight: 700;
        }
      }
      .tokenomics-under {
        text-align: center;
        margin-top: 56px;
        padding: 0 24px;
      }
    }
  }
</style>
