<template>
  <div class="product" id="product">
    <div class="grid wide">
      <div class="title-product">
        <div class="title-folder-top">
          <img src="../../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
          <span>{{ $t('product.PRODUCT') }}</span>
        </div>
        <div class="title-folder-center">
          {{ $t('product.title') }}
        </div>
        <div class="title-folder-bottom">
          {{ $t('product.discript') }}
        </div>
      </div>
      <div class="row sack-product">
        <div class="product-style col l-3 m-6 c-12">
          <div class="box-product">
            <div class="img-product">
              <img src="../../../assets/image/img-product1.png" alt="" />
            </div>
            <div class="content-box-product">
              <div class="title-box-product">LYNK Wallet</div>
              <div class="desc-box-product">Holding of LYNK token and NFTs with transfer and swap features</div>
            </div>
          </div>
          <!-- <img src="../../../assets/image/product1.png" alt="" /> -->
        </div>
        <div class="product-style col l-3 m-6 c-12">
          <div class="box-product2">
            <div class="img-product">
              <img src="../../../assets/image/img-product2.png" alt="" />
            </div>
            <div class="content-box-product">
              <div class="title-box-product">NFT Marketplace</div>
              <div class="desc-box-product">Listing of smart tourism products as NFT for sale</div>
            </div>
          </div>
        </div>
        <div class="product-style col l-3 m-6 c-12">
          <div class="box-product3">
            <div class="img-product">
              <img src="../../../assets/image/img-product3.png" alt="" />
            </div>
            <div class="content-box-product">
              <div class="title-box-product">Trading Exchange</div>
              <div class="desc-box-product">Secondary trading of Lynk and NFT tokens</div>
            </div>
          </div>
        </div>
        <div class="product-style col l-3 m-6 c-12">
          <div class="box-product4">
            <div class="img-product">
              <img src="../../../assets/image/img-product4.png" alt="" />
            </div>
            <div class="content-box-product">
              <div class="title-box-product">Earning</div>
              <div class="desc-box-product">Wealth growth via staking and other financial incentives</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import image1 from "../../assets/image/img-product1.png";
  // import image2 from "../../assets/image/img-product2.png";
  // import image3 from "../../assets/image/img-product3.png";
  // import image4 from "../../assets/image/img-product4.png";
  export default {
    data() {
      return {
        //   image1:image1,
        //   image2:image2,
        //   image3:image3,
        //   image4:image4,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product {
    background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
    padding: 100px 0px;
    .title-product {
      text-align: center;
      margin-bottom: 56px;
      .title-folder-bottom {
        max-width: 646px;
        margin: 0 auto;
        margin-top: 16px;
      }
    }
    .title-folder-top {
      justify-content: center;
    }
    .box-product,
    .box-product2,
    .box-product3,
    .box-product4 {
      background: #21242a;
      border-radius: 20px;
      max-width: 324px;
      position: relative;
      overflow: hidden;
      height: 100%;
      .img-product {
        padding-top: 24px;
        text-align: center;
      }
      // .img-product img {
      //   width: 220px;
      //   height: 200px;
      // }
      .content-box-product {
        margin-top: 40px;
        padding: 0 24px;
      }
      .title-box-product {
        font-size: 24px;
        line-height: 28px;
        font-weight: 600;
        color: #ececec;
      }
      .desc-box-product {
        font-size: 18px;
        line-height: 24px;
        letter-spacing: 0.4px;
        padding-top: 12px;
        padding-bottom: 40px;
        color: #ececec;
      }
    }
    .product-style {
      display: flex;
    }
  }
  // tablet & mobile
  @media (max-width: 1024px) {
    .hide-on-mobile-tablet {
      display: none;
    }
  }
  // tablet
  @media (min-width: 740px) and (max-width: 1024px) {
    .product {
      padding: 80px 0;
    }
    .hide-on-tablet {
      display: none;
    }
    .product-style {
      margin-bottom: 24px;
    }
    .product-style:nth-child(3) {
      margin-bottom: 24px;
    }
    .product-style:nth-child(4) {
      margin-bottom: 24px;
    }
  }
  // mobile
  @media (max-width: 739px) {
    .hide-on-mobile {
      display: none;
    }
    .product {
      padding: 56px 0;
      .title-product {
        text-align: left;
        margin-bottom: 56px;
        padding: 0 24px;
      }
      .title-folder-top {
        justify-content: left;
      }
    }
    .product-style {
      margin-bottom: 32px;
      display: flex;
      justify-content: center;
    }
    .product-style:nth-child(4) {
      margin-bottom: 0px;
    }
  }
</style>
