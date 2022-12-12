<template>
  <div class="w-100 bc-wallet">
    <AffiliateHeader />
    <AffiliateTable />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import AffiliateHeader from '../components/AffiliateHeader.vue'
  import AffiliateTable from '../components/AffiliateTable.vue'
  //@ts-ignore
  // import WalletTable from '../components/WalletTable.vue'
  @Component({ components: { AffiliateHeader, AffiliateTable } })
  export default class BCHome extends Vue {}
</script>

<style scoped></style>
