<template>
  <div class="setting-profile">
    <el-form class="form-profile" ref="profile" :rules="rules" :model="form">
      <div class="box1">
        <div class="change-avatar">
          <div class="left avatar">
            <base-icon v-if="!form.avatar" icon="default-avatar" size="80" style="display: inline-flex; margin-right: 24px" />
            <img v-else :src="form.avatar" />
            <div class="box-text">
              <span class="title">{{ $t('setting.profile.title1') }}</span>
              <span class="discript">{{ $t('setting.profile.discript1') }}</span>
              <span class="remove" @click="remove">{{ $t('setting.profile.remove') }}</span>
            </div>
          </div>
          <div class="right">
            <el-upload
              ref="avatarUpload"
              :action="form.avatar ? form.avatar : ''"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleChangeFile"
              class="upload-demo mb-2 text-center skills"
              accept=".jpg, .jpeg, .png, .bmp, .pdf"
            >
              <div class="btn-action btn-upload">{{ $t('setting.profile.upload') }}</div>
            </el-upload>
            <!-- <div class="btn-action btn-upload">{{ $t('setting.profile.upload') }}</div> -->
          </div>
        </div>
        <div class="change-password">
          <div class="left">
            <div class="title">{{ $t('setting.profile.title2') }}</div>
            <div class="discript">
              {{ $t('setting.profile.discript2') }} <span class="link" @click="handleLink">{{ $t('setting.profile.link') }}</span>
            </div>
          </div>
          <div class="right btn-action btn-change-password" @click="handleChangePassword">{{ $t('setting.profile.changePassword') }}</div>
        </div>
      </div>
      <div class="line"></div>
      <div class="big-title">{{ $t('setting.profile.bigTitle1') }}</div>
      <div class="label">{{ $t('setting.profile.label1') }}</div>
      <el-form-item prop="displayName" class="box-input">
        <el-input v-model="form.displayName" :placeholder="$t('setting.profile.label1')" clearable></el-input>
      </el-form-item>
      <div class="label">{{ $t('setting.profile.label2') }}</div>
      <el-form-item prop="email" class="box-input">
        <el-input v-model="form.email" :placeholder="$t('setting.profile.label2')" disabled></el-input>
      </el-form-item>
      <div class="line"></div>
      <div class="big-title">{{ $t('setting.profile.bigTitle2') }}</div>
      <div class="box-left inline" style="margin-right: 16px">
        <div class="label">{{ $t('setting.profile.label3') }} <span class="required">*</span></div>
        <el-form-item prop="firstName" class="box-input mini-box">
          <el-input v-model="form.firstName" :placeholder="$t('setting.profile.label3')" clearable :disabled="disable"></el-input>
        </el-form-item>
      </div>
      <div class="box-right inline">
        <div class="label">{{ $t('setting.profile.label4') }} <span class="required">*</span></div>
        <el-form-item prop="lastName" class="box-input mini-box">
          <el-input v-model="form.lastName" :placeholder="$t('setting.profile.label4')" clearable :disabled="disable"></el-input>
        </el-form-item>
      </div>
      <div class="label">{{ $t('setting.profile.label5') }}</div>
      <el-form-item prop="birthday">
        <el-date-picker
          class="box-input"
          :class="errorBirhday ? 'input-birthday' : null"
          v-model="form.birthday"
          value-format="yyyy-MM-dd"
          format="MM/dd/yyyy"
          type="date"
          :placeholder="$t('setting.profile.label5')"
          clearable
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <div class="error" v-if="errorBirhday">{{ $t('setting.profile.errorDate') }}</div>
      <div class="label">{{ $t('setting.profile.label6') }}</div>
      <el-form-item prop="address" class="box-input">
        <el-input v-model="form.address" :placeholder="$t('setting.profile.label6')" clearable></el-input>
      </el-form-item>
      <div class="box-left inline" style="margin-right: 16px">
        <div class="label">{{ $t('setting.profile.label7') }}</div>
        <el-form-item prop="cityName" class="box-input mini-box">
          <el-input v-model="form.cityName" :placeholder="$t('setting.profile.label7')" clearable></el-input>
        </el-form-item>
      </div>
      <div class="box-right inline">
        <div class="label">{{ $t('setting.profile.label8') }}</div>
        <el-form-item prop="stateName" class="box-input mini-box">
          <el-input v-model="form.stateName" :placeholder="$t('setting.profile.label8')" clearable></el-input>
        </el-form-item>
      </div>
      <br />
      <div class="box-left inline" style="margin-right: 16px">
        <div class="label">{{ $t('setting.profile.label10') }}</div>
        <el-form-item prop="country" class="box-input mini-box">
          <el-select v-model="form.country" filterable reserve-keyword remote :remote-method="remoteCountry" clearable>
            <el-option v-for="(country, index) in listCountry" :key="index" :label="country.name" :value="country.name" />
          </el-select>
        </el-form-item>
      </div>
      <div class="box-right inline">
        <div class="label">{{ $t('setting.profile.label9') }} <span class="required">*</span></div>
        <el-form-item prop="nationality" class="box-input mini-box">
          <el-select v-model="form.nationality" filterable reserve-keyword remote :remote-method="remoteCountry2" @change="handleSelectNationality" clearable :disabled="disable">
            <el-option v-for="(country, index) in listCountry2" :key="index" :label="country.name" :value="country.name" />
          </el-select>
        </el-form-item>
      </div>
      <div class="box-btn btn-action-bottom">
        <div class="btn-action btn-reset" @click="handleReload">{{ $t('setting.profile.reset') }}</div>
        <div class="btn-action btn-save" @click="handleSavePersonal">{{ $t('setting.profile.save') }}</div>
      </div>
    </el-form>
    <popup-change-password />
  </div>
