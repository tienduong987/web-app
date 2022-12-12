<template>
  <div class="w-100 bc-setting">
    <div class="be-flex w-100 tabs">
      <div class="tab-item cursor" v-for="tab in tabs" :key="tab.id" :class="$route.name === tab.routeName ? 'tab-active' : null" @click="handleClickTab(tab)">
        <span class="text-base">{{ $t(`setting.${tab.i18n}`) }}</span>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class MainView extends Vue {
    tabs: Array<Record<string, any>> = [
      {
        id: 0,
        title: 'Profile',
        routeName: 'Profile',
        i18n: 'tab-profile'
      },
      {
        id: 1,
        title: 'KYC',
        routeName: 'KYC',
        i18n: 'kyc'
      },
      {
        id: 2,
        title: 'Security',
        routeName: 'Security',
        i18n: 'security'
      },
      {
        id: 3,
        title: 'Activity',
        routeName: 'Activity',
        i18n: 'tab-activity'
      },
      {
        id: 4,
        title: 'Level',
        routeName: 'Quota',
        i18n: 'level'
      }
    ]
    tabActive = 0

    handleClickTab(tab: Record<string, any>): void {
      this.tabActive = tab.id
      this.$router.push({ name: tab.routeName })
    }
  }
</script>

<style scoped lang="scss">
  .bc-setting {
    .tabs {
      border-bottom: 1px solid var(--bc-border-primary);
      .tab-item {
        padding: 16px 12px;
        position: relative;
        color: var(--bc-text-color-tab-item) !important;
        &:hover {
          background: var(--bc-tab-active);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .tab-active {
        background: var(--bc-tab-active);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 600;
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background: var(--bc-tab-active);
        }
      }
      background: var(--bc-color-white);
    }
  }
</style>
