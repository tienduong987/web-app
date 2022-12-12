<template>
  <base-popup name="popup-scan-address" class="popup-scan" width="600px" :close="handleClose" :isShowFooter="false">
    <div slot="title">
      <span>{{ $t('scan.qrcode') }}</span>
    </div>
    <div class="content" v-loading="isLoading">
      <div class="overlay">
        <base-icon icon="icon-square" size="300" />
      </div>
      <qrcode-stream @decode="onDecode" @init="onInit" />
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import { QrcodeStream } from 'vue-qrcode-reader'

  import PopupMixin from '@/mixins/popup'

  @Component({ components: { QrcodeStream } })
  export default class PopupScanAddress extends Mixins(PopupMixin) {
    isLoading = true
    onDecode(result: string | any): void {
      this.$emit('scan', result)
    }

    async onInit(promise: any): Promise<any> {
      try {
        await promise
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    }

    handleClose(): void {
      this.isLoading = true
      this.$emit('close')
    }
  }
</script>

<style scoped lang="scss">
  .popup-scan {
    .content {
      margin: -24px;
      margin-bottom: 0;
      position: relative;
      .overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
      }
    }
    .footer {
      .btn-h40 {
        height: 40px;
      }
    }
  }
</style>
