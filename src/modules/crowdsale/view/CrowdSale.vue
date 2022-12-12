<template>
  <div class="m-auto bc-crowd-sale">
    <div class="be-flex bc-crowd-sale__above mb-24">
      <buy-lyn />
      <time-progress />
    </div>
    <div class="be-flex bc-crowd-sale__middle mb-24">
      <table-round />
    </div>
    <div class="be-flex bc-crowd-sale__below mb-24">
      <table-transaction />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import BuyLyn from '../components/BuyLyn.vue'
  import TimeProgress from '../components/TimeProgress.vue'
  import TableRound from '../components/TableRound.vue'
  import TableTransaction from '../components/TableTranscation.vue'
  import { namespace } from 'vuex-class'
  const beAuth = namespace('beAuth')
  @Component({ components: { BuyLyn, TimeProgress, TableRound, TableTransaction } })
  export default class CrowdSale extends Vue {
    @beAuth.State('moduleConfig') moduleConfig!: Record<string, any>

    created(): void {
      if (!this.moduleConfig.Crowdsale) {
        this.$router.push({ name: 'Wallet' })
      }
    }
  }
</script>

<style scoped lang="scss">
  .bc-crowd-sale {
    width: 1152px;
  }
</style>
