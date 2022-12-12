<template>
  <base-popup name="popup-change-number-phone" class="popup-change-number-phone" width="480px" :open="handleOpen" :close="handleClose">
    <div slot="title">
      <span>{{ $t('popupChangeNumberPhone.title') }}</span>
    </div>
    <div class="content">
      <el-form class="form-change-number-phone" ref="dataInput" :model="form" :rules="rules">
        <div class="label" style="margin-top: 0px">{{ $t('popupChangeNumberPhone.label1') }} <span class="required">*</span></div>
        <!-- <el-form-item prop="value">
          <el-select v-model="dataInput.value">
            <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item prop="country">
          <el-select v-model="form.country" filterable reserve-keyword remote :remote-method="remoteCountry" clearable @change="handleSelectCountry">
            <el-option v-for="(country, index) in listCountry" :key="index" :label="country.name" :value="country.name" />
          </el-select>
        </el-form-item>
        <!-- <el-input></el-input> -->
        <div class="label">{{ $t('popupChangeNumberPhone.label2') }} <span class="required">*</span></div>
        <div class="input-new-phone">
          <div class="mini-box">{{ form.countryCode }}</div>
          <el-form-item prop="newPhone" class="input-phone">
            <el-input v-model="form.newPhone" @keyup.native="numberFormat($event)"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div slot="footer" class="footer">
      <div @click="handleClose" class="btn-action btn-close">{{ $t('popupChangeNumberPhone.cancel') }}</div>
      <div @click="handleSubmit" class="btn-action btn-submit">{{ $t('popupChangeNumberPhone.continue') }}</div>
    </div>
  </base-popup>
</template>
<script lang="ts">
  import { Component, Mixins, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import countryJson from '@/utils/country/index.json'
  import { trim, filter, debounce } from 'lodash'
  import getRepository from '@/services'
  import { SettingRepository } from '@/services/repositories/setting'
  interface IListCountry {
    name: string
    dial_code: string
    code: string
  }
  const api: SettingRepository = getRepository('setting')
  @Component({ components: {} })
  export default class PopupChangeNumberPhone extends Mixins(PopupMixin) {
    listCountry: IListCountry[] = countryJson
    form: any = {
      country: '',
      newPhone: '',
      countryCode: ''
    }
    rules: any = {
      country: [
        {
          required: true,
          message: this.$t('popupChangeNumberPhone.wrong-country'),
          trigger: 'blur'
        }
      ],
      newPhone: [
        {
          required: true,
          message: this.$t('popupChangeNumberPhone.wrong-new-phone'),
          trigger: 'blur'
        }
      ]
    }
    @Watch('form.country')
    clearCountry(value: any) {
      if (!value) {
        this.listCountry = countryJson
      }
    }
    remoteCountry(query: string): void {
      if (query) {
        this.listCountry = filter(
          countryJson,
          country => trim(country.code).toUpperCase().includes(query.toUpperCase()) || trim(country.name).toUpperCase().includes(query.toUpperCase())
        )
        // if (currentCountry.length > 0) {
        //   this.listCountry = currentCountry
        // }
      } else if (!query) {
        this.listCountry = countryJson
      }
    }
    handleReset(): void {
      this.form = {
        country: '',
        newPhone: '',
        countryCode: ''
      }
      if (this.$refs.dataInput) {
        //@ts-ignore
        this.$refs.dataInput.clearValidate()
      }
    }
    validateForm(): boolean {
      let formInput: any = this.$refs.dataInput
      let valid = false
      formInput.validate((_valid: boolean) => {
        valid = _valid
      })
      return valid
    }
    handleOpen(): void {
      const currentCountry = filter(this.listCountry, country => country.code === 'VN')[0]
      this.form.country = currentCountry.name
      this.form.countryCode = currentCountry.dial_code
    }
    handleClose(): void {
      this.handleReset()
      this.setOpenPopup({
        popupName: 'popup-change-number-phone',
        isOpen: false
      })
    }
    // debounce chan doble click
    debounceFilter = debounce((nameAction: any) => {
      if (nameAction == 'handleSubmit') {
        this.submit()
      }
    }, 400)
    async handleSubmit(): Promise<void> {
      const valid = this.validateForm()
      if (valid) {
        this.debounceFilter('handleSubmit')
      }
    }
    async submit(): Promise<void> {
      await api.changePhone(this.form).then(() => {
        this.$emit('apply', 'popup-verification', this.form)
      })
      this.handleClose()
    }
    handleSelectCountry(country: string): void {
      this.form.countryCode = filter(this.listCountry, item => item.name === country)[0].dial_code
    }
    numberFormat(event: FocusEvent): void {
      const _event: any = event
      let fnumber = _event.target.value
      if (!isNaN(parseInt(fnumber))) {
        if (fnumber.length == 1 && fnumber == '0') {
          _event.target.value = ''
        } else if (fnumber.length > 1 && fnumber.slice(0, 1) == '0') {
          _event.target.value = ''
        } else {
          _event.target.value = fnumber
        }
      } else {
        _event.target.value = ''
      }
    }
    // @Watch('form.newPhone')
    // changeNewPhone(phone: any): void {
    //   if (phone.length == 1 && phone == '0') {
    //     this.form.newPhone = ''
    //   } else if (phone.length > 1 && phone.slice(0, 1) == '0') {
    //     this.form.newPhone = ''
    //   }
    // }
  }
</script>
<style scoped lang="scss">
  .popup-change-number-phone {
    .content {
      padding-bottom: 24px;
      .label {
        margin-top: 24px;
        color: var(--bc-text-primary);
        .required {
          color: var(--bc-required);
        }
      }
      .el-select {
        width: 100%;
      }
      .input-new-phone {
        display: flex;
        margin-top: 8px;
        .mini-box {
          width: 48px;
          height: 46px;
          background: var(--bc-color-grey20);
          text-align: center;
          line-height: 48px;
          font-weight: 400;
          font-size: 14px;
          color: var(--bc-text-discript);
          display: inline-block;
          border: 1px solid var(--bc-color-grey50);
          border-radius: 4px 0 0 4px;
        }
      }
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn-action {
        width: 100px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
        border-radius: 6px;
        &:hover {
          color: var(--bc-btn-default-text-hover);
          border: 1px solid var(--bc-btn-default-border-hover);
        }
      }
      .btn-close {
        background: var(--bc-color-white);
        border: 1px solid var(--bc-color-grey50);
        color: var(--bc-color-grey150);
        margin-right: 16px;
        &:hover {
          border-color: var(--bc-btn-default-border-hover);
          background: var(--bc-btn-default-text-hover);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .btn-submit {
        border: none;
        color: var(--bc-color-white);
        background: var(--bc-theme-primary-gradient);
        &:hover {
          border: none;
          color: var(--bc-color-white);
          background: var(--bc-theme-primary-gradient-hover) !important;
        }
      }
    }
  }
</style>
