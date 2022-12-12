<template>
  <div class="box-7">
    <div class="title-box">
      <div class="title-1">
        <div class="title-folder">
          <div class="title-folder-top">
            <img src="../../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
            <span>{{ $t('media.title') }}</span>
          </div>
          <div class="title-folder-center">
            <div>{{ $t('media.media') }}</div>
            <div v-if="listPost.length && listPost.length === 4 ? isBtn : true" class="action-slide hide-on-mobile-tablet">
              <div class="arrow arrow-left" @click="handleClickArrow('prev')">
                <span class="left"></span>
              </div>
              <div class="arrow arrow-right" @click="handleClickArrow('next')">
                <span class="right"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="wrap-slick-2">
        <VueSlickCarousel v-bind="settings" ref="carousel" v-if="listPost.length">
          <div class="items-slide" v-for="item in listPost" :key="item.id">
            <a :href="item.url" target="_blank">
              <img :src="item.background" width="353" height="199" style="" alt="" />
              <p class="title-slide">{{ item.title }}</p>
              <div class="view-more text-left">
                <a :href="item.url" target="_blank"
                  >{{ $t('media.view-more')
                  }}<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.1747 18.2617C5.06216 18.2617 0.917625 14.2323 0.917625 9.26172C0.917625 4.29116 5.06216 0.261719 10.1747 0.261719C15.2873 0.261719 19.4318 4.29116 19.4318 9.26172C19.4318 14.2323 15.2873 18.2617 10.1747 18.2617ZM13.204 9.30345L9.89122 6.08265H9.88628C9.84202 6.0324 9.78755 5.99159 9.7263 5.96278C9.66505 5.93397 9.59833 5.91778 9.53034 5.91522C9.46235 5.91267 9.39454 5.92381 9.33119 5.94794C9.26783 5.97207 9.21029 6.00868 9.16218 6.05546C9.11406 6.10223 9.07641 6.15818 9.05159 6.21977C9.02677 6.28137 9.01532 6.34729 9.01794 6.41339C9.02057 6.4795 9.03722 6.54436 9.06685 6.60391C9.09649 6.66346 9.13846 6.71642 9.19015 6.75945L11.8019 9.30345C11.8489 9.34933 11.8753 9.41147 11.8753 9.47625C11.8753 9.54103 11.8489 9.60316 11.8019 9.64905L9.19015 12.193C9.09783 12.2834 9.04623 12.4058 9.0467 12.5331C9.04716 12.6605 9.09965 12.7825 9.19262 12.8722C9.28558 12.962 9.41141 13.0122 9.54243 13.0117C9.67344 13.0113 9.7989 12.9602 9.89122 12.8698L13.204 9.64905C13.251 9.60316 13.2775 9.54103 13.2775 9.47625C13.2775 9.41147 13.251 9.34933 13.204 9.30345Z"
                      fill="white"
                    />
                  </svg>
                </a></div
            ></a></div
        ></VueSlickCarousel>
      </div>
    </div>
  </div>
</template>

