<template>
  <div class="detail-analytic">
    <h3 class="header-6 mb-24 text-semibold text-title uppercase">
      {{ $t('market-detail.title-analytic') }}
    </h3>
    <div class="content">
      <div class="be-flex header">
        <div></div>
        <div class="body-small text-semibold">AIRBNB</div>
        <div class="body-small text-semibold">TRADITIONAL</div>
      </div>
      <div class="be-flex item">
        <div class="body-small text-medium text-discript item-child">Rental Income</div>
        <div class="be-flex-column item-child">
          <span class="body-base">$2,959.27</span>
          <span class="body-small text-discript">$164.90/night</span>
        </div>
        <div class="be-flex-column item-child">
          <span class="body-base">$2,959.27</span>
          <span class="body-small text-discript">$164.90/night</span>
        </div>
      </div>
      <div class="be-flex item">
        <div class="body-small text-medium text-discript item-child">Expenses</div>
        <div class="be-flex-column item-child">
          <span class="body-base">$2,959.27</span>
        </div>
        <div class="be-flex-column item-child">
          <span class="body-base">$2,959.27</span>
        </div>
      </div>
      <div class="be-flex item">
        <div class="body-small text-medium text-discript item-child">Cash flow</div>
        <div class="be-flex-column item-child">
          <span class="body-base">$862.93 </span>
        </div>
        <div class="be-flex-column item-child">
          <span class="body-base">$862.93 </span>
        </div>
      </div>
      <div class="be-flex item">
        <div class="body-small text-medium text-discript item-child">Cash on cash</div>
        <div class="be-flex-column item-child">
          <span class="body-base amount-decrease">1.35% </span>
        </div>
        <div class="be-flex-column item-child">
          <span class="body-base amount-increase">28.45%</span>
        </div>
      </div>
      <div class="be-flex item">
        <div class="body-small text-medium text-discript item-child">Cap rate</div>
        <div class="be-flex-column item-child">
          <span class="body-base">1.45%</span>
        </div>
        <div class="be-flex-column item-child">
          <span class="body-base">2.45%</span>
        </div>
      </div>
      <div class="be-flex item">
        <div class="body-small text-medium text-discript item-child">10 year payback balance</div>
        <div class="be-flex-column item-child">
          <span class="body-base">$335,080.00</span>
        </div>
        <div class="be-flex-column item-child">
          <span class="body-base">$347,112.15</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class DetailAnalytic extends Vue {}
</script>

<style lang="scss" scoped>
  .detail-analytic {
    padding: 24px;
    box-shadow: 0px 1.2px 3.6px rgba(0, 0, 0, 0.1), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13);
    border-radius: 8px;
    margin-top: 48px;
    .content {
      .header {
        height: 48px;

        background: #f3f2f1;
        div {
          line-height: 48px;
          width: 33.3333%;
          text-align: right;
          padding-right: 16px;
        }
      }
      .item {
        height: 64px;
        align-items: center;
        border-bottom: 1px solid #dbdbdb;
        .item-child {
          width: 33.33333%;
          text-align: right;
          padding-right: 16px;
        }
        .item-child:first-child {
          text-align: left;
          padding-left: 16px;
          padding-right: 0;
        }
      }
      .item:last-child {
        border: none;
      }
      .text-discript {
        color: var(--bc-text-discript);
      }
    }
  }
</style>