</template>

<script lang="ts">
  import { Component, Mixins, Watch } from 'vue-property-decorator'
  import PopupChangePassword from '../components/popup/PopupChangePassword.vue'
  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  import { SettingRepository } from '@/services/repositories/setting'
  import UploadRepository from '@/services/repositories/upload'
  import countryJson from '@/utils/country/index.json'
  import { trim, filter, debounce } from 'lodash'
  import EventBus from '@/utils/eventBus'
  interface IListCountry {
    name: string
    dial_code: string
    code: string
  }
  const api: SettingRepository = getRepository('setting')
  @Component({ components: { PopupChangePassword } })
  export default class Profile extends Mixins(PopupMixin) {
    apiUpload!: UploadRepository
    disable = false
    userId = this.$store.state.beAuth.user.userId
    listCountry: IListCountry[] = countryJson
    listCountry2: IListCountry[] = countryJson
    phoneDefault = '+84'
    type2fa: any = ''
    form: Record<string, any> = {
      email: '',
      firstName: '',
      lastName: '',
      confirm: false,
      id: '',
      avatar: '',
      displayName: '',
      birthday: '',
      address: '',
      cityName: '',
      stateName: '',
      country: '',
      nationality: '',
      nationalityCode: ''
    }
    rules: any = {
      firstName: [
        {
          required: true,
          message: this.$t('setting.profile.wrong-firstName'),
          trigger: 'blur'
        }
      ],
      lastName: [
        {
          required: true,
          message: this.$t('setting.profile.wrong-lastname'),
          trigger: 'blur'
        }
      ],
      nationality: [
        {
          required: true,
          message: this.$t('setting.profile.wrong-nationality'),
          trigger: 'blur'
        }
      ]
    }
    pickerOptions = {
      disabledDate(time: any) {
        return time.getTime() > Date.now()
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

    handleSelectNationality(name: string): void {
      const country = filter(countryJson, elm => elm.name === name)[0]
      this.form.nationalityCode = country.code
    }

    remoteCountry2(query: string): void {
      if (query) {
        const currentCountry = filter(
          this.listCountry2,
          country => trim(country.code).toUpperCase().includes(query.toUpperCase()) || trim(country.name).toUpperCase().includes(query.toUpperCase())
        )
        if (currentCountry.length > 0) {
          this.listCountry2 = currentCountry
        }
      } else if (!query) {
        this.listCountry2 = countryJson
      }
    }
    validateForm(): boolean {
      let profile: any = this.$refs.profile
      let valid = false
      profile.validate((_valid: boolean) => {
        valid = _valid
      })
      return valid
    }
    // debounce chan doble click
    debounceFilter = debounce((nameAction: any) => {
      if (nameAction == 'handleReload') {
        this.init()
      }
      if (nameAction == 'handleSavePersonal') {
        this.updateProfile()
      }
      if (nameAction == 'handleChangePassword') {
        this.changePassword()
      }
    }, 400)
    handleSavePersonal(): void {
      const valid = this.validateForm()
      if (valid && !this.errorBirhday) {
        this.debounceFilter('handleSavePersonal')
      }
    }
    updateProfile(): void {
      api.updateProfile(this.form).then(() => {
        let message: any = this.$t('setting.profile.messSaveProfile')
        this.$message.success(message)
        this.init()
      })
    }

    handleReload(): void {
      this.debounceFilter('handleReload')
    }

    handleChangePassword(): void {
      this.debounceFilter('handleChangePassword')
    }
    changePassword(): void {
      const data = {
        email: this.$store.state.beAuth.user.email,
        type: 'EMAIL',
        reason: 'PROFILE_RESET_PASSWORD'
      }
      api.resendCode(data).then(() => {
        this.setOpenPopup({
          popupName: 'popup-change-password',
          isOpen: true
        })
      })
    }

    async handleChangeFile(file: any): Promise<any> {
      if (file) {
        const formData = new FormData()
        if (file.status == 'ready') {
          formData.append('files', file.raw)
          formData.append('userId', this.userId)
          formData.append('type', 'AVATAR')
          this.apiUpload.updateAvatar(formData).then((res: any) => {
            this.form.avatar = res.success[0].url
            api
              .updateProfile(this.form)
              .then((res: any) => {
                let message: any = this.$t('setting.profile.messSaveProfile')
                this.$message.success(message)
                this.init()
              })
              .catch((error: any) => {
                this.$message.error(error.message)
              })
          })
        }
      }
      const isLt2M = file.size / 1024 / 1024 < 10
      if (isLt2M) {
        this.form.avatar = URL.createObjectURL(file.raw)
        EventBus.$emit('pushAvatar', URL.createObjectURL(file.raw))
      }
    }
    remove(): void {
      this.form.avatar = ''
      api
        .updateProfile(this.form)
        .then(() => {
          let message: any = this.$t('setting.profile.messDelete')
          this.$message.success(message)
          this.init()
        })
        .catch((error: any) => {
          this.$message.error(error.message)
        })
    }
    handleLink(): void {
      this.$router.push({ name: 'Security' })
    }
    async handleDetail(): Promise<void> {
      await api.getProfile().then((res: any) => {
        this.form = res.data
        if (!res.data.kycStatus || res.data.kycStatus == 'REJECTED') {
          this.disable = false
        } else {
          this.disable = true
        }
      })
    }
    async get2fa(): Promise<void> {
      const params = {
        email: this.$store.state.beAuth.user.email
      }
      await api.get2fa(params).then((res: any) => {
        this.type2fa = res
      })
    }
    async init(): Promise<void> {
      await this.get2fa()
      await this.handleDetail()
    }
    errorBirhday = false
    @Watch('form.birthday')
    checkBirthday(birthday: any): void {
      if (new Date().getFullYear() - new Date(birthday).getFullYear() >= 18) {
        this.errorBirhday = false
      } else {
        this.errorBirhday = true
      }
    }
    created(): void {
      const currentCountry = filter(this.listCountry, country => country.code === 'VN')[0]
      this.form.country = currentCountry.name
      const currentCountry2 = filter(this.listCountry2, country => country.code === 'VN')[0]
      this.form.nationality = currentCountry2.name
      this.apiUpload = getRepository('upload')
      this.init()
    }
  }
</script>

<style scoped lang="scss">
  .setting-profile {
    background: var(--bc-color-white);
    min-height: 500px;
    padding: 24px;
    .inline {
      display: inline-block;
    }
    .required {
      color: var(--bc-required);
    }
    .btn-action {
      width: 100px;
      height: 40px;
      background: var(--bc-color-white);
      color: var(--bc-btn-text);
      font-weight: 400;
      font-size: 14px;
      border: 1px solid var(--bc-btn-border);
      border-radius: 6px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      &:hover {
        color: var(--bc-btn-default-text-hover);
        border: 1px solid var(--bc-btn-default-border-hover);
      }
    }
    .title {
      color: var(--bc-text-primary);
      font-weight: 600;
      font-size: 18px;
    }
    .discript {
      font-weight: 400;
      font-size: 14px;
      color: var(--bc-text-discript);
    }
    .box1 {
      display: flex;
      .change-avatar {
        display: flex;
        padding-right: 24px;
        margin-right: 24px;
        border-right: 1px solid var(--bc-btn-border);
        .left {
          display: flex;
          img {
            width: 80px;
            height: 80px;
            margin-right: 24px;
            border-radius: 50%;
            object-fit: cover;
          }
          .box-text {
            min-width: 160px;
            margin-right: 16px;
            span {
              display: block;
            }
            .remove {
              color: var(--bc-btn-bg-default-hover);
              cursor: pointer;
              font-size: 14px;
              font-weight: 400;
            }
          }
        }
        .right {
          .btn-upload {
            line-height: 38px !important;
            &:hover {
              background: var(--bc-btn-default-text-hover);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              // border-color: var(--bc-btn-default-border-hover);
            }
          }
        }
      }
      .change-password {
        display: flex;
        .left {
          width: 240px;
          margin-right: 24px;
          .link {
            color: var(--bc-btn-bg-default-hover);
            cursor: pointer;
          }
        }
        .right {
          display: inline-block;
        }
        .btn-change-password {
          width: 142px;
          &:hover {
            background: var(--bc-btn-default-text-hover);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
    .line {
      margin-top: 24px;
      border-top: 1px solid var(--bc-btn-border);
    }
    .big-title {
      margin-top: 24px;
      color: var(--bc-text-primary);
      font-weight: 600;
      font-size: 24px;
    }
    .label {
      margin-top: 24px;
      color: var(--bc-text-primary);
      font-weight: 400;
      font-size: 14px;
    }
    .box-input {
      margin-top: 8px;
      width: 540px;
      height: 48px;
    }
    .mini-box {
      width: 262px;
      .el-select {
        width: 100% !important;
        height: 46px !important;
      }
    }
    .box-btn {
      display: flex;
      .btn-reset {
        margin-right: 16px;
        min-width: 120px;
        &:hover {
          background: var(--bc-btn-default-text-hover);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .btn-save {
        color: var(--bc-color-white);
        background: var(--bc-theme-primary-gradient);
        min-width: 120px;
        border: none;
        &:hover {
          background: var(--bc-theme-primary-gradient-hover);
        }
      }
    }
    .btn-action-bottom {
      margin-top: 24px;
    }
  }
  .error {
    color: #f56c6c;
    font-size: 12px;
  }
</style>
