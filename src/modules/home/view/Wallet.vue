<template>
  <div class="w-100 bc-wallet">
    <walllet-header />
    <!-- <wallet-table /> -->
    <router-view />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import WallletHeader from '../components/WalletHeader.vue'
  import WalletTable from '../components/WalletTable.vue'
  import { namespace } from 'vuex-class'
  const beBase = namespace('beBase')

  // import getRepository from '@/services'
  // import WalletRepository from '@/services/repositories/wallet'
  // const apiWallet: WalletRepository = getRepository('wallet')
  @Component({ components: { WallletHeader, WalletTable } })
  export default class BCHome extends Vue {
    @beBase.State('coinMain') coinMain!: string

    // wallet: Array<Record<string, any>> = []
    // exchangeRate: Array<Record<string, any>> = []
    created(): void {
      // if (this.coinMain === 'LYNK') {
      //   this.$router.push({ name: 'WalletLyn' })
      // } else {
      //   this.$router.push({ name: 'WalletClm' })
      // }
    }
  }
</script>

<style scoped></style>
