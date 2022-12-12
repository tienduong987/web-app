<template>
  <base-popup
    name="CreateProduct"
    :open="handleOpen"
    :close="handleClose"
    width="766px"
    hight="425px"
    :top="'90px'"
    :hiddenFooter="true"
    class="popup-valid input-product"
    :closeClickModal="closeClick"
  >
    <div slot="title">
      DEPOSIT BITCOIN
      <el-button class="icon" @click="close">
        <base-icon icon="close" />
      </el-button>
    </div>
    <el-form ref="formInput"> </el-form>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'

  @Component({})
  export default class CreateProduct extends Mixins(PopupMixin) {
    closeClick = false

    handleOpen(): void {
      console.log('1')
    }
    handleClose(): void {
      this.setOpenPopup({
        popupName: 'CreateProduct',
        isOpen: false
      })
    }
  }
</script>

<style lang="scss" scoped>
  .input-left {
    input .el-input__inner {
      width: 161px !important;
    }
  }
</style>
