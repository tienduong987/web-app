<template>
  <div class="lyn_key_2">
    <div class="box1">
      <div class="grid wide">
        <div class="title-1">
          <div class="title-folder">
            <div class="title-folder-top">
              <img src="../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
              <span>{{ $t('vesting.title') }}</span>
            </div>
            <div class="title-folder-center">{{ $t('vesting.schedule') }}</div>
            <div class="title-folder-bottom">{{ $t('vesting.intro') }}</div>
          </div>
        </div>
        <div>
          <table class="table-box1">
            <tr class="header">
              <th class="tilte-vesting-1">{{ $t('vesting.token-allo') }}</th>
              <th>{{ $t('vesting.locking') }}</th>
              <th>
                <p>{{ $t('vesting.release') }}</p>
                <p style="font-size: 18px; margin-top: 6px">({{ $t('vesting.month') }})</p>
              </th>
              <th>
                <p>{{ $t('vesting.month-release') }}</p>
              </th>
            </tr>
            <tr class="value-table" v-for="(value, index) in dataTable" :key="index">
              <td>{{ value.tokenAllocation }}</td>
              <td>
                <p>{{ value.lockingTime }}</p>
                <p>{{ value.lockingTime2 }}</p>
              </td>
              <td>{{ value.releaseTime }}</td>
              <td>{{ value.monthlyRelease }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="dropdown-box">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item v-for="(value, i) in dataTable" :title="value.tokenAllocation" :key="i" :name="i"
            ><!-- <div class="items-drop be-flex jc-between"> <div>{{$t("vesting.price")}}</div><div>{{value.initialPrice}}</div></div>-->
            <div class="items-drop be-flex jc-between">
              <div>{{ $t('vesting.locking') }}</div>
              <div>{{ value.lockingTime3 }}</div>
            </div>
            <div class="items-drop be-flex jc-between">
              <div>{{ $t('vesting.release') }}({{ $t('vesting.month') }})</div>
              <div>{{ value.releaseTime }}</div>
            </div>
            <div class="items-drop be-flex jc-between">
              <div>{{ $t('vesting.month-release') }}</div>
              <div>{{ value.monthlyRelease }}</div>
            </div></el-collapse-item
          >
        </el-collapse>
      </div>
      <div class="title-2">
        <p>{{ $t('vesting.token-release') }}</p>
      </div>
      <div class="chart-container">
        <div class="chart">
          <img src="../../assets/image/chart.png" style="" alt="" />
        </div>
      </div>
    </div>
    <document-box />
    <product-roadmap />
    <LynkeyNft />
    <lynkey-vision />
    <board-member />
    <div class="box-6">
      <div class="box-6-content">
        <div class="title-1">
          <div class="title-folder">
            <div class="title-folder-top">
              <img src="../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
              <span>{{ $t('partner.title') }}</span>
            </div>
            <div class="title-folder-center">{{ $t('partner.partner') }}</div>
          </div>
        </div>
        <div class="isComputer">
          <div class="grid wide">
            <img src="../../assets/image/icon-strategic.png" style="" alt="" />
            <div class="title-folder-center partners">Associate partners</div>
            <img src="../../assets/image/icon-partner.png" style="" alt="" />
          </div>
          <!-- <div class="grid wide">
            <img src="../../assets/image/Group-20694.png" style="" alt="" />
          </div>
          <div class="title-1">
            <div class="title-folder">
              <div class="title-folder-center">{{ $t('partner.ass') }}</div>
            </div>
          </div>
          <div class="grid wide" style="margin-bottom: 24px">
            <img src="../../assets/image/Group-20698.png" style="" alt="" />
          </div>
          <div class="grid wide" style="margin-bottom: 24px">
            <img src="../../assets/image/Group-20697.png" style="" alt="" />
          </div>
          <div class="grid wide">
            <img src="../../assets/image/Group-20699.png" style="" alt="" />
          </div> -->
        </div>
        <div class="isMobile maplogo">
          <img src="../../assets/image/logo-top.png" alt="" />
          <div class="title-folder-center partners">Associate partners</div>
          <img src="../../assets/image/logo-bottom.png" alt="" />
        </div>
      </div>
    </div>
    <new-and-video />
    <AskUsAnything />
    <download-app />
  </div>
</template>

<script>
  // import VueSlickCarousel from "vue-slick-carousel";
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  import DocumentBox from './componentsChild/DocumentBox'
  import ProductRoadmap from './componentsChild/ProductRoadmap'
  import LynkeyVision from './componentsChild/LynkeyVision'
  import BoardMember from './componentsChild/BoardMember'
  import NewAndVideo from './componentsChild/NewAndVideo'
  import LynkeyNft from './componentsChild/LynkeyNft.vue'
  import DownloadApp from './componentsChild/DownloadApp'
  // import image1 from "../assets/image/chart.png";
  // import image2 from "../assets/image/Group-20694.png";
  // import image3 from "../assets/image/Group-20698.png";
  // import image4 from "../assets/image/Group-20697.png";
  // import image5 from "../assets/image/Group-20699.png";
  // import image6 from "../assets/image/mapCon.png";
  import AskUsAnything from './componentsChild/AskUsAnything.vue'

  export default {
    props: {
      id: Number
    },
    components: {
      DocumentBox,
      ProductRoadmap,
      LynkeyVision,
      BoardMember,
      NewAndVideo,
      LynkeyNft,
      DownloadApp,
      AskUsAnything
    },
    data() {
      return {
        // image1: image1,
        // image2: image2,
        // image3: image3,
        // image4: image4,
        // image5: image5,
        // image6: image6,
        scTimer: 0,
        scY: 0,
        play: false,
        getDataDate: 80,
        activeName: 0,
        dataTable: [
          {
            tokenAllocation: 'Angel sale',
            initialPrice: '',
            lockingTime: 'Locked till listing. ',
            lockingTime2: ' Then linear monthly vesting',
            lockingTime3: ' Locked till listing. Then linear monthly vesting',
            releaseTime: 16,
            monthlyRelease: '5%',
            activeName: 0
          },
          {
            tokenAllocation: 'Private sale',
            initialPrice: '',
            lockingTime: 'Locked till listing. ',
            lockingTime2: ' Then linear monthly vesting',
            lockingTime3: ' Locked till listing. Then linear monthly vesting',
            releaseTime: 14,
            monthlyRelease: '5%'
          },
          {
            tokenAllocation: 'Pre-sale',
            initialPrice: '',
            lockingTime: 'Locked till listing. ',
            lockingTime2: ' Then linear monthly vesting',
            lockingTime3: ' Locked till listing. Then linear monthly vesting',
            releaseTime: 12,
            monthlyRelease: '5%'
          },
          {
            tokenAllocation: 'IDO',
            initialPrice: '',
            lockingTime: 'Available immediately',
            lockingTime3: 'Available immediately',
            releaseTime: 0,
            monthlyRelease: 'Floating'
          },
          {
            tokenAllocation: 'Ecosystem',
            initialPrice: '',
            lockingTime: 'Linear monthly release',
            lockingTime3: 'Linear monthly release',
            releaseTime: 36,
            monthlyRelease: '2.78%'
          },
          {
            tokenAllocation: 'Reserve/Liquidity',
            initialPrice: '',
            lockingTime: 'Linear monthly release',
            lockingTime3: 'Linear monthly release',
            releaseTime: 36,
            monthlyRelease: '2.78%'
          },
          {
            tokenAllocation: 'Farming/Staking',
            initialPrice: '',
            lockingTime: 'Locked till listing. ',
            lockingTime2: ' Then linear monthly vesting',
            lockingTime3: ' Locked till listing. Then linear monthly vesting',
            releaseTime: 36,
            monthlyRelease: '2.78%'
          },
          {
            tokenAllocation: 'Advisor/Partner',
            initialPrice: '',
            lockingTime: 'Locked till listing. ',
            lockingTime2: ' Then linear monthly vesting',
            lockingTime3: ' Locked till listing. Then linear monthly vesting',
            releaseTime: 36,
            monthlyRelease: '2.78%'
          },
          {
            tokenAllocation: 'Team',
            initialPrice: '',
            lockingTime: 'Locked till listing. ',
            lockingTime2: ' Then linear monthly vesting',
            lockingTime3: ' Locked till listing. Then linear monthly vesting',
            releaseTime: 36,
            monthlyRelease: '2.78%'
          }
        ],
        settings: {
          dotsClass: '',
          dots: false,
          focusOnSelect: true,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 4,
          touchThreshold: 5,
          arrows: true,
          prevArrow: true,
          responsive: [
            {
              breakpoint: 1399,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },

            {
              breakpoint: 767,
              settings: {
                centerMode: true,
                slidesToShow: 1
                // slidesToScroll: 1
              }
            },
            {
              breakpoint: 576,
              settings: {
                centerMode: true,
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        }
      }
    },
    computed: {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .lyn_key_2 {
    .title-1 {
      margin-bottom: 56px;
      padding-top: 100px;
      text-align: center;
      @media (max-width: 739px) {
        margin-bottom: 32px;
      }
      .title-folder-top {
        justify-content: center;
        color: #ececec;
        opacity: 0.5;
        font-size: 20px;
      }

      .title-folder-center {
        font-size: 48px;
        color: #ececec;
        font-weight: 600;
        margin-bottom: 32px;
      }

      .title-folder-bottom {
        font-size: 18px;
        color: #ececec;
      }

      @media (max-width: 1200px) {
      }

      @media (min-width: 740px) and (max-width: 1023px) {
        padding-top: 80px;
      }
      @media (max-width: 739px) {
        padding-top: 56px;
        text-align: left;
        padding-left: 20px;
        .title-folder-top {
          justify-content: left;
        }
        .title-folder-center {
          font-size: 24px;
        }
      }
    }

    .partners {
      text-align: center;
      margin: 109px 0 43px 0 !important;
      @media (max-width: 1024px) {
        margin: 60px 0 43px 0 !important;
      }
      @media (max-width: 739px) {
        text-align: left;
        margin: 32px 0 !important;
      }
    }
    .chart-container {
      max-width: 1366px;
      width: 100%;
      padding: 0 20px;
      margin: 0 auto;
    }
    .box1 {
      background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);

      .table-box1 {
        border-radius: 20px;
        overflow: hidden;
        max-width: 1366px;
        margin: 0 auto;
        width: 100%;
        .header {
          background-color: #460384;
          text-align: center;

          th {
            padding: 12px 0;
            font-weight: 600;
            font-size: 24px;
            color: #ffffff;
            vertical-align: middle;
            line-height: 28px;
            font-family: 'Open Sans';
            &:first-of-type {
              //padding-left: 40px;
              //text-align: left;
            }
          }
          .tilte-vesting-1 {
            padding-left: 40px;
            text-align: left;
          }
        }

        .value-table {
          td {
            border-bottom: 1px solid #a04eeb;
            border-right: 1px solid #a04eeb;
            background-color: #8237c7;
            font-size: 18px;
            line-height: 28px;
            color: #ffffff;
            vertical-align: middle;
            padding-top: 14px !important;
            padding-bottom: 14px !important;
            height: 84px;
            text-align: left;
          }

          td {
            &:first-of-type {
              width: 280px;
              padding: 28px 40px;
              box-sizing: border-box;
              background-color: #6019a0;
              font-size: 24px;
              color: #ffffff;
              font-weight: 600;
              line-height: 28px;
            }

            &:nth-child(3) {
              width: 306px;
              padding: 14px 28px;
              box-sizing: border-box;
              text-align: center;
            }

            &:nth-child(2) {
              width: 209px;
              padding: 28px;
              box-sizing: border-box;
              text-align: center;
            }

            &:nth-child(4) {
              width: 306px;
              padding: 28px;
              box-sizing: border-box;
              text-align: center;
            }

            &:last-of-type {
              width: 265px;
              text-align: center;
            }
          }
        }
      }

      .title-2 {
        text-align: center;
        margin-top: 86px;
        margin-bottom: 62px;

        p {
          font-size: 48px;
          color: #ffffff;
          font-weight: 600;
        }
      }

      .chart {
        padding-bottom: 100px;
        text-align: center;
      }
    }

    .box-6 {
      background-color: #1d1a1a;
      background-image: url('../../assets/image/bg-parner.png');
      background-repeat: no-repeat;
      background-size: cover;
      .box-6-content {
        padding-bottom: 100px;
      }
      .isMobile {
        display: none;
      }
      .isComputer {
        display: block;
      }
      @media (max-width: 739px) {
        .maplogo {
          text-align: center;
          padding: 0 20px;
        }
        .isMobile {
          display: block !important;
        }
        .isComputer {
          display: none !important;
        }
      }
    }

    @media (min-width: 1200px) {
      .dropdown-box {
        display: none;
        visibility: hidden;
      }
    }
    @media (min-width: 768px) and (max-width: 1200px) {
      .table-box1 {
        display: none;
        visibility: hidden;
      }
    }
    @media (min-width: 740px) and (max-width: 1024) {
      .title-2 {
        p {
          font-size: 24px !important;
        }
      }
      .box1 {
        .chart {
          padding-bottom: 80px;
        }
      }
      .grid {
        .wide {
          max-width: unset !important;
          padding: 0 20px;
        }
      }
    }
    @media (max-width: 768px) {
      .title-2 {
        text-align: left !important;
        padding-left: 20px;

        p {
          font-size: 24px !important;
        }
      }
      .table-box1 {
        display: none;
        visibility: hidden;
      }
    }

    @media (max-width: 739px) {
      .box1 {
        .chart {
          padding-bottom: 56px;
          // padding-left: 20px;
          // padding-right: 20px;
        }
      }
    }
    @media (max-width: 375px) {
      .table-box1 {
        display: none;
        visibility: hidden;
      }
    }
  }
</style>
