<template>
  <div class="home-page">
    <transition name="el-fade-in-linear">
      <!-- <base-page-loading /> -->
    </transition>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  @Component({
    components: {}
  })
  export default class Home extends Vue {
    created(): void {
      // if (!localStorage.getItem('locale')) {
      //   localStorage.setItem('locale', process.env.VUE_APP_I18N_LOCALE || 'vi')
      // }
      this.$router.push({ name: 'CrowdSale' })
    }
  }
</script>
<style lang="scss" scoped>
  .home-page {
    position: relative;
  }
</style>
