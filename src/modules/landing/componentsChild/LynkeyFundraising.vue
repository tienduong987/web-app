<template>
  <div class="fundraising">
    <div class="fundraising-content">
      <div class="content">
        <div class="title-product">
          <div class="title-folder-top">
            <img src="../../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
            <span>{{ $t('fundraising.title') }}</span>
          </div>
          <div class="title-folder-center">
            {{ $t('fundraising.token-sale') }}
          </div>
          <div class="title-folder-bottom">{{ $t('fundraising.intro') }}</div>
        </div>
        <div class="big-box-table">
          <div class="sack-k8-khoi2 ishidden">
            <div class="sack-k8-one sack-k8-one1">
              <div class="sack-k8-one-top">
                <div class="fs24-small" style="margin-right: 8px">Tokens for sale:</div>
                <div class="token-sales-number">
                  250M tokens
                  <span class="token-sales-desc">(25% of total supply)</span>
                </div>
              </div>
              <div class="sack-k8-one-bottom">
                <div class="sack-k8-bottom-left">Hard cap:</div>
                <div class="sack-k8-bottom-right">$17.5M</div>
              </div>
            </div>
            <div class="sack-k8-two">
              <div class="sack-k8-one sack-k8-one2">
                <div class="we-accept">
                  <div class="fs24-small" style="margin-right: 8px">Accept:</div>
                  <div class="fs32 white-color fs24_616">
                    <span class="sack-k8-two-mr" style="color: #ff8c00">BTC</span>
                    <span class="sack-k8-two-mr" style="color: #5e7be9">ETH</span>
                    <span class="sack-k8-two-mr" style="color: #deab27">BNB</span>
                    <span class="sack-k8-two-mr" style="color: #35bc87">USDT</span>
                    <span class="sack-k8-two-mr" style="color: #2964c8">USDC</span>
                    <span style="color: #f4bb27">BUSD</span>
                  </div>
                </div>
                <div class="soft-cap">
                  <div class="soft-cap-left">Soft cap:</div>
                  <div class="soft-cap-right">$5M</div>
                </div>
              </div>
            </div>
          </div>
          <div class="isVisible">
            <table class="table-tokens">
              <tbody>
                <tr class="fs18 table-tokens-body">
                  <td class="table-tokens-td">
                    <div class="sack-k8-one-top">
                      <div class="fs24-small" style="margin-right: 8px">Tokens for sale:</div>
                      <div class="token-sales-number">
                        250M tokens
                        <span class="token-sales-desc">(25% of total supply)</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="fs18 table-tokens-body">
                  <td class="table-tokens-td">
                    <div class="sack-k8-one-bottom">
                      <div class="sack-k8-bottom-left">Hard cap:</div>
                      <div class="sack-k8-bottom-right">$17.5M</div>
                    </div>
                  </td>
                </tr>
                <tr class="fs18 table-tokens-body">
                  <td class="table-tokens-td">
                    <div class="we-accept">
                      <div class="fs24-small" style="margin-right: 8px">Accept:</div>
                      <div class="fs32 white-color fs24_616">
                        <span class="sack-k8-two-mr" style="color: #ff8c00">BTC</span>
                        <span class="sack-k8-two-mr" style="color: #5e7be9">ETH</span>
                        <span class="sack-k8-two-mr" style="color: #deab27">BNB</span>
                        <span class="sack-k8-two-mr" style="color: #35bc87">USDT</span>
                        <span class="sack-k8-two-mr" style="color: #2964c8">USDC</span>
                        <span style="color: #f4bb27">BUSD</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="fs18 table-tokens-body">
                  <td class="table-tokens-td">
                    <div class="soft-cap">
                      <div class="soft-cap-left">Soft cap:</div>
                      <div class="soft-cap-right">$5M</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="sack-k8-table">
            <div class="container-table">
              <table class="table">
                <thead>
                  <tr class="table-success fs24">
                    <th scope="col">Round</th>
                    <th scope="col">Time start</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Goal</th>
                    <th scope="col">Min buy</th>
                    <th scope="col">Progress</th>
                    <th scope="col">Sold out</th>
                    <th scope="col" style="text-align: center">Backers</th>
                    <th scope="col" style="text-align: left; padding-right: 40px">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="fs18 table-body">
                    <td>Angel sale</td>
                    <td>Nov 25, 2021</td>
                    <td>$0.03</td>
                    <td>50M (5%)</td>
                    <td>$1.5M</td>
                    <td>${{ listRound && listRound[0].minAmount | convertCurrency }}</td>
                    <td>{{ (listRound && (listRound[0].percentageSold * 1000) / 10) | convertAmountDecimal('PERCENT') }}%</td>
                    <td v-if="statusR1 !== 'Completed'"></td>
                    <td v-else>
                      {{ listRound && listRound[0].soldOutIn | convertMs }}
                    </td>
                    <td style="text-align: center">
                      {{ listRound && listRound[0].totalBacker }}
                    </td>
                    <td style="text-align: left; padding-right: 40px">
                      {{ listRound && listRound[0].totalAvailable > 0 ? statusR1 : 'Completed' }}
                    </td>
                  </tr>
                  <tr class="fs18 table-body">
                    <td>Private sale</td>
                    <td>Dec 05, 2021</td>
                    <td>$0.05</td>
                    <td>80M (8%)</td>
                    <td>$4M</td>
                    <td>${{ listRound && listRound[1].minAmount | convertCurrency }}</td>
                    <td>{{ (listRound && (listRound[1].percentageSold * 1000) / 10) | convertAmountDecimal('PERCENT') }}%</td>
                    <td v-if="statusR2 !== 'Completed'"></td>
                    <td v-else>
                      {{ listRound && listRound[1].soldOutIn | convertMs }}
                    </td>

                    <td style="text-align: center">
                      {{ listRound && listRound[1].totalBacker > 0 ? listRound[1].totalBacker : '' }}
                    </td>
                    <td style="text-align: left; padding-right: 40px">
                      {{ listRound && listRound[1].totalAvailable > 0 ? statusR2 : 'Completed' }}
                    </td>
                  </tr>
                  <tr class="fs18 table-body">
                    <td>Pre-sale</td>
                    <td>Jan 05, 2022</td>
                    <td>$0.09</td>
                    <td>100M (10%)</td>
                    <td>$9M</td>
                    <td>${{ listRound && listRound[2].minAmount | convertCurrency }}</td>
                    <td>{{ (listRound && (listRound[2].percentageSold * 1000) / 10) | convertAmountDecimal('PERCENT') }}%</td>
                    <td v-if="statusR3 !== 'Completed'"></td>
                    <td v-else>
                      {{ listRound && listRound[2].soldOutIn | convertMs }}
                    </td>
                    <td style="text-align: center">
                      {{ listRound && listRound[2].totalBacker > 0 ? listRound[2].totalBacker : '' }}
                    </td>
                    <td style="text-align: left; padding-right: 40px">
                      {{ listRound && listRound[2].totalAvailable > 0 ? statusR3 : 'Completed' }}
                    </td>
                  </tr>
                  <tr class="fs18 table-body">
                    <td>IDO</td>
                    <td>Mar 01, 2022</td>
                    <td>$0.15</td>
                    <td>20M (2%)</td>
                    <td>$3M</td>
                    <td>${{ listRound && listRound[3].minAmount | convertCurrency }}</td>
                    <td>{{ (listRound && (listRound[3].percentageSold * 1000) / 10) | convertAmountDecimal('PERCENT') }}%</td>
                    <td v-if="statusR4 !== 'Completed'"></td>
                    <td v-else>
                      {{ listRound && listRound[3].soldOutIn | convertMs }}
                    </td>
                    <td style="text-align: center">
                      {{ listRound && listRound[3].totalBacker > 0 ? listRound[3].totalBacker : '' }}
                    </td>
                    <td style="text-align: left; padding-right: 40px">
                      {{ listRound && listRound[3].totalAvailable > 0 ? statusR4 : 'Completed' }}
                    </td>
                  </tr>
                </tbody>
                <!-- <tfoot> <tr class="table-footer fs24"> <th scope="col" style="text-align: left; padding-left: 40px"> Total </th> <th scope="col"></th> <th scope="col"></th> <th scope="col"></th> <th scope="col"></th> <th scope="col">250M</th> <th scope="col">$5.9M</th> <th scope="col"></th> </tr></tfoot> -->
              </table>
              <div class="table-mini" v-for="(item, index) in tableData" :key="index" :class="activeIco === item.id ? 'icoActive' : null">
                <div class="table-header" @click="handleOpenIDO(item.id)">
                  <span class="name">{{ item.name }}</span>
                  <span class="arrow">
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.64645 0.646447C6.84171 0.451184 7.15829 0.451184 7.35355 0.646447L13.3536 6.64645C13.5488 6.84171 13.5488 7.15829 13.3536 7.35355C13.1583 7.54882 12.8417 7.54882 12.6464 7.35355L7 1.70711L1.35355 7.35355C1.15829 7.54882 0.841709 7.54882 0.646447 7.35355C0.451184 7.15829 0.451184 6.84171 0.646447 6.64645L6.64645 0.646447Z"
                        fill="#ECECEC"
                      />
                    </svg>
                  </span>
                </div>
                <div class="body">
                  <div class="mini-line">
                    <div class="k6-mini-content1">Time start</div>
                    <div class="k6-mini-content2">{{ item.timeStart }}</div>
                  </div>
                  <div class="mini-line">
                    <div class="k6-mini-content1">Price</div>
                    <div class="k6-mini-content2">{{ item.price }}</div>
                  </div>
                  <div class="mini-line">
                    <div class="k6-mini-content1">Quantity</div>
                    <div class="k6-mini-content2">{{ item.quantity }}</div>
                  </div>
                  <div class="mini-line">
                    <div class="k6-mini-content1">Goal</div>
                    <div class="k6-mini-content2">{{ item.goal }}</div>
                  </div>
                  <div class="mini-line">
                    <div class="k6-mini-content1">Min buy</div>
                    <div class="k6-mini-content2">{{ item.min }}</div>
                  </div>
                  <div class="mini-line">
                    <div class="k6-mini-content1">Progress</div>
                    <div class="k6-mini-content2">{{ ((item.progress * 1000) / 10) | convertAmountDecimal('PERCENT') }}%</div>
                  </div>

                  <div class="mini-line">
                    <div class="k6-mini-content1">Sold out</div>
                    <div class="k6-mini-content2" v-if="item.status !== 'Completed'"></div>
                    <div class="k6-mini-content2" v-else>
                      {{ item.soldOutIn | convertMs }}
                    </div>
                  </div>
                  <div class="mini-line">
                    <div class="k6-mini-content1">Backers</div>
                    <div class="k6-mini-content2">
                      {{ item.backer ? item.backer : '' }}
                    </div>
                  </div>
                  <div class="mini-line">
                    <div class="k6-mini-content1">Status</div>
                    <div class="k6-mini-content2">
                      {{ item.totalAvailable > 0 ? item.status : 'Completed' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <lynkey-bonus />
      <div class="fundraising-bottom">
        <div class="grid wide">
          <div class="title-fund title-folder-center">
            {{ $t('bonus.fund') }}
          </div>
          <div class="fundraising-bottom-img">
            <img src="../../../assets/image/map-fund.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import defaultProject from '@/utils/firebase'
  import forEach from 'lodash/forEach'
  import LynkeyBonus from './LynkeyBonus.vue'
  // import image1 from "../../assets/image/map-fund.png";

  export default {
    components: { LynkeyBonus },
    data() {
      return {
        // image1: image1,
        activeIco: 0,
        tableData: [
          {
            name: 'Angel sale',
            timeStart: 'Nov 25, 2021',
            price: '$0.03',
            quantity: '50M (5%)',
            goal: '$1.5M',
            min: '$10K',
            progress: '',
            soldOut: '',
            backer: '',
            status: '',
            totalAvailable: '',
            id: 0
          },
          {
            name: 'Private sale',
            timeStart: 'Dec 05, 2021',
            price: '$0.05',
            quantity: '80M (8%)',
            goal: '$4M ',
            min: '$10K',
            progress: '',
            soldOut: '',
            backer: '',
            status: '',
            totalAvailable: '',
            id: 1
          },
          {
            name: 'Pre-sale',
            timeStart: 'Jan 05, 2022',
            price: '$0.09',
            quantity: '100M (10%)',
            goal: '$9M',
            min: '$50',
            progress: '',
            soldOut: '',
            backer: '',
            status: '',
            totalAvailable: '',
            id: 2
          },
          {
            name: 'IDO',
            timeStart: 'Mar 01, 2022',
            price: '$0.15',
            quantity: '20M (2%) ',
            goal: '$3M ',
            min: '$50',
            progress: '',
            soldOut: '',
            backer: '',
            status: '',
            totalAvailable: '',
            id: 3
          }
        ],
        statusR1: null,
        statusR2: null,
        statusR3: '',
        statusR4: '',
        listRound: [],
        zero: 0
      }
    },

    mounted() {
      this.handleTurnOnFirebase()
    },

    methods: {
      handleTurnOnFirebase() {
        const leadsRef = defaultProject.database().ref('crowd-sales')
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let _this = this
        this.listener = leadsRef.on('value', function (snapshot) {
          _this.listRound = snapshot.val()
          _this.handlePushContent()
          _this.handleCheckStatus()
        })
      },

      handlePushContent() {
        forEach(this.listRound, (round, index) => {
          this.tableData[index].progress = round.percentageSold
          // this.tableData[index].soldOut = round.percentageSold;
          this.tableData[index].backer = round.totalBacker
          this.tableData[index].totalAvailable = round.totalAvailable
          this.tableData[index].soldOutIn = round.soldOutIn
        })
      },

      handleCheckStatus() {
        const timeNov = this.listRound[0].fromDate.time
        const timeNovEnd = this.listRound[0].toDate.time

        const timeDec = this.listRound[1].fromDate.time
        const timeDecEnd = this.listRound[1].toDate.time

        const timeJan = this.listRound[2].fromDate.time
        const timeJanEnd = this.listRound[2].toDate.time

        const timeMar = this.listRound[3].fromDate.time
        const timeMarEnd = this.listRound[3].toDate.time

        const today = Date.now()

        if (today > timeMarEnd) {
          this.statusR1 = 'Completed'
          this.statusR2 = 'Completed'
          this.statusR3 = 'Completed'
          this.statusR4 = 'Completed'
          this.tableData[0].status = 'Completed'
          this.tableData[1].status = 'Completed'
          this.tableData[2].status = 'Completed'
          this.tableData[3].status = 'Completed'
        }
        if (today < timeNov) {
          this.statusR1 = 'Coming soon'
          this.statusR2 = 'Upcoming'
          this.statusR3 = 'Upcoming'
          this.statusR4 = 'Upcoming'
          this.tableData[0].status = 'Coming soon'
          this.tableData[1].status = 'Upcoming'
          this.tableData[2].status = 'Upcoming'
          this.tableData[3].status = 'Upcoming'
        }
        if (today >= timeNov && today <= timeNovEnd) {
          this.statusR1 = 'Ongoing'
          this.statusR2 = 'Coming soon'
          this.statusR3 = 'Upcoming'
          this.statusR4 = 'Upcoming'
          this.tableData[0].status = 'Ongoing'
          this.tableData[1].status = 'Coming soon'
          this.tableData[2].status = 'Upcoming'
          this.tableData[3].status = 'Upcoming'
        }
        if (today >= timeDec && today <= timeDecEnd) {
          this.statusR1 = 'Completed'
          this.statusR2 = 'Ongoing'
          this.statusR3 = 'Coming soon'
          this.statusR4 = 'Upcoming'
          this.tableData[0].status = 'Completed'
          this.tableData[1].status = 'Ongoing'
          this.tableData[2].status = 'Coming soon'
          this.tableData[3].status = 'Upcoming'
        }
        if (today > timeDecEnd && today <= timeJanEnd) {
          this.statusR1 = 'Completed'
          this.statusR2 = 'Completed'
          this.tableData[0].status = 'Completed'
          this.tableData[1].status = 'Completed'
          if (today < timeJan) {
            this.statusR3 = 'Coming soon'
            this.statusR4 = 'Upcoming'
            this.tableData[2].status = 'Coming soon'
            this.tableData[3].status = 'Upcoming'
          } else {
            this.statusR3 = 'Ongoing'
            this.statusR4 = 'Coming soon'
            this.tableData[2].status = 'Ongoing'
            this.tableData[3].status = 'Coming soon'
          }
        }
        if (today > timeJanEnd && today <= timeMarEnd) {
          this.statusR1 = 'Completed'
          this.statusR2 = 'Completed'
          this.statusR3 = 'Completed'
          this.tableData[0].status = 'Completed'
          this.tableData[1].status = 'Completed'
          this.tableData[2].status = 'Completed'
          if (today < timeMar) {
            this.statusR4 = 'Coming soon'
            this.tableData[3].status = 'Coming soon'
          } else {
            this.statusR4 = 'Ongoing'
            this.tableData[3].status = 'Ongoing'
          }
        }
      },

      handleOpenIDO(id) {
        if (this.activeIco === id) {
          this.activeIco = null
        } else {
          this.activeIco = id
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fundraising {
    background: #151718;
    background-image: url('../../../assets/image/bg-token.png');
    background-repeat: no-repeat;
    background-position-y: 165px;
    .fundraising-content {
      padding: 100px 0px;
    }
    .content {
      .title-product {
        text-align: center;
        margin-bottom: 66px;
      }
      .big-box-table {
        padding: 0 24px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 1366px;
        width: 100%;
        margin: 0 auto;
        .sack-k8-khoi2 {
          margin-bottom: 56px;
          display: flex;
          justify-content: space-between;
          background: #21242a;
          border-radius: 20px;
          max-height: 324px !important;
          .sack-k8-one {
            border-radius: 16px;
            min-height: 72px;
            width: 100%;
            padding: 48px 0 46px 35px;
            box-sizing: border-box;
            position: relative;
            .box-content {
              margin-bottom: 20px;
              width: 100%;
              height: 40px;
              .name-token {
                font-size: 24px;
                font-weight: 400;
                text-align: left;
                line-height: 28px;
              }
            }
            .sack-k8-one-top {
              display: flex;
              align-items: center;
              .token-sales-number {
                font-size: 32px;
                line-height: 28px;
                font-weight: 600;
              }
              .token-sales-desc {
                font-size: 24px;
                line-height: 28px;
                font-weight: 400;
                margin-left: -3px;
              }
            }
            .sack-k8-one-bottom {
              display: flex;
              align-items: center;
              margin-top: 22px;

              .sack-k8-bottom-left {
                font-size: 24px;
                line-height: 28px;
                font-weight: 400;
                margin-right: 8px;
              }
              .sack-k8-bottom-right {
                font-size: 32px;
                line-height: 40px;
                font-weight: 400;
              }
            }
            .we-accept {
              display: flex;
              align-items: center;
            }
            .soft-cap {
              display: flex;
              align-items: center;
              margin-top: 22px;
              .soft-cap-left {
                font-size: 24px;
                line-height: 28px;
                font-weight: 400;
                margin-right: 8px;
              }
              .soft-cap-right {
                font-size: 32px;
                line-height: 40px;
                font-weight: 400;
              }
            }
          }
          .sack-k8-one .box-content:last-child {
            margin-bottom: 0;
          }
          .sack-k8-one1 {
            position: relative;
          }
          .sack-k8-one1:after {
            position: absolute;
            content: '';
            top: 50%;
            transform: translateY(-50%);
            right: 0;
            height: 60%;
            width: 1px;
            background: #31353e;
          }
        }
        .sack-k8-tow {
          height: 100%;
          width: 100%;
          display: none;
        }
        .sack-k8-table {
          .table-success {
            background: rgba(49, 53, 62, 0.9);
            text-align: left;
            height: 64px;
            line-height: 64px;
            color: #ececec;
            th {
              padding-left: 24px;
              box-sizing: border-box;
            }
          }
          .table-body {
            font-size: 18px;
            font-weight: 400;
            border-bottom: 2px solid #1d1a1a;
            td {
              padding-left: 24px;
              box-sizing: border-box;
            }
          }
        }
        // .sack-k8-table {
        //   .table-body {
        //     th {
        //       padding-left: 24px;
        //       box-sizing: border-box;
        //     }
        //   }
        //   .table-body {
        //     td {
        //       padding-left: 24px;
        //       box-sizing: border-box;
        //     }
        //   }
        // }
      }
    }

    .title-folder-top {
      justify-content: center;
    }
    .sack-k8-two {
      max-width: 640px;
      width: 100%;
    }
    .sack-k8 {
      padding: 56px 0px 66px 0;
    }
    .table-footer {
      background: #26a542 !important;
      line-height: 64px;
      border-bottom: 2px solid #26a542 !important;
      text-align: left;
    }
    .container-table {
      max-width: 100%;
      margin: 0 auto;
    }
    .sack-k8-two-mr {
      margin-right: 12px;
    }
    tr.fs18 {
      height: 64px;
      line-height: 64px;
    }
    .table > :not(caption) > * > * {
      background-color: unset;
      border-bottom-width: 1px;
      box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
    }
    .tbody {
      // border: 1px solid #21242a;

      opacity: 0.9;
    }
    .table {
      border-radius: 16px 16px 0 0;
      overflow: hidden;
      max-width: 1366px;
      width: 100%;
    }
    .fundraising-center {
      padding-top: 100px;
      .big-box-bonus {
        .title-bonus {
          text-align: center;
          font-size: 48px;
          line-height: 56px;
          font-weight: 600;
          margin-bottom: 64px;
        }
        .box-bonus-web {
          display: flex;
          justify-content: space-between;
          .mini-box1,
          .mini-box2,
          .mini-box3 {
            width: 32%;
            max-width: 414px;
          }
        }
      }

      .box-bonus-mobile,
      .box-bonus-tablet {
        display: none;
      }
      .title-bonus-title {
        font-size: 32px;
        line-height: 56px;
        font-weight: 600;
        margin-bottom: 30px;
      }
      .bonus-k1-content {
        display: flex;
        align-items: center;
        margin-bottom: 70px;
      }
      .bonus-k1-desc {
        font-size: 18px;
        line-height: 24px;
        font-weight: 400;
      }
      .bonnus-img1 {
        margin-right: 24px;
      }
    }
    .fundraising-bottom {
      margin-top: 100px;
      .title-fund {
        text-align: center;
        margin-bottom: 56px;
      }
      .fundraising-bottom-img {
        text-align: center;
      }
      .fundraising-bottom-img img {
        max-width: 100%;
        margin: 0 auto;
      }
    }
    .mr40 {
      margin-right: 40px;
    }
    .table-mini.icoActive {
      transition: 0.3s linear;
      min-height: 298px !important;
      .arrow {
        transform: rotate(180deg);
      }
      .body {
        display: block;
      }
    }
    .table-mini {
      min-height: 0 !important;
      transition: 0.3s linear;
      .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .body {
        display: none;
      }
    }
    .table-mini {
      width: 100%;
      min-height: 298px;
      background-color: #ffffff;
      margin-bottom: 24px;
      display: none;
    }
    .table-header {
      width: 100%;
      min-height: 48px;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 12px 16px;
    }
    .mini-line {
      width: 100%;
      min-height: 40px;
      padding: 8px 16px;
      font-size: 16px;
      font-weight: 400;
      border-bottom: 1px solid #21242a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media (max-width: 739px) {
        font-size: 14px;
      }
    }
    .k6-mini-content1 {
      margin-right: 24px !important;
      min-width: 96px;
    }
    .k6-mini-content1,
    .k6-mini-content2 {
      display: inline-block;
    }
    .buy-minimum {
      font-size: 18px;
      line-height: 24px;
      font-weight: 400;
      color: #26a542;
      letter-spacing: 0.4px;
      margin-bottom: 10px;
      text-align: right;
    }
    .table-tokens {
      border-radius: 16px;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.9);
      margin-bottom: 56px;
      max-width: 1366px;
      width: 100%;

      .table-tokens-body {
        border-bottom: 2px solid #1d1a1a;
        display: flex;
        align-items: center;
        padding-left: 48px;
        .table-tokens-td {
          width: 100%;
        }
        .sack-k8-one-top,
        .soft-cap,
        .we-accept,
        .sack-k8-one-bottom {
          display: flex;
          align-items: center;
        }
        .sack-k8-one-top {
          .token-sales-number {
            font-size: 32px;
            line-height: 28px;
            font-weight: 600;
          }
          .token-sales-desc {
            font-size: 24px;
            line-height: 28px;
            font-weight: 400;
            margin-left: -3px;
          }
        }
        .sack-k8-one-bottom {
          .sack-k8-bottom-left {
            font-size: 24px;
            line-height: 28px;
            font-weight: 400;
            margin-right: 8px;
          }
          .sack-k8-bottom-right {
            font-size: 32px;
            line-height: 40px;
            font-weight: 400;
          }
        }
        .soft-cap-left {
          font-size: 24px;
          line-height: 28px;
          font-weight: 400;
          margin-right: 8px;
        }
        .soft-cap-right {
          font-size: 32px;
          line-height: 40px;
          font-weight: 400;
        }
      }
      .table-tokens-body:last-child {
        border-bottom: unset;
      }
      @media (max-width: 739px) {
        .table-tokens-body {
          padding-left: 18px;
          padding-right: 15px;
          .sack-k8-one-top,
          .soft-cap,
          .we-accept,
          .sack-k8-one-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .sack-k8-one-top {
            .token-sales-number {
              font-size: 14px;
              line-height: 19px;
              font-weight: 600;
              display: flex;
              flex-direction: column;
              text-align: right;
            }
            .token-sales-desc {
              font-size: 14px;
              line-height: 19px;
              font-weight: 400;
              margin-left: -3px;
            }
          }
          .sack-k8-one-bottom {
            .sack-k8-bottom-left {
              font-size: 14px;
              line-height: 17px;
              font-weight: 400;
            }
            .sack-k8-bottom-right {
              font-size: 14px;
              line-height: 19px;
              font-weight: 400;
            }
          }
          .soft-cap-left {
            font-size: 14px;
            line-height: 17px;
            font-weight: 400;
          }
          .soft-cap-right {
            font-size: 14px;
            line-height: 19px;
            font-weight: 400;
          }
        }
        .sack-k8-two-mr {
          margin-right: 8px;
        }
      }
    }
    .ishidden {
      display: block;
    }
    .isVisible {
      display: none;
    }
  }
  @media (max-width: 1500px) {
    .big-box-table {
      display: block !important;
      .mr40 {
        margin-right: unset !important;
      }
      .sack-k8-khoi2 {
        margin-bottom: 28px;
        .sack-k8-one {
          max-width: 835px !important;
          margin: 0 auto;
        }
      }
    }
    .sack-k8-table {
      .table {
        // max-width: 835px !important;
        margin: 0 auto;
      }
    }
  }
  @media (max-width: 1375px) {
    .fundraising {
      .sack-k8-one {
        flex-direction: column;
        margin-bottom: 24px;
      }
      .sack-k8-one:last-child {
        flex-direction: column;
        margin-bottom: 0px;
      }
      .sack-k8-khoi2 {
        display: flex;
        align-items: center;
      }
      .mr40 {
        margin-right: 0px;
      }
      .buy-minimum {
        display: none;
      }
    }
  }
  @media (max-width: 1350px) {
    .fundraising {
      .content {
        .big-box-table {
          .sack-k8-khoi2 {
            flex-direction: column;
            align-items: flex-start;
            .sack-k8-one {
              max-width: unset !important;
            }
            .sack-k8-one2 {
              padding-top: 0;
            }
          }
        }
      }
    }
    .ishidden {
      display: none !important;
    }
    .isVisible {
      display: block !important;
    }
  }
  @media (max-width: 1260px) {
    .big-box-table {
      padding: 0 20px;
    }
    .fundraising {
      .table {
        display: none;
      }
      .table-mini {
        width: 100%;
        min-height: 298px;
        display: block;
        background-color: #151718;
        margin-bottom: 24px;
        padding: 0 20px;
        padding-left: 0px !important;
        padding-right: 0px !important;
        border-radius: 6px;
        overflow: hidden;
      }
    }
  }
  @media (min-width: 740px) and (max-width: 1024px) {
    .fundraising {
      .fundraising-content {
        padding: 80px 0px;
      }
    }
  }
  @media (max-width: 800px) {
    // .fundraising {
    //   .table {
    //     display: none;
    //   }
    //   .table-mini {
    //     width: 100%;
    //     min-height: 298px;
    //     display: block;
    //     background-color: #151718;
    //     margin-bottom: 24px;
    //     padding: 0 20px;
    //     padding-left: 0px !important;
    //     padding-right: 0px !important;
    //   }
    // }
  }
  @media (max-width: 739px) {
    .fundraising {
      background-position-y: 64px;
      .fundraising-content {
        padding: 56px 0;
        .fundraising-bottom {
          .title-fund {
            font-size: 24px;
            line-height: 28.8px;
            font-weight: 600;
            margin-top: -60px !important;
            margin-bottom: 35px !important;
            text-align: left;
            padding: 0 24px;
          }
        }
      }
    }
    .fundraising .content {
      .title-product {
        text-align: left;
        padding: 0 20px;
      }
      .title-folder-top {
        justify-content: start;
      }
    }
    .fs24-small {
      font-size: 14px !important;
      line-height: 17px !important;
      font-weight: 400;
    }

    .table-tokens {
      .fs32 {
        font-size: 14px !important;
        font-weight: 600 !important;
      }
    }

    .fundraising .content .big-box-table .table-tokens .sack-k8-one .sack-k8-one-bottom {
      display: flex;
      align-items: center;
      margin-top: 22px;
      justify-content: space-between;
    }
  }
  @media (max-width: 623px) {
    .big-box-table {
      padding: 0 20px;
      // .sack-k8-one {
      //   display: none !important;
      // }
      .sack-k8-tow {
        display: block !important;
        min-height: 268px;
        border-radius: 16px;
        background: #21242a;
        padding: 14px 15px 23px 15px;
        box-sizing: border-box;
        .mini-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          .left {
            font-size: 14px;
            font-weight: 400;
            line-height: 19.07px;
          }
          .right {
            font-size: 14px;
            font-weight: 600;
            line-height: 19.07px;
            text-align: right;
            .color {
              display: flex;
              align-items: center;
              div {
                margin-left: 8px;
              }
            }
          }
        }
        .line {
          border-bottom: 2px solid #151718;
          margin-bottom: 16px;
        }
      }
    }
    .fundraising-bottom {
      .fundraising-bottom-img {
        padding: 0 20px;
      }
    }
  }
</style>
