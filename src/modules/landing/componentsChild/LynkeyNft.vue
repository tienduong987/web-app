<template>
  <div class="assets">
    <div class="grid wide">
      <div class="title-assets">
        <div class="title-folder-top">
          <img src="../../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
          <span>NFT</span>
        </div>
        <div class="title-folder-center">NFT collection</div>
        <div class="title-folder-bottom">Collaborative experiences, packages and timeshare programs with multiple global property and tourism groups</div>
      </div>
      <div class="action-slide hide-on-mobile-tablet">
        <div class="arrow arrow-left" @click="handleClickArrow('prev')">
          <span class="left"></span>
        </div>
        <div class="arrow arrow-right" @click="handleClickArrow('next')">
          <span class="right"></span>
        </div>
      </div>
    </div>
    <div class="wrap-slick">
      <VueSlickCarousel v-bind="settings" ref="carousel">
        <div>
          <div class="slide-item po-relative">
            <img src="../../../assets/image/NFT-banner/NFT1.png" alt="" />
          </div>
        </div>
        <div>
          <div class="slide-item po-relative">
            <img src="../../../assets/image/NFT-banner/NFT2.png" alt="" />
          </div>
        </div>
        <div>
          <div class="slide-item po-relative">
            <img src="../../../assets/image/NFT-banner/NTF3.jpg" alt="" />
          </div>
        </div>
        <div>
          <div class="slide-item po-relative">
            <img src="../../../assets/image/NFT-banner/NFT4.png" alt="" />
          </div></div
      ></VueSlickCarousel>
    </div>
  </div>
</template>

<script>
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  // import image1 from "../../assets/image/NFT-banner/NFT1.png";
  // import image2 from "../../assets/image/NFT-banner/NFT2.png";

  export default {
    components: { VueSlickCarousel },
    data() {
      return {
        // image1: image1,
        // image2: image2,
        settings: {
          dotsClass: 'slick-dots custom-dot-class',
          centerMode: true,
          edgeFriction: 0.35,
          speed: 400,
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          centerPadding: '50px',
          prevArrow: true,
          focusOnSelect: true,
          infinite: true,
          responsive: [
            {
              breakpoint: 739,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '50px'
              }
            },
            {
              breakpoint: 568,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '20px'
              }
            }
          ]
        }
      }
    },
    methods: {
      handleClickArrow(type) {
        if (type === 'next') {
          this.$refs.carousel.next()
        } else {
          this.$refs.carousel.prev()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .assets {
    background: #151718;
    padding: 100px 0;

    .title-assets {
      max-width: 700px;
      margin-bottom: 48px;
    }

    .wide {
      display: flex;
      justify-content: space-between;

      .action-slide {
        display: flex;
        margin-top: auto;
        margin-bottom: 48px;

        .arrow {
          display: inline-block;
          border-radius: 50%;
          cursor: pointer;

          .left,
          .right {
            display: inline-block;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #fff;
          }

          .left {
            margin-right: 8px;
          }

          .left::after,
          .right::after {
            content: '';
            display: inline-block;
            margin-top: 18px;

            width: 11px;
            height: 11px;
            border-top: 3px solid #5a6273;
            border-right: 3px solid #5a6273;
          }

          .left::after {
            margin-left: 20px;
            -moz-transform: rotate(-135deg);
            -webkit-transform: rotate(-135deg);
            transform: rotate(-135deg);
          }

          .right::after {
            margin-left: 15px;
            -moz-transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        }
      }
    }

    .wrap-slick {
      .slide-item {
        margin: 0 16px;
        border-radius: 20px;
        overflow: hidden;

        img {
          width: 918px;
          height: 554px;
          object-fit: cover;
          opacity: 0.89;
        }

        .title-image {
          bottom: 40px;
          left: 40px;

          .title-image-1 {
            font-size: 36px;
            color: #fff;
            margin-bottom: 12px;
          }

          .title-image-2 {
            font-size: 20px;
            color: #fff;
          }
        }

        .pagination {
          bottom: 40px;
          right: 40px;
          width: 76px;
          height: 41px;
          background: #ffffff;
          opacity: 0.7;
          border-radius: 40px;
          color: #31353e;
          font-size: 20px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media (min-width: 1024px) and(max-width: 1600px) {
          img {
            height: 400px;
          }
        }
        @media (min-width: 768px) and(max-width: 1022px) {
          img {
            height: 240px;
          }
        }
      }

      .slick-list {
        padding: 0 calc((100vw - 1392px) / 2) px;
      }
    }

    @media (min-width: 1025px) and (max-width: 1440px) {
      .wide {
        width: calc(100vw - 60px);
      }
    }
    // tablet & mobile
    @media (max-width: 1024px) {
      .hide-on-mobile-tablet {
        display: none !important;
      }
      .title-assets {
        text-align: center;

        .title-folder-top {
          justify-content: center;

          span {
            color: #ececec;
          }
        }

        .title-folder-center {
          font-size: 32px;
          line-height: 48px;
        }

        .title-folder-bottom {
          line-height: 28px;
        }
      }
    }
    // tablet
    @media (min-width: 740px) and (max-width: 1024px) {
      padding-top: 80px;
      padding-bottom: 80px;
      .hide-on-tablet {
        display: none;
      }
      .slide-item {
        img {
          // width: 400px !important;
          height: 240px !important;
        }

        .title-image {
          bottom: 16px !important;
          left: 16px !important;

          .title-image-1 {
            width: 240px !important;
            font-size: 20px !important;
          }

          .title-image-2 {
            font-size: 16px !important;
          }
        }

        .pagination {
          bottom: 16px !important;
          right: 16px !important;
          width: 40px !important;
          height: 20px !important;
          font-size: 13px !important;
        }
      }
    }
    // mobile
    @media (max-width: 739px) {
      padding-top: 56px;
      padding-bottom: 56px;
      .hide-on-mobile {
        display: none;
      }
      .wide {
        width: calc(100vw - 42px);
      }
      .title-assets {
        text-align: left;

        .title-folder-top {
          justify-content: unset;

          span {
            font-size: 14px;
            line-height: 24px;
          }
        }

        .title-folder-center {
          font-size: 24px;
          line-height: 32px;
        }

        .title-folder-bottom {
          font-size: 16px;
          line-height: 22px;
        }
      }

      .slide-item {
        margin: 0 8px !important;

        img {
          // width: auto !important;
          height: 203px !important;
        }

        .title-image {
          bottom: 16px !important;
          left: 16px !important;

          .title-image-1 {
            font-size: 16px !important;
          }

          .title-image-2 {
            font-size: 12px !important;
          }
        }

        .pagination {
          bottom: 16px !important;
          right: 16px !important;
          width: 40px !important;
          height: 20px !important;
          font-size: 12px !important;
        }
      }
    }
  }
</style>
