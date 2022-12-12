<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import getRepository from '@/services'
  import ParamsRepository from '@/services/repositories/params'
  import { namespace } from 'vuex-class'

  const apiParams: ParamsRepository = getRepository('params')
  const beBase = namespace('beBase')
  const bcAuth = namespace('beAuth')
  @Component({
    components: {}
  })
  export default class App extends Vue {
    @beBase.Action('setSystemParams') setSystemParams!: (data: Record<string, any>) => void
    @beBase.Action('setConfigModule') setConfigModule!: (data: Record<string, any>) => void
    @bcAuth.Getter('isLogin') isLogin!: boolean
    created(): void {
      apiParams.getPramsHeader().then(res => {
        this.setSystemParams(res)
      })

      const language = window.localStorage.getItem('bc-lang')
      if (!language) {
        window.localStorage.setItem('bc-lang', 'en')
      }
      // if (language === 'vi') {
      //   window.localStorage.setItem('bc-lang', 'en')
      //   location.reload()
      // }
      // window.localStorage.setItem('bc-lang', 'en')
    }
  }
</script>

<style lang="scss">
  // @import url('./accets/styles/index.scss');
</style>
