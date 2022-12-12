<template>
  <div class="box-3" id="roadmap">
    <div class="road-content">
      <div class="title-1">
        <div class="title-folder">
          <div class="title-folder-top">
            <img src="../../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
            <span>{{ $t('road-map.title') }}</span>
          </div>
          <div class="title-folder-center">{{ $t('road-map.road') }}</div>
          <div class="title-folder-bottom">{{ $t('road-map.intro') }}</div>
        </div>
      </div>
      <div class="road-map be-flex hide-on-mobile">
        <img src="../../../assets/image/roadmap-page.png" style="" alt="" />
      </div>
      <div class="road-map-small be-flex isMapMobile">
        <img src="../../../assets/image/roadmap-con.png" style="" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
  // import image1 from "../../assets/image/roadmap-page.png";
  // import image2 from "../../assets/image/roadmap-con.png";
  export default {
    data() {
      return {
        // image1: image1,
        // image2: image2,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .road-content {
    background: url('../../../assets/image/bg-roadmap.png');
    background-repeat: no-repeat;
    background-position: center;
  }
  .title-1 {
    // margin-bottom: 60px;
    padding-top: 100px;
    text-align: center;
    .title-folder {
      text-align: center;
    }
    .title-folder-top {
      justify-content: center;
      color: #ececec;
      opacity: 0.5;
      font-size: 20px;
    }

    .title-folder-center {
      color: #ececec;
      font-weight: 600;
      margin-bottom: 32px;
    }

    .title-folder-bottom {
      font-size: 18px;
      color: #ececec;
    }
  }
  .box-3 {
    // background: linear-gradient(52.87deg, #9d3ef2 41.15%, #3036f4 100%);
    background: linear-gradient(128.74deg, #9d3ef2 40.29%, #3036f4 97.93%);
    // padding-bottom: 67px;

    .road-map {
      justify-content: center;
      padding: 0 20px;
    }
    .road-map-small {
      // background-image: url("../../assets/image/bg-map.png");
      padding: 0 20px;
      text-align: center;
    }
    .isMapMobile {
      display: none;
    }
  }
  @media (max-width: 1023px) {
    .hide-on-mobile-tablet {
      display: none;
    }
  }
  // tablet
  @media (min-width: 740px) and (max-width: 1023px) {
    .title-1 {
      padding-top: 80px;
    }
    .hide-on-tablet {
      display: none;
    }
  }
  // mobile
  @media (max-width: 739px) {
    .title-1 {
      padding-top: 56px;
    }
    .hide-on-mobile {
      display: none;
    }
    .box-3 {
      .isMapMobile {
        display: block;
      }
    }
    .title-1 {
      .title-folder {
        text-align: left;
        padding: 0 20px;
      }
      .title-folder-top {
        justify-content: start;
      }
    }
  }
</style>
