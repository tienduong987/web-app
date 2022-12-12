<template>
  <div class="box-5" id="team">
    <div class="title-1">
      <div class="title-folder">
        <div class="title-folder-top">
          <img src="../../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" class="isHiddenline" />
          <span>{{ $t('team.title') }}</span>
        </div>
        <div class="title-folder-center">{{ $t('team.team') }}</div>
      </div>
    </div>
    <div class="middle">
      <div class="grid wide">
        <div class="middle-1 jc-center">
          <div class="items-middle-1" @click="handleClickMember(1)">
            <div class="item-2 po-relative">
              <img src="../../../assets/image/ceo10.png" alt="" />
              <div class="popup-title popup-title-1 po-absolute">
                {{ $t('team.chair-skill') }}
              </div>
            </div>
            <div class="be-flex jc-center">
              <div class="title-wrap text-center">
                <p>CINDY TRAN</p>
                <p class="description">{{ $t('team.chair') }}</p>
              </div>
            </div>
          </div>
          <div class="items-middle-1" @click="handleClickMember(2)">
            <div class="item-2 po-relative">
              <img src="../../../assets/image/ceo9.png" alt="" />
              <div class="popup-title popup-title-1 po-absolute">
                {{ $t('team.DINIS-skill') }}
              </div>
            </div>
            <div class="be-flex jc-center">
              <div class="title-wrap text-center">
                <p>DINIS GUARDA</p>
                <p class="description">{{ $t('team.DINIS') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="middle-2 jc-center" style="margin-top: 65px">
          <div class="items-middle-1" @click="handleClickMember(3)">
            <div class="item-2 po-relative">
              <img src="../../../assets/image/ceo12.png" alt="" />
              <div class="popup-title po-absolute">
                {{ $t('team.HENRY-BUI-skill') }}
              </div>
            </div>
            <div class="be-flex jc-center">
              <div class="title-wrap text-center">
                <p>HENRY BUI</p>
                <p class="description">{{ $t('team.HENRY-BUI') }}</p>
              </div>
            </div>
          </div>
          <div class="items-middle-1" @click="handleClickMember(4)">
            <div class="item-2 po-relative">
              <img src="../../../assets/image/david-tran.png" alt="" />
              <div class="popup-title popup-title-1 po-absolute">
                {{ $t('team.DAVID-TRAN-Skill') }}
              </div>
            </div>
            <div class="be-flex jc-center">
              <div class="title-wrap text-center">
                <p>DAVID TRAN</p>
                <p class="description">{{ $t('team.DAVID-TRAN') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="middle-slide">
        <div class="title-1">
          <div class="title-folder">
            <div class="title-folder-center">{{ $t('team.ex-team') }}</div>
          </div>
        </div>
        <div class="wrap-slick-2">
          <VueSlickCarousel v-bind="settings" ref="carousel">
            <div class="items-middle-2" @click="handleClickMember(5)">
              <div class="item-2 po-relative">
                <img src="../../../assets/image/ceo1.png" alt="" />
                <div class="popup-title po-absolute">
                  <p>{{ $t('team.HILTON-SUPRA-skill') }}</p>
                </div>
              </div>
              <div class="be-flex jc-center">
                <div class="title-wrap text-center">
                  <p>HILTON SUPRA</p>
                  <p class="description">{{ $t('team.HILTON-SUPRA') }}</p>
                </div>
              </div>
            </div>
            <div class="items-middle-2" @click="handleClickMember(6)">
              <div class="item-2 po-relative">
                <img src="../../../assets/image/ceo2.png" alt="" />
                <div class="popup-title po-absolute">
                  <p>{{ $t('team.ASAD-SULTAN-skill') }}</p>
                </div>
              </div>
              <div class="be-flex jc-center">
                <div class="title-wrap text-center">
                  <p>ASAD SULTAN</p>
                  <p class="description">{{ $t('team.ASAD-SULTAN') }}</p>
                </div>
              </div>
            </div>
            <div class="items-middle-2" @click="handleClickMember(7)">
              <div class="item-2 po-relative">
                <img src="../../../assets/image/cto-tuan-hua.png" alt="" />
                <div class="popup-title po-absolute">
                  <p>{{ $t('team.TUAN-HUA-skill') }}</p>
                </div>
              </div>
              <div class="be-flex jc-center">
                <div class="title-wrap text-center">
                  <p>TONY HUA</p>
                  <p class="description">{{ $t('team.TUAN-HUA') }}</p>
                </div>
              </div>
            </div>
            <div class="items-middle-2" @click="handleClickMember(8)">
              <div class="item-2 po-relative">
                <img src="../../../assets/image/ceo4.png" alt="" />
                <div class="popup-title po-absolute">
                  <p>{{ $t('team.JONATHON-GOWEN-skill') }}</p>
                </div>
              </div>
              <div class="be-flex jc-center">
                <div class="title-wrap text-center">
                  <p>JONATHON GOWEN</p>
                  <p class="description">{{ $t('team.JONATHON-GOWEN') }}</p>
                </div>
              </div>
            </div>
            <div class="items-middle-2" @click="handleClickMember(9)">
              <div class="item-2 po-relative">
                <img src="../../../assets/image/ext5.png" alt="" />
                <div class="popup-title po-absolute">
                  <p>{{ $t('team.SONESH-SIRA-skill') }}</p>
                </div>
              </div>
              <div class="be-flex jc-center">
                <div class="title-wrap text-center">
                  <p>SONESH SIRA</p>
                  <p class="description">{{ $t('team.SONESH-SIRA') }}</p>
                </div>
              </div>
            </div></VueSlickCarousel
          >
        </div>
        <div class="action-slide hide-on-mobile-tablet">
          <div class="arrow arrow-left" @click="handleClickArrow('prev')">
            <span class="left"></span>
          </div>
          <div class="arrow arrow-right" @click="handleClickArrow('next')">
            <span class="right"></span>
          </div>
        </div>
        <div class="title-1" style="padding-top: 0">
          <div class="title-folder">
            <div class="title-folder-center" style="margin-top: 80px">
              {{ $t('team.adv') }}
            </div>
          </div>
        </div>
        <div class="wrap-slick-2 slide-2">
          <VueSlickCarousel v-bind="settings" ref="carousel2">
            <div class="items po-relative" @click="handleClickMember(12)">
              <img src="../../../assets/image/ceo8.png" alt="" />
              <div class="be-flex jc-center">
                <div class="title-wrap text-center">
                  <p>THOMAS LE</p>
                  <p class="description">{{ $t('team.THOMAS-LE') }}</p>
                </div>
              </div>
            </div>
            <div class="items po-relative" @click="handleClickMember(13)">
              <img src="../../../assets/image/ceo5.png" alt="" />
              <div class="title-wrap be-flex jc-center">
                <div class="text-center">
                  <p>MICHAEL TERPIN</p>
                  <p class="description">{{ $t('team.MICHAEL-TERPIN') }}</p>
                </div>
              </div>
            </div>
            <div class="items po-relative" @click="handleClickMember(14)">
              <img src="../../../assets/image/ceo6.png" alt="" />
              <div class="title-wrap be-flex jc-center">
                <div class="text-center">
                  <p>YECHUAN CHARLIE HU</p>
                  <p class="description">{{ $t('team.YECHUAN') }}</p>
                </div>
              </div>
            </div>
            <div class="items po-relative" @click="handleClickMember(15)">
              <img src="../../../assets/image/ceo7.png" alt="" />
              <div class="title-wrap be-flex jc-center">
                <div class="text-center">
                  <p>MICHAEL SUNG</p>
                  <p class="description">{{ $t('team.SUNG') }}</p>
                </div>
              </div>
            </div>
            <div class="items po-relative">
              <img src="../../../assets/image/ceo13.png" alt="" />
              <div class="title-wrap be-flex jc-center">
                <div class="text-center">
                  <p>TUAN DINH</p>
                  <p class="description">{{ $t('team.TUAN-DINH') }}</p>
                </div>
              </div>
            </div></VueSlickCarousel
          >
        </div>
        <div class="action-slide hide-on-mobile-tablet">
          <div class="arrow arrow-left" @click="handleClickArrow2('prev')">
            <span class="left"></span>
          </div>
          <div class="arrow arrow-right" @click="handleClickArrow2('next')">
            <span class="right"></span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="" :visible.sync="dialogViewNumber">
      <div class="dialog-team">
        <p>{{ detail.name }}</p>
        <p class="team-title">{{ detail.title }}</p>
        <p>{{ detail.desc }}</p>
      </div></el-dialog
    >
  </div>
</template>

<script>
  // import VueSlickCarousel from "vue-slick-carousel";
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  import VueSlickCarousel from 'vue-slick-carousel'
  // import image1 from "../../assets/image/ceo10.png";
  // import image2 from "../../assets/image/ceo9.png";
  // import image3 from "../../assets/image/ceo12.png";
  // import image4 from "../../assets/image/david-tran.png";
  // import image5 from "../../assets/image/ceo1.png";
  // import image6 from "../../assets/image/ceo2.png";
  // import image7 from "../../assets/image/cto-tuan-hua.png";
  // import image8 from "../../assets/image/ceo4.png";
  // import image9 from "../../assets/image/ext5.png";
  // import image10 from "../../assets/image/ceo8.png";
  // import image11 from "../../assets/image/ceo5.png";
  // import image12 from "../../assets/image/ceo6.png";
  // import image13 from "../../assets/image/ceo7.png";
  // import image14 from "../../assets/image/ceo13.png";

  export default {
    components: { VueSlickCarousel },
    data() {
      return {
        // image1: image1,
        // image2: image2,
        // image3: image3,
        // image4: image4,
        // image5: image5,
        // image6: image6,
        // image7: image7,
        // image8: image8,
        // image9: image9,
        // image10: image10,
        // image11: image11,
        // image12: image12,
        // image13: image13,
        // image14: image14,
        dialogViewNumber: false,
        settings: {
          dotsClass: '',
          dots: false,
          focusOnSelect: true,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: false,
          prevArrow: false,
          responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                centerMode: true
              }
            },
            {
              breakpoint: 1024,
              settings: {
                centerMode: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
                centerPadding: '20px'
              }
            },

            {
              breakpoint: 768,
              settings: {
                centerMode: true,
                slidesToShow: 3,
                // slidesToScroll: 1
                arrows: false,
                centerPadding: '30px'
              }
            },
            {
              breakpoint: 576,
              settings: {
                centerMode: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                arrows: false
              }
            }
          ]
        },
        detail: {},
        teamList: [
          {
            id: 1,
            name: 'Cindy Tran',
            title: 'Chairwoman, Expert in Property Investment and Operation Management',
            desc: 'Cindy is an professional in different fields, specialised in Operation and Business development. She used to be the representative of many groups in Vietnam and other countries in the world and earned her expertise in property management as well as various fields especially trade negotiation in European and American market. Majoring Entrepreneurship during her Master of Business Administration program at the European University, she gained expertise in Operation Management, Property Development and currently is the Chairwoman at LynKey Global Singapore.'
          },
          {
            id: 2,
            name: 'Dinis Guarda',
            title: 'Non-Executive Chairman',
            desc: 'Dinis Guarda is an author, academic, influencer, serial entrepreneur and leader in 4IR, AI, Fintech, digital transformation and Blockchain. With over two decades of experience in international business, C level positions and digital transformation, Dinis has worked with new tech, cryptocurrencies, drive ICOs, regulation, compliance, legal international processes, and has created a bank, and been involved in the inception of some of the top 100 digital currencies.'
          },
          {
            id: 3,
            name: 'Henry Bui',
            title: 'COO  Vietnam',
            desc: 'Having a Master degree in Business Administration from National Economics University, Henry has an enriching experience in Finance, Securities, and Management. He has fit himself into various roles, like advisory, chairmanship, and CEO, evolving himself during the course, and advising about the guidance and the tactic while working in these positions. Being a part of corporations like DCC Group, KTT Group, TLF Group, TrustKeys and Deputy General Manager of Trust Wallet Vietnam, Henry is specialised in the financial and management plans.'
          },
          {
            id: 4,
            name: 'David Tran',
            title: 'Board Member, Blockchain Professor (USA)',
            desc: 'David has cofounded, advised, and invested in several startups leveraging blockchain for fintech, edtech, real estate, retail, and entertainment. His goal is to apply new research and technology in every way possible to improve people’s lives, passionately and responsibly.'
          },
          {
            id: 5,
            name: 'Hilton Supra',
            title: 'Chief Business Development Officer',
            desc: 'Hilton is Vice Chairman of the Ztudium Group of companies that include techabc limited, citiesabc, openbusinesscouncil, fashionabc and has an unique high profile professional in the financial industry, asset management and fintech. Hilton is the co-founder of ztudium group an ecosystem specialised in bridging the best of AI, Fintech and Blockchain. With more than 30 years of Banking and Asset Management experience in London from Quantitative Asset Management, Capital Markets, Hedge Funds and Private Equity.'
          },
          {
            id: 6,
            name: 'Asad Sultan',
            title: 'Chief Investment Officer',
            desc: 'Asad Sultan is a twenty-five year veteran of the investment banking industry, including fifteen years in Asia. Asad Sultan is currently the Chief Executive Officer of Deutsche Malayan Ventures, a company that provides bespoke cross-border advisory services for investment and execution of high-value projects in Malaysia. He is also Senior Adviser at JT Capital Asset Management.'
          },
          {
            id: 7,
            name: 'Tony Hua',
            title: 'Chief Technology Officer',
            desc: "With more than 16 years experience in technology and tech startup as Founder/CTO/CPO, Tony Hua's career has spanned through the diverse and varied realms of software outsourcing, software solution provision for retail and e-commerce, blockchain loyalty marketing programs, school communication platform, and a collaborative suite for business and applications. He had attended lots of competitions and been awarded in High School National Mathematics Olympiad of Vietnam as well as Mathematics Contests within the country. After qualifying Bachelor in Information Technology in 2006, he has represented and successfully founded many pathbreaking technological solutions  to apply in Product Management, Customer Engagement and Blockchain loyalty program till the present in Vietnam. He is a professional in building large scale, high frequency system with millions of transactions per day, with absolute acumen in programming with various languages, software architecture, cloud computing, big data, and blockchain, to name a few."
          },
          {
            id: 8,
            name: 'Jonathan Gowen',
            title: 'Investment Advisor',
            desc: 'Senior International Private Banker with over 17 years experience in the Ultra High Net worth and Family Office space. Key trusted advisor and ""confidant"" to family business owners internationally and on multi-generational governance issues. Field of expertise: Investment Management and Private Investment Banking for UHNW and Family Offices from Developed and Global Emerging Markets. Expertise in the offshore structuring for UK Resident Non-Domiciled entrepreneurs and Non Resident clients. Sophisticated networking approach through the Investment Club transactions.'
          },
          {
            id: 9,
            name: 'Sonesh Sira',
            title: 'Partner Investment and Business Development',
            desc: 'Sonesh is currently Partner of Deutsche Malayan which provides bespoke cross-border advisory services for investment and execution of high-value projects in Malaysia, working with other leading stakeholders in government, banking and industry. He is an entrepreneur and has rich experience in investment, business development and operations.'
          },
          {
            id: 10,
            name: 'Javed Khattak',
            title: 'Financial Advisor',
            desc: 'A qualified actuary (FIA), an award winning C-suite executive, a board member and a successful serial entrepreneur with a breadth of experience, leading complex programmes within both start-ups and large corporate organisations with market cap of over £100 billion, including advising and working with senior management of FTSE100 companies and global household brands like HSBC, Thomson Reuters, GSK, M&S, Aviva, PwC and PA Consulting Group. Javed has a proven track record of delivering exceptional results and developing successful and novel solutions to challenging problems evidenced by business success along with regular achievement awards. Javed is also a firm believer in giving back to society, which is why he focuses on empowerment, financial inclusion and education based projects alongside mentoring charitable initiatives.'
          },
          {
            id: 11,
            name: 'Peter Kristensen',
            title: 'Funding Advisor',
            desc: 'Peter has an accumulated financial markets experience of over 35 years. His career began with a small Danish bank in 1986 and by the mid 1990’s he was working for Saxo Bank, one of the pioneers of the online trading industry where he became the Global Co-Head of Sales Trading and Technical Analysis. He was then seconded to Synthesis Bank, now Saxo Bank Switzerland, to establish their presence in the online trading world before leaving in 2006 to establish JP Fund Services. Peter’s capital markets background sets him apart from many other fund services executives, with a bias towards solution finding, his experience is key in helping investment managers find the right balance of trading counterparts and technology, liquidity, hedging and banking facilities for funds/blockchain companies. Peter has also launched trademakers via JP Fund Services in Switzerland a portfolio platform for alternative investments.'
          },
          {
            id: 12,
            name: 'Thomas Le',
            title: 'Senior Expert in Finance and Corporate Governance',
            desc: 'Thomas has a PhD in both Law and Buniness Administration and has built himself a high profile professional in Law and Property Management. He also has more than 20 years experience as advisor on real estate and finance for many big corporations in Vietnam such as: Sovico Corporation, Vietcombank, VietJet Air, Panasonics Corporation, etc and currently is Chairman of the Board of Directors of Everland Corporation, Director of Viethink Law Firm and Arbitrator of VIAC.'
          },
          {
            id: 13,
            name: 'Michael Terpin',
            title: 'Globe Events PR Crypto Community',
            desc: 'Michael has spent his career innovating in PR, technology platforms, and the space in between. Currently, he runs Transform Group, the world leader in blockchain and ICO PR and advisory services (75 ICOs and counting), as well as CoinAgenda, the leading conference series connecting mainstream investors with blockchain and cryptocurrency investments, which is a logical evolution from his investing experience in the bitcoin/blockchain sector since early 2013, when he co-founded BitAngels, followed by the BitAngels Dapps Fund, with David Johnston, in early 2014, which was the first digital currency fund ($6 million wholly raised in cryptocurrency).'
          },
          {
            id: 14,
            name: 'Yechuan Charlie Hu',
            title: 'Blockchain and Tech Partner',
            desc: 'Managing Partner at CarbonBlue Ventures, Cofounder of Polkabase, Expert of Web3 Ecosystems such as Polkadot and Tezos. Charlie is a specialist of Blockchain and related applications. He is the co-founder of PolkaBase with active engagement in Chinese Polkadot community. Charlie has more than 7 years of experience in blockchain industry with emphasis in community building, ecosystem development and growth marketing. He has successfully incubated and supported multiple polkadot projects to into global level. Organizer of TEDxHangzhou, Organizer of ThingsCon Shanghai. Alumni of Aspire Academy Harvard leadership program.'
          },
          {
            id: 15,
            name: 'Michael Sung',
            title: 'Blockchain and Fintech Partner',
            desc: 'Prof. Michael Sung is a technology venture builder and investor, having founded various companies in diverse high-tech industries ranging from AI, blockchain, semiconductor, and new materials industries. He is the Chairman of CarbonBlue Innovations, a cross-border tech-transfer and venture building platform that is focused on rapidly commercialising and scaling internationally-sourced blockchain, fintech, and digital finance innovation to developing countries. He has a strong background in cross-border technology transfer, strategic industry engagement, commercialisation strategy, business model innovation, and hi-tech entrepreneurship.'
          },
          {
            id: 16,
            name: 'Nitin Kalra',
            title: 'AI and ML Advisor',
            desc: 'Nitin is a self-driven, inspired senior executive with a lineage of establishing successful business from concept to commission. He is leading successfully various verticals of Alqimi Group in India since early 2008. A management graduate with dual specialisation in marketing and Information technology started his career post MBA as marketing executive in 2001 with a US based IT company and in a span of 5 years began heading the sales and marketing with complete P & L responsibilities. With a brief stint in the year 2007 at tecnova for consulting and later that year with Oracle India for developing the Oracle Unbreakable Linux market for North America moved to ALQIMI in early 2008 for establishing the presence of Alqimi Group in india. Nitin is currently responsible for Alqimi Groups initiatives in india for Big Data Analytics.Managing the Partner relationship with IBM,Leading the GTM initiative in india for Big Data Analytics & Insights for various verticals including e-commerce , Retail , Healthcare , Edutech and finance. Nitin also Manages all facets of organisation in India including planning , operations , compliances , Human resource & Sales.'
          }
        ]
      }
    },
    methods: {
      handleClickMember(id) {
        this.detail = this.teamList.filter(item => item.id === id)[0]
        this.dialogViewNumber = true
      },
      handleClickArrow(type) {
        if (type === 'next') {
          this.$refs.carousel.next()
        } else {
          this.$refs.carousel.prev()
        }
      },
      handleClickArrow2(type) {
        if (type === 'next') {
          this.$refs.carousel2.next()
        } else {
          this.$refs.carousel2.prev()
        }
      },
      myFunction() {
        let elmnt = document.getElementById('.el-dialog__body')
        elmnt.scrollTop = 0
        console.log(elmnt.scrollTop)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes chageHover {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .dialog-team {
    p:first-child {
      font-size: 48px;
      line-height: 57.6px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .team-title {
      margin-bottom: 48px;
      font-size: 24px;
      line-height: 36px;
      font-weight: 400;
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
        font-size: 34px;
        line-height: 57.6px;
        font-weight: 600;
        margin-bottom: 15px;
      }
      .team-title {
        margin-bottom: 30px;
        font-size: 20px;
        line-height: 36px;
        font-weight: 400;
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

  .title-1 {
    margin-bottom: 60px;
    padding-top: 80px;
    text-align: center;

    .title-folder-top {
      justify-content: center;
      color: #ffffff;
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
      text-align: left;
      padding-left: 20px;
      padding-top: 56px;
      .title-folder-top {
        justify-content: center;
      }
      .title-folder-center {
        font-size: 24px;
        text-align: center;
      }
      .isHiddenline {
        display: none;
      }
    }
  }

  .box-5 {
    background: linear-gradient(52.87deg, #9d3ef2 41.15%, #3036f4 100%);
    padding-bottom: 80px;

    .middle {
      .items-middle-1 {
        margin-right: 60px;
        cursor: pointer;

        &:nth-child(2n) {
          margin-right: 0;
        }
      }
      .items-middle-2 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .items-middle-2,
      .items {
        padding: 0 10px;
        cursor: pointer;
      }

      .item-2 {
        display: inline-block;
        -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);

        .popup-title {
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          text-align: center;
          padding-bottom: 55px;
          //background: linear-gradient(81.85deg, rgba(157, 62, 242, 0.8) 66.77%, rgba(48, 54, 244, 0.8) 178.94%);
          background: linear-gradient(81.85deg, rgba(157, 62, 242, 0.8) 66.77%, rgba(48, 54, 244, 0.8) 178.94%);
          opacity: 0.9;
          opacity: 0.9;
          display: flex;
          visibility: hidden;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          line-height: 24px;
          color: #ececec;
          padding-left: 3%;
          padding-right: 3%;
          animation: chageHover linear 0.2s;
          transition: height 0.4s;

          p {
            display: inline-block;
            width: 80%;
            font-size: 18px;
            line-height: 24px;
            color: #ececec;
          }
        }
        .popup-title-1 {
          padding-bottom: 75px;
        }

        &:nth-child(2n) {
          margin-right: 0;
        }

        &:hover {
          .popup-title {
            display: flex;
            visibility: visible;
            height: 35%;
          }
        }
      }

      .middle-1 {
        display: flex;
      }

      .middle-2 {
        display: flex;
      }

      .action-slide {
        display: flex;
        margin-top: 50px;
        margin-bottom: 48px;
        justify-content: center;

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

      .middle-slide {
        width: 100%;
        display: block;
        padding: 0;
        max-width: 1366px;
        margin: 0 auto;
      }

      .slide-2 {
        //.description{
        //  max-width: 300px!important;
        //}
      }

      .title-wrap {
        margin-top: 24px;

        p {
          font-size: 28px;
          font-weight: 600;
          color: #ececec;
          line-height: 28px;
        }

        .description {
          font-size: 18px;
          color: #ececec;
          margin-top: 16px;
          font-weight: 400;
          line-height: 24px;
          //max-width: 220px;
        }
      }

      @media (max-width: 1400px) {
        .wrap-slick-2 {
          .items-middle-2 {
            padding: 0 10px;
          }

          .items {
            padding: 0 10px;
          }
        }
      }

      @media (min-width: 740px) and (max-width: 1024px) {
        .popup-title {
          font-size: 14px !important;
        }

        .wrap-slick-2 {
          .items-middle-2 {
            padding: 0 5px;
          }
        }
        .action-slide {
          display: none;
          visibility: hidden;
        }
      }

      @media (max-width: 739px) {
        .popup-title {
          font-size: 12px !important;
          display: none !important;

          p {
            font-size: 12px !important;
          }
        }
        .items-middle-1 {
          margin-right: 20px !important;
          margin-left: 20px;
          margin-bottom: 38px;
          text-align: center;
        }
        .middle-1,
        .middle-2 {
          display: block;

          .items {
            margin-bottom: 50px;
            margin-right: 24px;
            margin-left: 24px;
          }
        }
        .action-slide {
          display: none;
          visibility: hidden;
        }
      }
      @media (max-width: 375px) {
        .popup-title {
          font-size: 12px !important;

          p {
            font-size: 12px !important;
          }
        }
        .middle-1,
        .middle-2 {
          display: block;

          .items {
            margin-bottom: 24px;
          }
        }
      }
    }

    .wrap-slick-2 {
      img {
        cursor: pointer;
      }

      .title-wrap {
        margin-top: 24px;

        p {
          font-size: 28px;
          font-weight: 600;
          color: #ececec;
        }

        .description {
          font-size: 18px;
          color: #ececec;
          margin-top: 16px;
          font-weight: 400;
        }
      }

      @media (max-width: 1400px) {
      }

      @media (min-width: 740px) and (max-width: 1024px) {
        .box-5 .middle .item-2 .popup-title-1 {
          padding-bottom: 55px !important;
        }
      }

      @media (max-width: 739px) {
      }
    }
  }
</style>