<script>
  // import VueSlickCarousel from "vue-slick-carousel";
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  import VueSlickCarousel from 'vue-slick-carousel'

  // import { initializeApp } from "firebase/app";
  // import { getAnalytics } from "firebase/analytics";
  import defaultProject from '@/utils/firebase'

  export default {
    components: { VueSlickCarousel },
    data() {
      return {
        isBtn: false,
        ischeck: false,
        settings: {
          centerMode: true,
          focusOnSelect: true,
          infinite: true,
          adaptiveHeight: false,
          slidesToShow: 4,
          speed: 500,
          slidesToScroll: 1,
          arrows: false,
          centerPadding: '100px',
          initialSlide: 2,
          lazyLoad: 'ondemand',
          responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
                centerMode: true,
                centerPadding: '100px',
                initialSlide: 1
              }
            },
            {
              breakpoint: 1072,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                centerMode: true,
                centerPadding: '100px',
                initialSlide: 1
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                centerMode: true,
                centerPadding: '70px',
                initialSlide: 1
              }
            },
            {
              breakpoint: 625,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                centerMode: true,
                centerPadding: '20px',
                initialSlide: 0
              }
            },
            {
              breakpoint: 440,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                initialSlide: 0
              }
            }
          ]
        },

        listPost: []
      }
    },

    mounted() {
      this.getMyStory()
      // await this.checktNewVideo();
    },

    methods: {
      handleClickArrow(type) {
        if (type === 'next') {
          this.$refs.carousel.next()
        } else {
          this.$refs.carousel.prev()
        }
      },
      getMyStory() {
        defaultProject
          .firestore()
          // .collection('lynkey-news')
          .collection('lynkey-news-test')
          .get()
          .then(querySnapshot => {
            // console.log("querySnapshot", querySnapshot);
            // this.listPost = querySnapshot.data().sort(function (a, b) {
            //   return a.id - b.id;
            // });

            querySnapshot.forEach(doc => {
              this.listPost.push(doc.data())
            })
            //   const posts = Post.data();

            this.listPost.sort((a, b) => b.id - a.id)

            // });
          })
      }
      // async checktNewVideo() {
      //   if (this.listPost && this.listPost.length === 4) {
      //     console.log("1");
      //   }
      // },
    }
  }
</script>

<style lang="scss" scoped>
  .title-1 {
    margin-bottom: 56px;
    padding-top: 80px;
    text-align: left;
    margin-left: 280px;
    //margin-right: 280px;

    .title-folder-top {
      color: #ececec;
      opacity: 0.5;
      font-size: 20px;
    }

    .title-folder-center {
      font-size: 48px;
      color: #ececec;
      font-weight: 600;
      margin-bottom: 32px;
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
            margin-bottom: 13px;
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

    .title-folder-bottom {
      font-size: 18px;
      color: #ececec;
    }
  }

  .box-7 {
    background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
    // padding-bottom: 100px;

    .wrap-slick-2 {
      padding-bottom: 100px;
      .items-slide {
        border-radius: 20px;
        background-color: #21242a;
        padding: 24px 24px 40px 24px;
        //margin-right: 53px;
        a {
          text-decoration: none;
        }
        img {
          margin-bottom: 29px;
          width: 100%;
        }

        .title-slide {
          margin-bottom: 50px;
          color: #ececec;
          font-size: 24px;
          font-weight: 400;
          line-height: 33px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
        }
      }
    }

    .view-more {
      font-size: 18px;

      a {
        text-decoration: none;
        color: #ececec;
        display: flex;
      }

      svg {
        margin-left: 9px;
      }
    }
  }

  @media (min-width: 1200px) {
    .title-box {
    }
    .title-1 {
      margin-left: 250px !important;

      .title-folder-top {
      }

      .title-folder-center {
      }
    }
    .action-slide {
      margin-right: 250px !important;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .title-box {
      display: flex;
      justify-content: center;
      margin: 0 auto;
    }
    .title-1 {
      margin-bottom: 40px;
      margin-left: 0;

      .title-folder-top {
        font-size: 18px;
        justify-content: center;
      }

      .title-folder-center {
        font-size: 32px;
        width: 510px;
        justify-content: center;
      }
    }
    .action-slide {
      display: none !important;
      visibility: hidden;
    }
  }

  @media (max-width: 767px) {
    .items-slide {
      .title-slide {
        font-size: 16px !important;
        margin-bottom: 42px !important;
      }
    }
    .box-7 {
      .action-slide {
        display: none !important;
        visibility: hidden;
      }
    }
  }
  @media (max-width: 739px) {
    .title-1 {
      margin-left: 20px !important;
      margin-right: 0;
      margin-bottom: 30px;
      padding-top: 56px;

      .title-folder-top {
        font-size: 20px;
      }

      .title-folder-center {
        height: 40px;
        font-size: 24px;
      }
    }
    .view-more {
      font-size: 14px !important;
      line-height: 120%;
    }
  }
</style>
