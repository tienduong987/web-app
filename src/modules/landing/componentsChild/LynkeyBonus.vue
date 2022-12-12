<template>
  <div class="bonus" v-if="ischeckBonus == 1">
    <div class="title-fund title-folder-center">
      {{ $t('bonus.title') }}
    </div>
    <div class="sack-bonus">
      <div class="bonus-style">
        <div class="box-product">
          <!-- <div class="box-product-title">{{ listBonus[0].group }}</div> -->
          <div class="box-content" v-for="(itemchild, index) in listsumBonus" :key="index">
            <div :class="'img-product' + index">+{{ itemchild.bonusValue }}<span v-if="itemchild.bonusType == 'TRANSACTION_PERCENT'">%</span></div>

            <div class="box-content-des">
              {{ itemchild.descriptions.en }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="bonus-style">
        <div class="box-product3">
          <div
            class="box-content"
            v-for="(itemchild, i) in listBonus[1].programs"
            :key="i"
          >
            <div class="img-product">
              +{{ itemchild.bonusValue
              }}<span v-if="itemchild.bonusType == 'TRANSACTION_PERCENT'"
                >%</span
              >
            </div>
            <div class="box-content-des">
              {{ itemchild.descriptions.en }}
            </div>
          </div>
        </div>
      </div>
      <div class="bonus-style">
        <div class="box-product4">
          <div
            class="box-content"
            v-for="(itemchild, i) in listBonus[2].programs"
            :key="i"
          >
            <div class="img-product">
              +{{ itemchild.bonusValue
              }}<span v-if="itemchild.bonusType == 'TRANSACTION_PERCENT'"
                >%</span
              >
            </div>
            <div class="box-content-des">
              {{ itemchild.descriptions.en }}
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import request from '@/plugins/request'
  export default {
    data() {
      return {
        listBonus: [],
        ischeckBonus: '',
        listsumBonus: []
      }
    },
    methods: {
      async getBonus() {
        try {
          const result = await request.get('main/api/v1/bonus-programs/description')
          let arr = []
          this.listBonus = result.data.data
          this.listBonus.map(item => {
            arr = arr.concat(item.programs)
            this.listsumBonus = arr
          })
        } catch (error) {
          console.log(error)
        }
      },
      async checkOnOff() {
        try {
          const result = await request.get('main/api/v1/public/system-params')
          this.ischeckBonus = result.data[`system.bonus.display`]
        } catch (error) {
          console.log(error)
        }
      }
    },
    async mounted() {
      await this.checkOnOff()
      await this.getBonus()
    }
  }
</script>

<style lang="scss" scoped>
  .bonus {
    max-width: 1366px;
    margin: 0 auto;
    padding: 0 35px;
    padding-top: 100px;

    .title-fund {
      text-align: center;
    }
    .bonus-img {
      text-align: center;
    }
    img {
      max-width: 100%;
      margin: 0 auto;
    }
    //   .sack-bonus {
    //     display: grid;
    //     grid-template-columns: auto auto auto;
    //     grid-column-gap: 60px;
    //     justify-content: center;
    //   }
    .box-product {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-column-gap: 60px;
      // justify-content: center;
    }
    .box-product-title {
      font-size: 32px;
      line-height: 38px;
      font-weight: 600;
      text-align: left;
      margin-bottom: 48px;
    }
    .box-content-des {
      font-size: 18px;
      line-height: 27px;
      font-weight: 400;
      flex: 1;
      max-width: 255px;
    }
    .box-content {
      display: flex;
      align-items: center;
      text-align: left;
      margin-top: 56px;
    }
    .img-product0 {
      background: url(../../../assets/image/star.png);
      width: 73px;
      height: 85px;
      background-repeat: no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 85px;
      margin-right: 24px;
      font-size: 20px;
      font-weight: 600;
    }
    .img-product1 {
      background: url(../../../assets/image/Star2.png);
      width: 73px;
      height: 85px;
      background-repeat: no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 85px;
      margin-right: 24px;
      font-size: 20px;
      font-weight: 600;
    }
    .img-product2 {
      background: url(../../../assets/image/Star3.png);
      width: 73px;
      height: 85px;
      background-repeat: no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 85px;
      margin-right: 24px;
      font-size: 20px;
      font-weight: 600;
    }
    .img-product3 {
      background: url(../../../assets/image/Star4.png);
      width: 73px;
      height: 85px;
      background-repeat: no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 85px;
      margin-right: 24px;
      font-size: 20px;
      font-weight: 600;
    }
    .img-product4 {
      background: url(../../../assets/image/Star5.png);
      width: 73px;
      height: 85px;
      background-repeat: no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 85px;
      margin-right: 24px;
      font-size: 20px;
      font-weight: 600;
    }
    .img-product5 {
      background: url(../../../assets/image/star.png);
      width: 73px;
      height: 85px;
      background-repeat: no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 85px;
      margin-right: 24px;
      font-size: 20px;
      font-weight: 600;
    }
    .img-product6 {
      background: url(../../../assets/image/Star2.png);
      width: 73px;
      height: 85px;
      background-repeat: no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 85px;
      margin-right: 24px;
      font-size: 20px;
      font-weight: 600;
    }
    .img-product7 {
      background: url(../../../assets/image/Star3.png);
      width: 73px;
      height: 85px;
      background-repeat: no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 85px;
      margin-right: 24px;
      font-size: 20px;
      font-weight: 600;
    }
  }
  @media (max-width: 1030px) {
    .bonus {
      .box-product {
        display: grid;
        grid-template-columns: auto auto;
        grid-column-gap: 60px;
        // justify-content: center;
      }
    }
  }
  @media (max-width: 739px) {
    .bonus {
      padding: 0 24px;
      margin-top: 56px;
      .box-product {
        display: grid;
        grid-template-columns: auto;
        grid-column-gap: 60px;
        // justify-content: center;
      }
      .box-product-title {
        font-size: 18px;
        line-height: 27px;
        font-weight: 400;
        margin-top: 24px;
        margin-bottom: 13px;
      }
      .box-content {
        margin-top: 16px;
      }
      .title-fund {
        text-align: left;
      }
      .sack-bonus {
        display: grid;
        grid-template-columns: auto;
        grid-column-gap: 60px;
        justify-content: start;
      }
      .bonus-style:nth-child(3) {
        grid-column: unset;
      }
      .box-product-title {
        font-size: 18px;
        line-height: 27px;
        font-weight: 4 00;
      }
      .box-content-des {
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
      }
      .img-product0,
      .img-product1,
      .img-product2,
      .img-product3,
      .img-product4,
      .img-product5,
      .img-product6 .img-product7 {
        margin-right: 16px !important;
      }
    }
  }
</style>
