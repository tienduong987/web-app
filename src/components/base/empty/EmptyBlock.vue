<template>
  <div class="empty-block" style="padding-top: 22px" v-if="show">
    <base-icon icon="no-data" size="100" />
    <p class="empty-text">{{ $t('notify.no-data') }}</p>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  @Component
  export default class EmptyBlock extends Vue {
    @Prop({ required: false, type: Boolean, default: true }) show!: boolean
    @Prop({ type: String, default: '' }) emptyText!: string
  }
</script>
