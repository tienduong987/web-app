<template>
  <div class="box-4-content">
    <div class="box-4 po-relative">
      <div class="main-content">
        <img src="../../../assets/image/Group-20707.png" style="" alt="" />
        <div>
          <div class="title-1 title-2">
            <div class="title-folder">
              <div class="title-folder-top">
                <img src="../../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
                <span>{{ $t('about.title') }}</span>
              </div>
              <div class="title-folder-center text-left">
                {{ $t('about.about') }}
              </div>
              <div class="title-folder-bottom text-left">
                {{ $t('about.intro-1') }}
              </div>
              <div class="title-folder-bottom text-left" style="margin-top: 16px">
                {{ $t('about.intro-2') }}
              </div>
              <div class="view-more text-left" @click="dialogTableVisible = true" style="margin-top: 32px">
                <div class="content-view">
                  {{ $t('about.view-more')
                  }}<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.1747 18.2617C5.06216 18.2617 0.917625 14.2323 0.917625 9.26172C0.917625 4.29116 5.06216 0.261719 10.1747 0.261719C15.2873 0.261719 19.4318 4.29116 19.4318 9.26172C19.4318 14.2323 15.2873 18.2617 10.1747 18.2617ZM13.204 9.30345L9.89122 6.08265H9.88628C9.84202 6.0324 9.78755 5.99159 9.7263 5.96278C9.66505 5.93397 9.59833 5.91778 9.53034 5.91522C9.46235 5.91267 9.39454 5.92381 9.33119 5.94794C9.26783 5.97207 9.21029 6.00868 9.16218 6.05546C9.11406 6.10223 9.07641 6.15818 9.05159 6.21977C9.02677 6.28137 9.01532 6.34729 9.01794 6.41339C9.02057 6.4795 9.03722 6.54436 9.06685 6.60391C9.09649 6.66346 9.13846 6.71642 9.19015 6.75945L11.8019 9.30345C11.8489 9.34933 11.8753 9.41147 11.8753 9.47625C11.8753 9.54103 11.8489 9.60316 11.8019 9.64905L9.19015 12.193C9.09783 12.2834 9.04623 12.4058 9.0467 12.5331C9.04716 12.6605 9.09965 12.7825 9.19262 12.8722C9.28558 12.962 9.41141 13.0122 9.54243 13.0117C9.67344 13.0113 9.7989 12.9602 9.89122 12.8698L13.204 9.64905C13.251 9.60316 13.2775 9.54103 13.2775 9.47625C13.2775 9.41147 13.251 9.34933 13.204 9.30345Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="" :visible.sync="dialogTableVisible">
      <div class="dialog-visition">
        <p>LynKey Vision</p>
        <p>Creating a blockchain-enabled ecosystem for luxury resort and tourism investment</p>
        <p>
          LynKey is a blockchain-enabled ecosystem that provides timeshare and NFT solutions for luxurious holiday experiences for the global audience via smart contracts. The
          tourists, business travellers, travel agencies, tourism operators, hospitality chains, and property clients from all over the world are increasingly accepting this
          revolutionary scheme. The premium vacation property- resorts, hotels, marinas, and many more are sliced to smaller fractions as digital assets.
        </p>
        <p>
          These digital assets or NFTs could be staked or lent over the marketplace to earn profits. You are able to combat the associated risks that arise due to jurisdiction
          matters. Moreover, the security provided by digital contracts is a benefit that is welcomed by property investors all over the world.
        </p>
        <p>
          Blockchain inundation has guaranteed transparency and decentralized system, thereby democratizing it entirely for the members of the LynKey community. Its overall system
          architecture links the enthusiasts with attractions in an increasingly reliable way
        </p>
        <p>
          Besides DeFi protocols, the project has been designed with a framework of products like digital wallet, NFT marketplace, and a crypto exchange. Not only that, the reward
          and loyalty credit system make the entire vacation experience consensually efficient and liquid.
        </p>
        <p>
          LynKey’s smart “All in one” ecosystem is valued at $8B+, and identifies the key sites in Vietnam and SouthEast Asia, and more prospective properties globally. It aims to
          create a seamless community that is exemplary in its existence for the 4IR smart city concept.
        </p>
        <p>
          With LynKey, we intend to fraternise the global enthusiasts who pledge to evolve with the technology, and find real-time solutions to teh conventional operational
          challenges.
        </p>
        <p>Become a privileged member of the LynKey Ecosystem. Get your LynK!</p>
      </div></el-dialog
    >
  </div>
