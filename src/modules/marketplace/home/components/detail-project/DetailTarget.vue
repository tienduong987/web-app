<template>
  <div class="detail-target">
    <h3 class="header-6 mb-24 text-semibold text-title uppercase">
      {{ $t('market-detail.title-target') }}
    </h3>
    <div class="target-item target-above">
      <div class="be-flex item">
        <span class="body-small text-medium"> {{ $t('market-detail.irr') }}</span>
        <span class="header-6 text-semibold">28.45%</span>
      </div>
      <div class="be-flex item">
        <span class="body-small text-medium"> {{ $t('market-detail.equity') }}</span>
        <span class="header-6 text-semibold">2.02x</span>
      </div>
      <div class="be-flex item">
        <span class="body-small text-medium"> {{ $t('market-detail.hold') }}</span>
        <span class="header-6 text-semibold">3 year</span>
      </div>
      <div class="be-flex item">
        <span class="body-small text-medium"> {{ $t('market-detail.min') }}</span>
        <span class="header-6 text-semibold">$50K</span>
      </div>
    </div>
    <div class="target-item target-below">
      <div class="be-flex item">
        <span class="body-small text-medium"> {{ $t('market-detail.year-1') }}</span>
        <span class="header-6 text-semibold">5.25%</span>
      </div>
      <div class="be-flex item">
        <span class="body-small text-medium"> {{ $t('market-detail.stabilized') }}</span>
        <span class="header-6 text-semibold">10.56% in Y2</span>
      </div>
      <div class="be-flex item">
        <span class="body-small text-medium"> {{ $t('market-detail.first-distribution') }}</span>
        <span class="header-6 text-semibold">Jun 2022</span>
      </div>
      <div class="be-flex item">
        <span class="body-small text-medium"> {{ $t('market-detail.frequency') }}</span>
        <span class="header-6 text-semibold">Quarterly</span>
      </div>
    </div>
    <button type="button" class="header-6 text-semibold text-white is-none-border cursor btn-target">{{ $t('market-detail.apply') }}</button>
    <button type="button" class="header-6 cursor btn-ask">{{ $t('market-detail.ask') }}</button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class DetailTarget extends Vue {}
</script>

<style lang="scss" scoped>
  .detail-target {
    padding: 24px;
    box-shadow: 0px 1.2px 3.6px rgba(0, 0, 0, 0.1), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13);
    border-radius: 8px;

    .target-item {
      .item {
        justify-content: space-between;
        margin-bottom: 16px;
        span:first-child {
          color: var(--bc-text-discript);
        }
      }
    }
    .target-above {
      border-bottom: 1px solid #dbdbdb;
      margin-bottom: 16px;
    }
    .btn-target {
      width: 100%;
      padding: 12px 0;
      background: linear-gradient(10deg, #9d3ef2 40.29%, #3036f4 97.93%);
      border-radius: 4px;
      margin-top: 16px;
    }
    .btn-ask {
      width: 100%;
      padding: 12px 0;
      margin-top: 16px;
      border-radius: 4px;
      background: #fff;
      border: 1px solid #dbdbdb;
      &:hover {
        background: linear-gradient(10deg, #9d3ef2 40.29%, #3036f4 97.93%);
        color: #fff;
      }
    }
  }
</style>
