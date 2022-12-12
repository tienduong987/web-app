<template>
  <div class="detail-header" :style="isShowCompProduct ? 'margin-top:24px' : null">
    <div class="container be-flex align-center jc-space-between breadcrumb">
      <el-breadcrumb separator-class="el-icon-d-arrow-right">
        <el-breadcrumb-item :to="{ name: 'MarketPlace' }" class="body-base">Marketplace</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'MarketPlace' }" class="body-base">Real Estate</el-breadcrumb-item>
        <el-breadcrumb-item v-if="isShowCompProduct" :to="{ name: 'DetailProject', params: { type: 'project', id: product.projectId } }" class="body-base">{{
          product.projectName
        }}</el-breadcrumb-item>
        <el-breadcrumb-item v-else class="body-base">{{ project.projectName }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="isShowCompProduct" class="body-base">{{ product.propertyName }}</el-breadcrumb-item>
      </el-breadcrumb>
      <!--      <div class="title__right" v-if="isShowCompProduct">-->
      <!--        <div class="be-flex align-center cursor btn-title">-->
      <!--          <base-icon icon="icon-share" size="28" class="d-iflex" />-->
      <!--          <span class="body-base d-ib text">Share</span>-->
      <!--        </div>-->
      <!--        <div class="be-flex align-center cursor btn-title">-->
      <!--          <base-icon icon="icon-favourite" size="28" class="d-iflex" />-->
      <!--          <span class="body-base d-ib text">Favorite</span>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <div class="container be-flex align-center jc-space-between title" v-if="!isShowCompProduct">
      <div class="title__left">
        <p class="header-2 text-semibold mb-8">{{ project.projectName }}</p>
        <p class="body-base" v-if="project.address || project.cityName">{{ project.address }}{{ project.address ? ', ' : '' }} {{ project.cityName }}</p>
      </div>
      <!--      <div class="title__right">-->
      <!--        <div class="be-flex align-center cursor btn-title">-->
      <!--          <base-icon icon="icon-share" size="28" class="d-iflex" />-->
      <!--          <span class="body-base d-ib text">Share</span>-->
      <!--        </div>-->
      <!--        <div class="be-flex align-center cursor btn-title">-->
      <!--          <base-icon icon="icon-favourite" size="28" class="d-iflex" />-->
      <!--          <span class="body-base d-ib text">Favorite</span>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <div class="image-carousel" v-if="isShowCarousel">
      <VueSlickCarousel v-bind="settings" ref="carousel">
        <div class="item" v-for="item in mediaList.images" :key="item.id">
          <img :src="item.mediaUrl" :alt="item.mediaUrl" />
        </div>
      </VueSlickCarousel>
      <div class="btn-crousel cursor prev" @click="handleClickArrow('prev')">
        <base-icon icon="icon-prev" size="32" class="d-iflex" />
      </div>
      <div class="btn-crousel cursor next" @click="handleClickArrow('next')">
        <base-icon icon="icon-next" size="32" class="d-iflex" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import VueSlickCarousel from 'vue-slick-carousel'

  @Component({ components: { VueSlickCarousel } })
  export default class DetailHeader extends Vue {
    @Prop({ required: true, type: Object, default: () => ({}) }) project!: Record<string, any>
    @Prop({ required: true, type: Object, default: () => ({}) }) product!: Record<string, any>
    @Prop({ required: true, type: Object, default: () => ({}) }) mediaList!: Record<string, any>
    settings: Record<string, any> = {
      dots: false,
      infinite: true,
      centerMode: true,
      centerPadding: '30px',
      slidesToShow: 2,
      slidesToScroll: 1,
      variableWidth: true
    }
    dataCarousel: Array<Record<string, any>> = [
      {
        id: 0,
        url: 'https://via.placeholder.com/553x352'
      },
      {
        id: 1,
        url: 'https://via.placeholder.com/553x352'
      },
      {
        id: 2,
        url: 'https://via.placeholder.com/553x352'
      },
      {
        id: 3,
        url: 'https://via.placeholder.com/553x352'
      }
    ]

    get isShowCompProduct(): boolean {
      return this.$route.params.type === 'product'
    }

    get isShowCarousel(): boolean {
      return this.mediaList && this.mediaList.images && this.mediaList.images.length
    }

    //method
    handleClickArrow(type: 'prev' | 'next'): void {
      if (type === 'prev') {
        //@ts-ignore
        this.$refs['carousel']?.prev()
      } else {
        //@ts-ignore
        this.$refs['carousel']?.next()
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep.detail-header {
    margin: 40px 0;

    .breadcrumb {
      margin-bottom: 24px;
      .is-link {
        color: var(--bc-text-hyperlink) !important;
        font-weight: 400 !important;
      }
      .el-breadcrumb__inner {
        color: #5b616e;
      }
    }

    .title {
      margin-bottom: 24px;
      &__left {
        span {
          opacity: 0.7;
        }
      }
      &__right {
        display: flex;

        .btn-title {
          padding: 8px 16px;
          height: 40px;
          border: 1px solid #dbdbdb;
          border-radius: 4px;
        }
        .btn-title:first-child {
          margin-right: 24px;
        }
      }
    }

    .image-carousel {
      position: relative;
      overflow: hidden;
      .slick-slide {
        margin-right: 4px;
      }
      img {
        max-width: 572px;
        width: 100%;
        height: 352px;
      }

      .btn-crousel {
        position: absolute;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .prev {
        top: 50%;
        left: 40px;
        transform: translateY(-50%);
      }
      .next {
        top: 50%;
        right: 40px;
        transform: translateY(-50%);
      }
    }
  }
</style>
