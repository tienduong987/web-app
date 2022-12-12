<template>
  <div class="assets">
    <div class="assets-content">
      <div class="grid wide">
        <div class="title-assets">
          <div class="title-folder-top">
            <img src="../../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
            <span>{{ $t('assets.ASSETS') }}</span>
          </div>
          <div class="title-folder-center">{{ $t('assets.Our-projects') }}</div>
          <div class="title-folder-bottom">{{ $t('assets.discript') }}</div>
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
          <div class="wrap-slide">
            <div class="slide-item po-relative">
              <img class="image-banner" src="../../../assets/image/du-an-ly-son-2.png" alt="" />
              <div class="title-image po-absolute">
                <p class="title-image-1">Crystal Holidays Heritage Ly Son</p>
                <p class="title-image-2">$85M assets Tokenised</p>
              </div>
            </div>
          </div>
          <div class="wrap-slide">
            <div class="slide-item po-relative">
              <img class="image-banner" src="../../../assets/image/du-an-van-don.png" alt="" />
              <div class="title-image po-absolute">
                <p class="title-image-1">Van Don Heritage Road Smart City</p>
                <p class="title-image-2">$150M assets Tokenised</p>
              </div>
            </div>
          </div>
          <div class="wrap-slide">
            <div class="slide-item po-relative">
              <img class="image-banner" src="../../../assets/image/xuan-dai-bay.png" alt="" />
              <div class="title-image po-absolute">
                <p class="title-image-1">Xuan Dai Bay</p>
                <p class="title-image-2">$40M assets Tokenised</p>
              </div>
            </div>
          </div>
          <div class="wrap-slide">
            <div class="slide-item po-relative" @click="dialogTableVisibleVanDon = true">
              <img class="image-banner" src="../../../assets/image/van-don-main.png" alt="" />
              <div class="title-image po-absolute">
                <p class="title-image-1">Crystal Holidays Harbour Van Don</p>
                <p class="title-image-2">$150M assets Tokenised</p>
              </div>
              <div class="po-absolute icon-play">
                <img
                  v-bind:style="{
                    width: ratio * 100 + 15 + 'px',
                    height: ratio * 100 + 15 + 'px'
                  }"
                  src="../../../assets/image/icon-play.png"
                  class="icon-play-2"
                />
              </div>
            </div>
          </div>
          <div class="wrap-slide">
            <div class="slide-item po-relative" @click="dialogTableVisible = true">
              <img class="image-banner" src="../../../assets/image/du-an-phu-yen.png" alt="" />
              <div class="title-image po-absolute">
                <p class="title-image-1">Crystal Holidays Marina Phu Yen</p>
                <p class="title-image-2">$40M assets Tokenised</p>
              </div>
              <div class="po-absolute icon-play">
                <img
                  v-bind:style="{
                    width: ratio * 100 + 15 + 'px',
                    height: ratio * 100 + 15 + 'px'
                  }"
                  src="../../../assets/image/icon-play.png"
                  class="icon-play-2"
                />
              </div>
            </div></div
        ></VueSlickCarousel>
      </div>
      <el-dialog title="" :visible.sync="dialogTableVisible">
        <iframe
          v-if="dialogTableVisible === true"
          v-bind:height="ratio * 720 + 'px'"
          width="100%"
          src="https://www.youtube.com/embed/3Vvu-L8Gc_A?autoplay=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </el-dialog>
      <el-dialog title="" :visible.sync="dialogTableVisibleVanDon">
        <iframe
          v-if="dialogTableVisibleVanDon === true"
          v-bind:height="ratio * 720 + 'px'"
          src="https://www.youtube.com/embed/sGpAUxeqK74?autoplay=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  // import image1 from "../../assets/image/du-an-ly-son-2.png";
  // import image2 from "../../assets/image/du-an-van-don.png";
  // import image3 from "../../assets/image/xuan-dai-bay.png";
  // import image4 from "../../assets/image/van-don-main.png";
  // import image5 from "../../assets/image/du-an-phu-yen.png";
  export default {
    components: { VueSlickCarousel },
    data() {
      return {
        // image1: image1,
        // image2: image2,
        // image3: image3,
        // image4: image4,
        // image5: image5,
        ratio: window.innerWidth / 1920,
        dialogTableVisible: false,
        dialogTableVisibleVanDon: false,
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
          focusOnSelect: false,
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
        },
        srcList: [
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Heritage_Ly_Son/Ly_Son_2.jpeg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Heritage_Ly_Son/Ly_Son_3.jpeg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Heritage_Ly_Son/Ly_Son_4.jpg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Heritage_Ly_Son/Ly_Son_5.jpeg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Heritage_Ly_Son/Ly_Son_main_1.jpeg'
        ],
        srcList1: [
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Van_Don_Heritage_Road Smart_City/33df68fed28919d74098.jpg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Van_Don_Heritage_Road Smart_City/35bd239e99e952b70bf8.jpg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Van_Don_Heritage_Road Smart_City/29413b6181164a481307.jpg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Van_Don_Heritage_Road Smart_City/89527771cd0606585f17.jpg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Van_Don_Heritage_Road Smart_City/z2960208343348_92232cf51238f851b57a52ce5c8a7117.jpg'
        ],
        srcList2: ['https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Xuan_Dai_Bay/xuan_dai_bay.jpg'],
        srcList3: [
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Harbour_Van_Don/Van_Don_2.jpeg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Harbour_Van_Don/Van_Don_3.jpeg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Harbour_Van_Don/Van_Don_4.jpeg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Harbour_Van_Don/Van_Don_5.jpeg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Harbour_Van_Don/Van_Don_main_1.jpg'
        ],
        srcList4: [
          // "https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Marina_Phu Yen/Phu_Yen_Hotel dao_3.jpeg",
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Marina_Phu Yen/Phu_Yen_Santorini_4.jpeg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Marina_Phu Yen/Phu_Yen_Santorini_5.jpg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Marina_Phu Yen/Phu_Yen_Santorini_main_1.jpeg',
          'https://lynkey-production.s3.ap-southeast-1.amazonaws.com/website/our_project/Crystal_Holidays_Marina_Phu Yen/Phu_Yen_Santorini_TT_02.jpeg'
        ]
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
    background-image: url('../../../assets/image/bg-project.png');
    background-repeat: no-repeat;
    background-size: cover;

    .assets-content {
      padding: 100px 0;
    }

    .title-assets {
      max-width: 700px;
      margin-bottom: 48px;
    }
    .dialog-video {
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

    ::v-deep .wrap-slick {
      .wrap-slide:focus {
        outline: none;
      }

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

        .icon-play {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          overflow: hidden;
          cursor: pointer;

          img {
            width: 100px;
            height: 100px;
          }
        }

        .title-image {
          bottom: 40px;
          left: 40px;

          .title-image-1 {
            font-size: 36px;
            color: #ececec;
            margin-bottom: 12px;
          }

          .title-image-2 {
            font-size: 18px;
            color: #ececec;
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
          display: none;
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
      .title-image {
        .title-image-1 {
          font-size: 28px !important;
        }
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
      .assets-content {
        padding: 80px 0;
        .hide-on-tablet {
          display: none;
        }
        ::v-deep.wrap-slick {
          .slide-item {
            .image-banner {
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
      }
    }
    // mobile
    @media (max-width: 739px) {
      .assets-content {
        padding: 56px 0;
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
              font-size: 16px;
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
        ::v-deep .wrap-slick {
          .slide-item {
            margin: 0 8px !important;

            .image-banner {
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
                font-size: 12px;
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
    }
  }
</style>