</template>

<script>
  // import image1 from "../../assets/image/Group-20707.png";
  export default {
    data() {
      return {
        // image1: image1,
        dialogTableVisible: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title-1 {
    margin-bottom: 60px;
    text-align: center;
    .title-folder-top {
      justify-content: center;
      color: #ececec;
      opacity: 0.5;
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
  }

  .box-4 {
    padding-top: 100px;
    padding-bottom: 100px;
    background-color: #151718;
    background-image: url('../../../assets/image/bg-aboutus.png');
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 2;
    overflow: hidden;
    height: auto;
    background-position-y: 138px;
    .main-content {
      position: inherit;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1366px;
      margin: 0 auto;
      padding: 0 20px;

      .title-2 {
        z-index: 3;
      }
    }

    .title-2 {
      margin-left: 140px;
      max-width: 600px;

      .title-folder-top {
        display: flex;
        justify-content: left;

        span {
          color: #ececec;
          opacity: 0.5;
        }
      }

      .view-more {
        svg {
          margin-left: 12px;
        }

        a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #ececec;
          font-size: 18px;
        }
      }
    }

    #trapezium {
      display: inline-block;
      top: -89%;
      right: -46px;
      z-index: 2;

      img {
        filter: invert(0%) sepia(13%) saturate(3207%) hue-rotate(182deg) brightness(0%) contrast(76%);
      }

      //height: 0;
      //width: 300px;
      //border-bottom: 1000px solid #1b1d25;
      //border-left: 157px solid transparent;
      //border-right: 182px solid transparent;
      //transform: rotate(220deg);
    }

    #trapezium2 {
      display: inline-block;
      top: -133%;
      right: 32%;
      z-index: 2;

      img {
        filter: invert(0%) sepia(13%) saturate(3207%) hue-rotate(182deg) brightness(0%) contrast(76%);
      }

      //height: 0;
      //width: 277px;
      //border-bottom: 1102px solid #1b1d25;
      //border-left: 262px solid transparent;
      //border-right: 315px solid transparent;
      //transform: rotate(
      //        143deg);
    }
  }
  .content-view {
    display: flex;
    cursor: pointer;
  }
  .dialog-visition {
    p:first-child {
      font-size: 48px;
      line-height: 57.6px;
      font-weight: 600;
      margin-bottom: 56px;
    }
    p {
      margin-bottom: 20px;
      font-size: 18px;
      line-height: 27px;
      font-weight: 400;
      color: #fff;
    }
    @media (min-width: 740px) and (max-width: 1024px) {
      p:first-child {
        font-size: 32px !important;
        line-height: 57.6px;
        font-weight: 600;
        margin-bottom: 20px;
      }
    }
    @media (max-width: 739px) {
      p:first-child {
        font-size: 24px;
        line-height: 57.6px;
        font-weight: 600;
        margin-bottom: 20px;
      }
      p {
        margin-bottom: 15px;
        font-size: 16px;
        line-height: 27px;
        font-weight: 400;
        color: #fff;
      }
    }
  }
  @media (max-width: 1023px) {
    .box-4 {
      .main-content {
        flex-direction: column-reverse;
      }
    }
  }
  @media (max-width: 1200px) {
    .main-content {
      flex-direction: column-reverse;
      justify-content: center;
    }
    .box-4 {
      .title-2 {
        margin-left: 0px;
        max-width: 600px;
        .title-folder-top {
          justify-content: center;
        }
      }
      .text-left {
        text-align: center;
      }
    }
  }
  @media (min-width: 740px) and (max-width: 1200px) {
    .box-4 {
      .title-2 {
        margin-left: 0px;
        max-width: unset;
        padding: 0 40px;
      }
      .text-left {
        text-align: center;
      }
      .content-view {
        justify-content: center;
      }
    }
  }
  @media (min-width: 740px) and (max-width: 1023px) {
    .main-content {
      flex-direction: column;
      justify-content: center;
    }
    .box4 {
      padding-top: 80px;
      padding-bottom: 80px;
    }
  }

  @media (max-width: 739px) {
    .main-content {
      flex-direction: column;
      justify-content: center;
    }
    .box-4 {
      padding-top: 56px;
      padding-bottom: 56px;
      .title-2 {
        .title-folder-top {
          justify-content: left;
        }
      }
      .text-left {
        text-align: left;
      }
    }
  }
</style>
