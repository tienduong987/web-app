<template>
  <div class="kyc-content">
    <div v-if="this.statusKyc == 'REJECTED'">
      <div class="kyc-reject" :class="{ close: isClose }">
        <base-icon icon="icon-reject" class="icon-reject" size="20"></base-icon>
        <div class="sack-reject">
          <div class="reject-title">{{ $t('settingkyc.reject-title') }}</div>
          <div class="reject-desscription">{{ $t('settingkyc.reject-desscription') }}</div>
          <ul class="reject-error">
            <li class="reject-item" v-for="item in listRejectReason" :key="item.id">
              {{ $t(`params.` + item.key) }}
            </li>
            <li v-if="dataInput.kycRejectReasons" class="reject-item">
              {{ $t('setting.other-reason') }}
              {{ dataInput.kycRejectReasons }}
            </li>
            <!-- <li class="reject-item">
              {{ $t('settingkyc.reject-title-submit') }}<span class="fw16"> {{ $t('settingkyc.readable') }}</span> {{ $t('settingkyc.reject-title-submit2') }}
            </li>
            <li class="reject-item">{{ $t('settingkyc.reject-note2') }}</li>
            <li class="reject-item">{{ $t('settingkyc.reject-note3') }}</li>
            <li class="reject-item">
              {{ $t('settingkyc.reject-note4') }} <span class="fw16"> {{ $t('settingkyc.reject-note4-birthday') }} </span> {{ $t('settingkyc.reject-note4-end') }}
            </li> -->
          </ul>
        </div>
        <div class="reject-close" @click="handleclose">
          <base-icon icon="icon-close" class="color-success" size="14"></base-icon>
        </div>
      </div>
      <div class="personal-verifi mt48">
        <div class="personal-verifi-hedding">{{ $t('settingkyc.headding1') }}</div>
        <div class="personal-verifi-about-form">
          <el-form status-icon :model="dataInput" :rules="rules" class="personal-verifi-form">
            <div class="el-row" :gutter="10">
              <el-row :gutter="12">
                <el-col :span="12">
                  <el-form-item :label="$t('settingkyc.firstName')">
                    <el-input v-model="dataInput.firstName" :disabled="true" type="type"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('settingkyc.lastName')">
                    <el-input v-model="dataInput.lastName" :disabled="true" type="type"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="12" style="margin-left: 0px">
                <el-form-item :label="$t('settingkyc.nation')" prop="nationality">
                  <el-select style="width: 100%" v-model="dataInput.nationality" filterable reserve-keyword remote :remote-method="remoteCountry" clearable :disabled="disable">
                    <el-option v-for="(country, index) in listCountry" :key="index" :label="country.name" :value="country.name" />
                  </el-select>
                </el-form-item>
              </el-row>
            </div>
          </el-form>
        </div>
        <div>
          <div class="personal-verifi-hedding style-headding">{{ $t('settingkyc.headding2') }}</div>
          <el-form :model="dataInput" :rules="rules" status-icon class="personal-verifi-form">
            <el-form-item :label="$t('settingkyc.idtype')" prop="idcard" class="base-form__item required">
              <div class="type--verifi">
                <el-radio-group v-model="dataInput.idcard">
                  <el-radio class="type--verifi-radio" :label="'ID_CARD'">{{ $t('settingkyc.idcard1') }}</el-radio>
                  <el-radio class="type--verifi-radio" :label="'PASSPORT'">{{ $t('settingkyc.passport') }}</el-radio>
                  <el-radio class="type--verifi-radio" :label="'DRIVER_LICENSE'">{{ $t('settingkyc.driverLicense') }} </el-radio>
                </el-radio-group>
                <!-- <small class="small" v-if="errorClassify">Thẻ card không được bỏ chống</small> -->
              </div>
            </el-form-item>
            <el-form-item :label="$t('settingkyc.numberid')" prop="identificationNumber">
              <el-input v-model="dataInput.identificationNumber" :placeholder="$t('settingkyc.numberid')" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <div class="personal-verifi-id-photo">{{ $t('settingkyc.uploadImgId') }} <span class="error">*</span></div>
          <div class="personal-verifi-id-photo-description">
            {{ $t('settingkyc.note1') }}
            <span v-if="dataInput.idcard === 'ID_CARD'">{{ $t('settingkyc.note2-selfie') }}</span>
            <span v-if="dataInput.idcard === 'DRIVER_LICENSE'">{{ $t('settingkyc.note2-selfie2') }}</span>
            <span v-if="dataInput.idcard === 'PASSPORT'">{{ $t('settingkyc.note2-selfie3') }}</span>
            {{ $t('settingkyc.note1-2') }}
          </div>
          <div class="personal-verifi-front-side">
            <!-- <el-upload
              ref="avatarUpload"
              :action="form.avatar ? form.avatar : ''"
              :auto-upload="false"
              :on-change="showAvatar"
              :show-file-list="false"
              accept=".jpg, .jpeg, .png, .bmp, .pdf"
              class="mb-2 text-center skills"
            >
              <div v-if="form.avatar" class="text-center avatar" style="display: grid; padding-bottom: 25px">
                <img width="72px" :src="form.avatar" :key="form.avatar" class="mb-1" size="medium" />
                <a class="is-white is-none-border icon-btn btn-link hover-a" style="padding-top: 5px">
                  <span class="fs-13 color">Chọn ảnh đại diện</span>
                </a>
              </div>
              <div v-else class="icon-btn text-center button-skill">
                <el-button class="is-create-color is-dashed is-white is-small mt-2" circle icon="el-icon-plus" />
                <br />
                <span class="is-create-color" style="padding-top: padding-top: 5px 0px">Ảnh đại diện</span>
              </div>
            </el-upload> -->
            <div style="position: relative">
              <el-upload
                class="upload-demo"
                drag
                :file-list="fileList"
                :on-change="handleChangeFile"
                :on-remove="handleRemove"
                :auto-upload="false"
                :show-file-list="false"
                action
                style
              >
                <div v-if="!idPhoto1">
                  <span class="style-headding-side" v-if="dataInput.idcard === 'ID_CARD' || dataInput.idcard === 'DRIVER_LICENSE'">{{ $t('settingkyc.frontSide') }}</span>
                  <span class="style-headding-side" v-if="dataInput.idcard === 'PASSPORT'">{{ $t('settingkyc.passportCover') }}</span>
                  <div class="el-upload__text">
                    {{ $t('settingkyc.drapordrop') }} <em>{{ $t('settingkyc.clickupload') }}</em>
                  </div>
                </div>

                <div v-if="idPhoto1" class="list-file">
                  <img shape="square" class="style-avatar" style="object-fit: contain" :src="idPhoto1" v-bind:style="{ transform: 'rotate(' + rotateDeg[0] + 'deg)' }" />
                </div>
              </el-upload>
              <div v-if="idPhoto1" class="be-flex nav-image" style="justify-content: center">
                <div class="rotate" @click="rotateRightImage(0)">
                  <base-icon icon="icon-rotate" style="color: #5b616e; margin-right: 4px" size="18" class="icon" />
                  Rotate
                </div>
                <div class="clear" @click="handleRemove()">
                  <base-icon icon="icon-clear" style="color: #5b616e; margin-right: 4px" size="18" class="icon" />
                  Clear
                </div>
              </div>
            </div>
            <!-- <img :src="photo1" alt="" /> -->

            <div class="example">{{ $t('settingkyc.example') }}</div>
            <img v-if="dataInput.idcard === 'ID_CARD'" class="img-style" src="../../../icons/png/imgIdCard.png" alt="" />
            <img v-if="dataInput.idcard === 'PASSPORT'" class="img-style" src="../../../icons/png/imgPassport.png" alt="" />
            <img v-if="dataInput.idcard === 'DRIVER_LICENSE'" src="../../../icons/png/Driver-license-front.png" alt="" />
          </div>
          <div class="personal-verifi-back-side">
            <div style="position: relative">
              <el-upload class="upload-demo" drag :file-list="fileList2" :on-change="handleChangeFile2" :auto-upload="false" :show-file-list="false" action style>
                <!-- <i class="el-icon-upload"></i> -->
                <div v-if="!idphoto2">
                  <span class="style-headding-side" v-if="dataInput.idcard === 'ID_CARD' || dataInput.idcard === 'DRIVER_LICENSE'">{{ $t('settingkyc.backSide') }}</span>
                  <span class="style-headding-side" v-if="dataInput.idcard === 'PASSPORT'">{{ $t('settingkyc.passportpage') }}</span>
                  <div class="el-upload__text">
                    {{ $t('settingkyc.drapordrop') }} <em>{{ $t('settingkyc.clickupload') }}</em>
                  </div>
                </div>
                <div v-if="idphoto2" class="list-file">
                  <!-- <div v-for="file in fileList2" :key="file.uid"> -->
                  <!-- <el-avatar shape="square" class="style-avatar" :src="file.url"></el-avatar> -->
                  <img shape="square" class="style-avatar" style="object-fit: contain" :src="idphoto2" v-bind:style="{ transform: 'rotate(' + rotateDeg[1] + 'deg)' }" />
                  <!-- </div> -->
                </div>
              </el-upload>
              <div v-if="idphoto2" class="be-flex nav-image" style="justify-content: center">
                <div class="rotate" @click="rotateRightImage(1)">
                  <base-icon icon="icon-rotate" style="color: #5b616e; margin-right: 4px" size="18" class="icon" />
                  Rotate
                </div>
                <div class="clear" @click="handleRemove2()">
                  <base-icon icon="icon-clear" style="color: #5b616e; margin-right: 4px" size="18" class="icon" />
                  Clear
                </div>
              </div>
            </div>
            <div class="example">{{ $t('settingkyc.example') }}</div>
            <img v-if="dataInput.idcard === 'ID_CARD' || dataInput.idcard === 'DRIVER_LICENSE'" class="img-style" src="../../../icons/png/img-Id-Card-Back.png" alt="" />
            <img v-if="dataInput.idcard === 'PASSPORT'" class="img-style" src="../../../icons/png/imgPassportDetail.png" alt="" />
          </div>
        </div>
        <div>
          <div class="personal-verifi-id-photo">{{ $t('settingkyc.noteselfie') }}<span class="error">*</span></div>
          <div class="personal-verifi-id-photo-description">
            {{ $t('settingkyc.note2') }} <span v-if="dataInput.idcard === 'ID_CARD'">{{ $t('settingkyc.note2-selfie') }}</span>
            <span v-if="dataInput.idcard === 'DRIVER_LICENSE'">{{ $t('settingkyc.note2-selfie2') }}</span>
            <span v-if="dataInput.idcard === 'PASSPORT'">{{ $t('settingkyc.note2-selfie3') }}</span>
            {{ $t('settingkyc.note2-selfie1', { coin: coinMain === 'LYNK' ? 'LynKey' : 'CleverMe' }) }}
            <span v-if="dataInput.idcard === 'ID_CARD'">{{ $t('settingkyc.note2-selfie') }}</span>
            <span v-if="dataInput.idcard === 'DRIVER_LICENSE'">{{ $t('settingkyc.note2-selfie2') }}</span>
            <span v-if="dataInput.idcard === 'PASSPORT'">{{ $t('settingkyc.note2-selfie3') }}</span>
            {{ $t('settingkyc.note2-selfie1-2') }}
          </div>
          <div class="tick-note">
            <div class="k-tick1">
              <div>
                <base-icon icon="tick-v" class="color-success" size="14"></base-icon>
                <span class="style-note-tick">{{ $t('settingkyc.note2-1') }}</span>
              </div>
              <div>
                <base-icon icon="tick-v" class="color-success" size="14"></base-icon>
                <span class="style-note-tick">{{ $t('settingkyc.note2-2') }}</span>
              </div>
            </div>
            <div class="k-tick2">
              <div></div>
              <div>
                <base-icon icon="tick-v" class="color-success" size="14"></base-icon>
                <span class="style-note-tick">{{ $t('settingkyc.note2-3') }} "{{ coinMain === 'LYNK' ? 'LYNKEY' : 'CleverMe' }}"</span>
              </div>
              <div>
                <base-icon icon="tick-v" class="color-success" size="14"></base-icon>
                <span class="style-note-tick">{{ $t('settingkyc.note2-4') }}</span>
              </div>
            </div>
          </div>
          <div class="personal-verifi-back-side">
            <div style="position: relative">
              <el-upload class="upload-demo" drag :file-list="fileList3" :on-change="handleChangeFile3" :auto-upload="false" :show-file-list="false" action style>
                <!-- <i class="el-icon-upload"></i> -->
                <div v-if="!selfiePhoto" class="el-upload__text">
                  {{ $t('settingkyc.drapordrop') }} <em>{{ $t('settingkyc.clickupload') }}</em>
                </div>
                <div v-if="selfiePhoto" class="list-file">
                  <!-- <div v-for="file in fileList3" :key="file.uid"> -->
                  <!-- <el-avatar shape="square" class="style-avatar" :src="file.url"></el-avatar> -->
                  <img shape="square" style="object-fit: contain" class="style-avatar" :src="selfiePhoto" v-bind:style="{ transform: 'rotate(' + rotateDeg[2] + 'deg)' }" />
                  <!-- </div> -->
                </div>
              </el-upload>
              <div v-if="selfiePhoto" class="be-flex nav-image" style="justify-content: center">
                <div class="rotate" @click="rotateRightImage(2)">
                  <base-icon icon="icon-rotate" style="color: #5b616e; margin-right: 4px" size="18" class="icon" />
                  Rotate
                </div>
                <div class="clear" @click="handleRemove3()">
                  <base-icon icon="icon-clear" style="color: #5b616e; margin-right: 4px" size="18" class="icon" />
                  Clear
                </div>
              </div>
            </div>
            <div class="example">{{ $t('settingkyc.example') }}</div>
            <div v-if="dataInput.idcard === 'ID_CARD'">
              <img v-if="coinMain === 'LYNK'" class="img-style" src="../../../icons/png/imgselfie.png" alt="" />
              <img v-else class="img-style" src="../../../icons/png/selfie-clm.png" alt="" />
            </div>
            <div v-if="dataInput.idcard === 'PASSPORT'">
              <img v-if="coinMain === 'LYNK'" class="img-style" src="../../../icons/png/imgselfiePassport.png" alt="" />
              <img v-else class="img-style" src="../../../icons/png/passport-selfie-clm.png" alt="" />
            </div>
            <div v-if="dataInput.idcard === 'DRIVER_LICENSE'">
              <img v-if="coinMain === 'LYNK'" src="../../../icons/png/Driver's-license-selfie.png" alt="" />
              <img v-else src="../../../icons/png/Driver'slicense-selfie-clm.png" alt="" />
            </div>
          </div>
        </div>
        <div class="btn-about-button">
          <el-button class="btn-style btn-style-default" @click="HandleReset">
            <p>{{ $t('settingkyc.reset') }}</p>
          </el-button>
          <el-button class="btn-style btn-theme" :loading="loading" type="primary" @click="handleChange">
            {{ $t('settingkyc.submit') }}
          </el-button>
        </div>
      </div>
    </div>
    <!-- phan insert -->
    <div class="personal-verifi" v-if="this.statusKyc == 'NONE'">
      <div class="personal-verifi-hedding">{{ $t('settingkyc.headding1') }}</div>
      <div class="personal-verifi-about-form">
        <el-form status-icon :model="dataInput" :rules="rules" class="personal-verifi-form">
          <div class="el-row" :gutter="10">
            <el-row :gutter="12">
              <el-col :span="12">
                <el-form-item :label="$t('settingkyc.firstName')">
                  <el-input v-model="dataInput.firstName" :disabled="true" type="type"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('settingkyc.lastName')">
                  <el-input v-model="dataInput.lastName" :disabled="true" type="type"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12" style="margin-left: 0px">
              <el-form-item :label="$t('settingkyc.nation')" prop="nationality">
                <!-- <el-input v-model="dataInput.nationality" :disabled="true" type="type"></el-input> -->
                <el-select style="width: 100%" v-model="dataInput.nationality" filterable reserve-keyword remote :remote-method="remoteCountry" clearable :disabled="disable">
                  <el-option v-for="(country, index) in listCountry" :key="index" :label="country.name" :value="country.name" />
                </el-select>
              </el-form-item>
            </el-row>
          </div>
        </el-form>
      </div>
      <div>
        <div class="personal-verifi-hedding style-headding">{{ $t('settingkyc.headding2') }}</div>
        <el-form :model="dataInput" :rules="rules" status-icon class="personal-verifi-form">
          <el-form-item :label="$t('settingkyc.idtype')" prop="idcard" class="base-form__item required">
            <div class="type--verifi">
              <el-radio-group v-model="dataInput.idcard">
                <el-radio class="type--verifi-radio" :label="'ID_CARD'">{{ $t('settingkyc.idcard1') }}</el-radio>
                <el-radio class="type--verifi-radio" :label="'PASSPORT'">{{ $t('settingkyc.passport') }}</el-radio>
                <el-radio class="type--verifi-radio" :label="'DRIVER_LICENSE'">{{ $t('settingkyc.driverLicense') }} </el-radio>
              </el-radio-group>
              <!-- <small class="small" v-if="errorClassify">Thẻ card không được bỏ chống</small> -->
            </div>
          </el-form-item>
          <el-form-item :label="$t('settingkyc.numberid')" prop="identificationNumber">
            <el-input v-model="dataInput.identificationNumber" :placeholder="$t('settingkyc.numberid')" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <div class="personal-verifi-id-photo">{{ $t('settingkyc.uploadImgId') }} <span class="error">*</span></div>
        <div class="personal-verifi-id-photo-description">
          {{ $t('settingkyc.note1') }}
          <span v-if="dataInput.idcard === 'ID_CARD'">{{ $t('settingkyc.note2-selfie') }}</span>
          <span v-if="dataInput.idcard === 'DRIVER_LICENSE'">{{ $t('settingkyc.note2-selfie2') }}</span>
          <span v-if="dataInput.idcard === 'PASSPORT'">{{ $t('settingkyc.note2-selfie3') }}</span>
          {{ $t('settingkyc.note1-2') }}
        </div>
        <div class="personal-verifi-front-side">
          <div style="position: relative">
            <el-upload
              class="upload-demo"
              drag
              :file-list="fileList"
              :on-change="handleChangeFile"
              :on-remove="handleRemove"
              :auto-upload="false"
              :show-file-list="false"
              action
              style
            >
              <!-- <i class="el-icon-upload"></i> -->
              <div v-if="!idPhoto1">
                <span class="style-headding-side" v-if="dataInput.idcard === 'ID_CARD' || dataInput.idcard === 'DRIVER_LICENSE'">{{ $t('settingkyc.frontSide') }}</span>
                <span class="style-headding-side" v-if="dataInput.idcard === 'PASSPORT'">{{ $t('settingkyc.passportCover') }}</span>
                <div class="el-upload__text">
                  {{ $t('settingkyc.drapordrop') }} <em>{{ $t('settingkyc.clickupload') }}</em>
                </div>
              </div>
              <div v-if="idPhoto1" class="list-file" style="width: 100%; height: 97%">
                <img shape="square" class="style-avatar" style="object-fit: contain" :src="idPhoto1" v-bind:style="{ transform: 'rotate(' + rotateDeg[0] + 'deg)' }" />
              </div>
            </el-upload>
            <div v-if="idPhoto1" class="be-flex nav-image" style="justify-content: center">
              <div class="rotate" @click="rotateRightImage(0)">
                <base-icon icon="icon-rotate" style="color: #5b616e; margin-right: 4px" size="18" class="icon" />
                Rotate
              </div>
              <div class="clear" @click="handleRemove()">
                <base-icon icon="icon-clear" style="color: #5b616e; margin-right: 4px" size="18" class="icon" />
                Clear
              </div>
            </div>
          </div>

          <div class="example">{{ $t('settingkyc.example') }}</div>
          <img v-if="dataInput.idcard === 'ID_CARD'" class="img-style" src="../../../icons/png/imgIdCard.png" alt="" />
          <img v-if="dataInput.idcard === 'PASSPORT'" class="img-style" src="../../../icons/png/imgPassport.png" alt="" />
          <img v-if="dataInput.idcard === 'DRIVER_LICENSE'" src="../../../icons/png/Driver-license-front.png" alt="" />
        </div>
        <div class="personal-verifi-back-side">
          <div style="position: relative">
            <el-upload class="upload-demo" drag :file-list="fileList2" :on-change="handleChangeFile2" :auto-upload="false" :show-file-list="false" action style>
              <!-- <i class="el-icon-upload"></i> -->
              <div v-if="!idphoto2">
                <span class="style-headding-side" v-if="dataInput.idcard === 'ID_CARD' || dataInput.idcard === 'DRIVER_LICENSE'">{{ $t('settingkyc.backSide') }}</span>
                <span class="style-headding-side" v-if="dataInput.idcard === 'PASSPORT'">{{ $t('settingkyc.passportpage') }}</span>
                <div class="el-upload__text">
                  {{ $t('settingkyc.drapordrop') }} <em>{{ $t('settingkyc.clickupload') }}</em>
                </div>
              </div>
              <div v-if="idphoto2">
                <!-- <el-avatar shape="square" class="style-avatar" :src="file.url"></el-avatar> -->
                <img shape="square" class="style-avatar" style="object-fit: contain" :src="idphoto2" v-bind:style="{ transform: 'rotate(' + rotateDeg[1] + 'deg)' }" />
              </div>
            </el-upload>
            <div v-if="idphoto2" class="be-flex nav-image" style="justify-content: center">
              <div class="rotate" @click="rotateRightImage(1)">
                <base-icon icon="icon-rotate" style="color: #5b616e; margin-right: 4px" size="18" class="icon" />
                Rotate
              </div>
              <div class="clear" @click="handleRemove2()">
                <base-icon icon="icon-clear" style="color: #5b616e; margin-right: 4px" size="18" class="icon" />
                Clear
              </div>
            </div>
          </div>
          <div class="example">{{ $t('settingkyc.example') }}</div>
          <img v-if="dataInput.idcard === 'ID_CARD' || dataInput.idcard === 'DRIVER_LICENSE'" class="img-style" src="../../../icons/png/img-Id-Card-Back.png" alt="" />
          <img v-if="dataInput.idcard === 'PASSPORT'" class="img-style" src="../../../icons/png/imgPassportDetail.png" alt="" />
        </div>
      </div>
      <div>
        <div class="personal-verifi-id-photo">{{ $t('settingkyc.noteselfie') }}<span class="error">*</span></div>
        <div class="personal-verifi-id-photo-description">
          {{ $t('settingkyc.note2') }} <span v-if="dataInput.idcard === 'ID_CARD'">{{ $t('settingkyc.note2-selfie') }}</span>
          <span v-if="dataInput.idcard === 'DRIVER_LICENSE'">{{ $t('settingkyc.note2-selfie2') }}</span>
          <span v-if="dataInput.idcard === 'PASSPORT'">{{ $t('settingkyc.note2-selfie3') }}</span>
          {{ $t('settingkyc.note2-selfie1', { coin: coinMain === 'LYNK' ? 'LynKey' : 'CleverMe' }) }}
          <span v-if="dataInput.idcard === 'ID_CARD'">{{ $t('settingkyc.note2-selfie') }}</span>
          <span v-if="dataInput.idcard === 'DRIVER_LICENSE'">{{ $t('settingkyc.note2-selfie2') }}</span>
          <span v-if="dataInput.idcard === 'PASSPORT'">{{ $t('settingkyc.note2-selfie3') }}</span>
          {{ $t('settingkyc.note2-selfie1-2') }}
        </div>
        <div class="tick-note">
          <div class="k-tick1">
            <div>
              <base-icon icon="tick-v" class="color-success" size="14"></base-icon>
              <span class="style-note-tick">{{ $t('settingkyc.note2-1') }}</span>
            </div>
            <div>
              <base-icon icon="tick-v" class="color-success" size="14"></base-icon>
              <span class="style-note-tick">{{ $t('settingkyc.note2-2') }}</span>
            </div>
          </div>
          <div class="k-tick2">
            <div>
              <base-icon icon="tick-v" class="color-success" size="14"></base-icon>
              <span class="style-note-tick">{{ $t('settingkyc.note2-3') }} "{{ coinMain === 'LYNK' ? 'LYNKEY' : 'CleverMe' }}"</span>
            </div>
            <div>
              <base-icon icon="tick-v" class="color-success" size="14"></base-icon>
              <span class="style-note-tick">{{ $t('settingkyc.note2-4') }}</span>
            </div>
          </div>
        </div>
        <div class="personal-verifi-back-side">
          <div style="position: relative">
            <el-upload class="upload-demo" drag :file-list="fileList3" :on-change="handleChangeFile3" :auto-upload="false" :show-file-list="false" action style>
              <!-- <i class="el-icon-upload"></i> -->
              <div v-if="!selfiePhoto" class="el-upload__text">
                {{ $t('settingkyc.drapordrop') }} <em>{{ $t('settingkyc.clickupload') }}</em>
              </div>
              <div v-if="selfiePhoto">
                <!-- <el-avatar shape="square" class="style-avatar" :src="file.url"></el-avatar> -->
                <img shape="square" style="object-fit: contain" class="style-avatar" :src="selfiePhoto" v-bind:style="{ transform: 'rotate(' + rotateDeg[2] + 'deg)' }" />
              </div>
            </el-upload>
            <div v-if="selfiePhoto" class="be-flex nav-image" style="justify-content: center">
              <div class="rotate" @click="rotateRightImage(2)">
                <base-icon icon="icon-rotate" style="color: #5b616e; margin-right: 4px" size="18" class="icon" />
                Rotate
              </div>
              <div class="clear" @click="handleRemove3()">
                <base-icon icon="icon-clear" style="color: #5b616e; margin-right: 4px" size="18" class="icon" />
                Clear
              </div>
            </div>
          </div>
          <div class="example">{{ $t('settingkyc.example') }}</div>
          <div v-if="dataInput.idcard === 'ID_CARD'">
            <img v-if="coinMain === 'LYNK'" class="img-style" src="../../../icons/png/imgselfie.png" alt="" />
            <img v-else class="img-style" src="../../../icons/png/selfie-clm.png" alt="" />
          </div>
          <div v-if="dataInput.idcard === 'PASSPORT'">
            <img v-if="coinMain === 'LYNK'" class="img-style" src="../../../icons/png/imgselfiePassport.png" alt="" />
            <img v-else class="img-style" src="../../../icons/png/passport-selfie-clm.png" alt="" />
          </div>
          <div v-if="dataInput.idcard === 'DRIVER_LICENSE'">
            <img v-if="coinMain === 'LYNK'" src="../../../icons/png/Driver's-license-selfie.png" alt="" />
            <img v-else src="../../../icons/png/Driver'slicense-selfie-clm.png" alt="" />
          </div>
        </div>
      </div>
      <div class="btn-about-button">
        <el-button class="btn-style btn-style-default" @click="HandleReset">
          <p>{{ $t('settingkyc.reset') }}</p>
        </el-button>
        <el-button class="btn-style btn-theme" type="primary" @click="handleCreate">{{ $t('settingkyc.submit') }}</el-button>
      </div>
    </div>

    <div class="kyc-success" v-if="this.statusKyc == 'VERIFIED'">
      <div class="kyc-success-top" :class="coinMain === 'CLM' ? 'kyc-success-top--clm' : null">
        <base-icon icon="icon-notification-success" class="icon-success1" size="20"></base-icon>
        <div class="sack-success">
          <div class="success-title">{{ $t('settingkyc.success-title') }}</div>
          <div class="success-success-desscription">
            <span> {{ $t('settingkyc.info-level', { level: getLevelCurrent }) }}</span>
            <span v-if="!isMaxLevel">
              {{
                $t('settingkyc.success-desscription', {
                  deposit: getCurrentLevelDepositLimit,
                  totalTrade: getNextLevelTotaltrade
                })
              }}
            </span>
            <p v-if="!isMaxLevel" @click="changeLevel" class="success-link">{{ $t('settingkyc.success-link') }}</p>
          </div>
        </div>
      </div>
      <div class="kyc-success-bottom">
        <base-icon v-if="coinMain === 'LYNK'" icon="iconcSuccess" class="icon-success" size="48"></base-icon>
        <base-icon v-else icon="iconcSuccess-clm" class="icon-success" size="48"></base-icon>
        <div class="information-right">
          <div class="pendding-title">{{ $t('settingkyc.notificationSuccess') }}</div>
          <div class="pendding-description">{{ $t('settingkyc.notification-note-Success', { coin: coinMain }) }}</div>
        </div>
      </div>
    </div>

    <div class="kyc-pendding" v-if="this.statusKyc == 'PENDING'">
      <base-icon icon="progressing" class="icon-pendding" size="48"></base-icon>
      <div class="information-right">
        <div class="pendding-title">{{ $t('settingkyc.notificationPedding') }}</div>
        <div class="pendding-description">{{ $t('settingkyc.notification-note-Pedding') }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import getRepository from '@/services'
  import { SettingRepository } from '@/services/repositories/setting'
  import UploadRepository from '@/services/repositories/upload'
  import { AuthRepository } from '@/services/repositories/auth'
  import { filter, includes, trim } from 'lodash'
  import countryJson from '@/utils/country/index.json'
  import ParamsRepository from '@/services/repositories/params'

  const apiParams: ParamsRepository = getRepository('params')
  const api: SettingRepository = getRepository('setting')
  // import UserRepository from '@/services/repositories/user'
  import { namespace } from 'vuex-class'

  const beBase = namespace('beBase')
  // const apiAuth: AuthRepository = getRepository('auth')
  import { findIndex } from 'lodash'

  interface IListCountry {
    name: string
    dial_code: string
    code: string
  }

  @Component
  export default class BlKyc extends Vue {
    // @bcAuth.Action('getInfo') getInfo!: () => void
    @beBase.State('coinMain') coinMain!: string

    api?: SettingRepository
    apiUpload!: UploadRepository
    apiAuth!: AuthRepository
    // apiUser?: UserRepository
    statusKyc = ''
    // loading = true
    linkFake = 'https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg'
    dataInput = {
      idcard: 'ID_CARD',
      firstName: '',
      lastName: '',
      nation: '',
      idNuidentificationNumbermber: '',
      nationality: '',
      identificationNumber: '',
      userId: '',
      userGroupId: ''
    }
    disable = false
    listCountry: IListCountry[] = countryJson
    isUpload: any = false
    file: any
    public loading = false
    idPhoto1 = ''
    idphoto2 = ''
    selfiePhoto = ''
    link1 = ''
    isCard = false
    isPassport = false
    isSuccess = false
    fileList: any = []
    fileList2: any = []
    fileList3: any = []
    srcList: any = ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg']
    data: Array<Record<string, any>> = []
    dataDetail: Record<string, any> = {}
    dataUpdate: Record<string, any> = {
      identificationType: '',
      userId: '',
      firstName: '',
      lastName: '',
      identificationNumber: '',
      nationality: '',
      idPhoto1: '',
      idPhoto2: '',
      selfiePhoto: ''
    }
    isClose = false

    listRejectReason: Record<string, any>[] = []

    listLevel: Record<string, any>[] = []
    currentLevel: Record<string, any> = {}

    rules: Record<string, any> = {
      identificationNumber: [
        {
          required: true,
          message: this.$t('settingkyc.wrongidNumber'),
          trigger: 'blur'
        }
      ],
      nationality: [
        {
          required: true,
          message: this.$t('settingkyc.wrongidNumber'),
          trigger: 'blur'
        }
      ]
    }

    get getLevelCurrent(): string {
      const name = this.currentLevel?.groupName || '0'
      return name.match(/\d+/)[0]
    }

    get getNextLevelTotaltrade(): string {
      const index = findIndex(this.listLevel, elm => elm.id === this.currentLevel.id)
      return this.$options.filters?.formatNumber(this.listLevel[index + 1].totalTrade)
    }

    get getCurrentLevelDepositLimit(): any {
      if (!this.currentLevel.dopositLimit) {
        return this.$t('settingkyc.unlimited')
      }
      return '$' + this.$options.filters?.formatNumber(this.currentLevel.dopositLimit) + this.$t('settingkyc.day')
    }

    get isMaxLevel(): boolean {
      const index = findIndex(this.listLevel, elm => elm.id === this.currentLevel.id)
      return index === this.listLevel.length - 1
    }

    @Watch('dataInput.idcard', { immediate: false })
    change(type: string): void {
      if (type === this.dataDetail.identificationType) {
        this.fileList = []
        this.fileList2 = []
        this.fileList3 = []
        this.dataInput.identificationNumber = this.dataDetail.identificationNumber
        this.dataInput.nationality = this.dataDetail.nationality
        this.idPhoto1 = this.dataDetail.idPhoto1
        this.idphoto2 = this.dataDetail.idPhoto2
        this.selfiePhoto = this.dataDetail.selfiePhoto
      } else {
        this.fileList = []
        this.fileList2 = []
        this.fileList3 = []
        this.idPhoto1 = ''
        this.idphoto2 = ''
        this.selfiePhoto = ''
        this.dataInput.identificationNumber = ''
      }
    }

    handleclose(): void {
      this.isClose = true
    }

    HandleReset(): void {
      if (this.statusKyc == 'REJECTED') {
        this.checkStatusKyc()
      } else {
        this.fileList = []
        this.fileList2 = []
        this.fileList3 = []
        this.idphoto2 = ''
        this.idPhoto1 = ''
        this.selfiePhoto = ''
        this.dataInput.identificationNumber = ''
        this.dataInput.idcard = 'ID_CARD'
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

    HandleVerify(): void {
      this.isSuccess = true
    }

    changeLevel(): void {
      this.$router.push({ name: 'Quota' })
    }

    onlyNumber(event: KeyboardEvent): void {
      let keyCode = event.keyCode ? event.keyCode : event.which
      //if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      // 46 is dot
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        event.preventDefault()
      }
      if (keyCode === 46 && includes(this.dataInput.idNuidentificationNumbermber, '.')) {
        event.preventDefault()
      }
    }

    // start upload img1
    async handleChangeFile(file: Record<string, any>): Promise<void> {
      // console.log(file)

      if (this.idPhoto1 || this.fileList.length > 0) {
        this.handleRemove()
      }
      // this.handleRemove(file)
      // eslint-disable-next-line no-constant-condition
      const formData = new FormData()
      if (file.status === 'ready') {
        file.type = file.raw.type
        // file = {
        //   ...file,
        //   load:
        // }
        // const newFile: Record<string, any> = {}
        // newFile.name = file.name
        // newFile.size = file.raw.size
        this.fileList.push(file)
        formData.append('files', file.raw)
        formData.append('userId', this.dataInput.userId)
        formData.append('type', this.dataInput.idcard)
        // formData.append('name', file.name)
        file.percentage = 1
        const processFunction = function (progressEvent: any) {
          let progress = (progressEvent.loaded / progressEvent.total) * 100
          file.percentage = progress
        }
        const data: Record<string, any> = {}
        data.data = formData
        // ;(data.type = 'clgt'), (data.userId = 1)
        data.progress = processFunction
        const uid = file.uid
        const result: any = await this.apiUpload.uploadFile(data)

        this.idPhoto1 = result.success[0].url
        // th
        const index = findIndex(this.fileList, (item: Record<string, any>) => item.uid === uid)
        this.fileList[index].url = result.success[0].url
        this.isUpload = true
        // this.file.url = URL.createObjectURL(file.raw)
      }
      this.resetRotate(0)
      this.$forceUpdate()
    }

    //end unload img 1

    // start upload img 2
    async handleChangeFile2(file: Record<string, any>): Promise<void> {
      const formData = new FormData()
      if (file.status === 'ready') {
        file.type = file.raw.type
        // file = {
        //   ...file,
        //   load:
        // }
        // const newFile: Record<string, any> = {}
        // newFile.name = file.name
        // newFile.size = file.raw.size
        this.fileList2.push(file)
        formData.append('files', file.raw)
        formData.append('userId', this.dataInput.userId)
        formData.append('type', this.dataInput.idcard)
        // formData.append('name', file.name)
        file.percentage = 1
        const processFunction = function (progressEvent: any) {
          let progress = (progressEvent.loaded / progressEvent.total) * 100
          file.percentage = progress
        }
        const data: Record<string, any> = {}
        data.data = formData
        // ;(data.type = 'clgt'), (data.userId = 1)
        data.progress = processFunction
        const uid = file.uid
        const result: any = await this.apiUpload.uploadFile(data)
        this.idphoto2 = result.success[0].url
        const index = findIndex(this.fileList2, (item: Record<string, any>) => item.uid === uid)
        this.fileList2[index].url = result.success[0].url
      }
      this.resetRotate(1)
      this.$forceUpdate()
    }

    resetRotate(id: number): void {
      this.rotateDeg[id] = 0
    }

    //end upload img 2
    async handleChange(): Promise<void> {
      if (
        this.idPhoto1 == null ||
        this.idphoto2 == null ||
        this.selfiePhoto == null ||
        this.idPhoto1 == '' ||
        this.idphoto2 == '' ||
        this.selfiePhoto == '' ||
        this.dataInput.identificationNumber == null ||
        this.dataInput.identificationNumber == ''
      ) {
        let message: any = ''
        message = this.$t('settingkyc.validatePhoto')
        this.$message.error({ message, duration: 5000 })
      } else {
        const params = {
          identificationType: this.dataInput.idcard,
          userId: this.dataInput.userId,
          firstName: this.dataInput.firstName,
          lastName: this.dataInput.lastName,
          identificationNumber: this.dataInput.identificationNumber,
          nationality: this.dataInput.nationality,
          idPhoto1: this.idPhoto1,
          idPhoto2: this.idphoto2,
          selfiePhoto: this.selfiePhoto,
          rotateSelfiePhoto: `rotate(${this.rotateDeg[2]}deg)`,
          rotatePhoto2: `rotate(${this.rotateDeg[1]}deg)`,
          rotatePhoto1: `rotate(${this.rotateDeg[0]}deg)`
        }
        const formData = new FormData()
        this.loading = true
        formData.append('file', this.file)
        if (this.file) {
          await this.api
            ?.updateKyc(params)
            .then(res => {
              this.dataDetail = res
              this.$message.success('Lưu thành công')
            })
            .catch(() => {
              // this.form.avatar = this.user.avatar
              this.$message.warning('Lưu thất bại')
            })
        }
        //update reject
        if (this.statusKyc === 'REJECTED') {
          // console.log('data', this.dataInput)

          // await this.updateProfile()
          const data = {
            // ...this.dataInput,
            ...this.updateUser,
            ...this.dataInput,
            idPhoto1: this.idPhoto1,
            idPhoto2: this.idphoto2,
            selfiePhoto: this.selfiePhoto,
            identificationNumber: this.dataInput.identificationNumber,
            identificationType: this.dataInput.idcard,
            nationality: this.dataInput.nationality,
            rotateSelfiePhoto: `rotate(${this.rotateDeg[2]}deg)`,
            rotatePhoto2: `rotate(${this.rotateDeg[1]}deg)`,
            rotatePhoto1: `rotate(${this.rotateDeg[0]}deg)`
          }
          this.api?.updateKycReject(data).then(() => {
            this.statusKyc = 'PENDING'
          })
        }
        this.loading = false
        this.isUpload = false
      }
    }

    //start upload3
    async handleChangeFile3(file: Record<string, any>): Promise<void> {
      const formData = new FormData()
      if (file.status === 'ready') {
        file.type = file.raw.type
        this.fileList3.push(file)
        formData.append('files', file.raw)
        formData.append('userId', this.dataInput.userId)
        formData.append('type', this.dataInput.idcard)
        // formData.append('name', file.name)
        file.percentage = 1
        const processFunction = function (progressEvent: any) {
          let progress = (progressEvent.loaded / progressEvent.total) * 100
          file.percentage = progress
        }
        const data: Record<string, any> = {}
        data.data = formData
        // ;(data.type = 'clgt'), (data.userId = 1)
        data.progress = processFunction
        const uid = file.uid
        const result: any = await this.apiUpload.uploadFile(data)
        this.selfiePhoto = result.success[0].url
        const index = findIndex(this.fileList3, (item: Record<string, any>) => item.uid === uid)
        this.fileList3[index].url = result.success[0].url
      }
      this.resetRotate(2)
      this.$forceUpdate()
    }

    handleRemove(): void {
      this.idPhoto1 = ''
      this.fileList = []
    }

    handleRemove2(): void {
      this.idphoto2 = ''
      this.fileList = []
    }

    handleRemove3(): void {
      this.selfiePhoto = ''
      this.fileList = []
    }

    // end upload 3
    updateUser: Record<string, any> = {}

    getUser(): void {
      this.apiAuth
        ?.getInfo()
        .then((res: any) => {
          this.dataInput = {
            ...this.dataInput,
            ...res
          }
          this.updateUser = res
          // this.query.total = res.data
          this.checkStatusKyc()
        })
        .catch(e => {
          console.log(e)
        })
    }

    photo1 = ''

    async checkStatusKyc(): Promise<void> {
      const param = {
        userId: this.dataInput.userId
      }
      const result = await this.api?.checkStatusKyc(param)
      this.statusKyc = result.data
      if (this.statusKyc == 'REJECTED') {
        const typeReject = await apiParams.getTypeReject({ type: 'KYC_REJECT_REASON' })

        const result = await this.api?.getDetailKyc(this.dataInput.userId)

        this.dataDetail = result.data
        this.idPhoto1 = this.dataDetail.idPhoto1
        this.idphoto2 = this.dataDetail.idPhoto2
        this.selfiePhoto = this.dataDetail.selfiePhoto
        this.dataInput.idcard = result.data.identificationType
        this.dataInput = { ...this.dataInput, ...this.dataDetail }
        this.rotateDeg = {
          0: parseInt(this.dataDetail.rotatePhoto1.replace(/[^0-9]/g, '')),
          1: parseInt(this.dataDetail.rotatePhoto2.replace(/[^0-9]/g, '')),
          2: parseInt(this.dataDetail.rotateSelfiePhoto.replace(/[^0-9]/g, ''))
        }

        const arrReasonIds = this.dataDetail.kycRejectReasonIds.split(',')
        this.listRejectReason = arrReasonIds.reduce((prev: any, cur) => {
          const value = filter(typeReject.content, elm => elm.id == cur)[0]
          prev.push(value)
          return prev
        }, [])
      }
      if (this.statusKyc === 'VERIFIED') {
        this.api?.limitDetails().then(res => {
          this.listLevel = res
          this.currentLevel = filter(this.listLevel, level => level.id === this.dataInput.userGroupId)[0]
        })
      }
    }

    dataKYC = {
      type: this.dataInput.idcard,
      // rfrId= this.dataUser.rfrId,
      // firstName= this.dataUser.firstName,
      // lastName= this.dataUser.lastName,
      identificationNumber: '',
      nationality: '',
      idPhoto1: '',
      idPhoto2: '',
      selfiePhoto: ''
    }
    countryCode = ''
    country = ''
    dataDetailProfile: any = {}

    async getproFile(): Promise<void> {
      await api.getProfile().then((res: any) => {
        this.dataDetailProfile = res.data
        this.country = res.data.country
        this.countryCode = res.data.countryCode
      })
    }

    async handleCreate(): Promise<any> {
      if (
        this.idPhoto1 == null ||
        this.idphoto2 == null ||
        this.selfiePhoto == null ||
        this.idPhoto1 == '' ||
        this.idphoto2 == '' ||
        this.selfiePhoto == '' ||
        this.dataInput.identificationNumber == null ||
        this.dataInput.identificationNumber == '' ||
        this.dataInput.nationality == '' ||
        this.dataInput.nationality == null
      ) {
        let message: any = ''
        message = this.$t('settingkyc.validatePhoto')
        this.$message.error({ message, duration: 5000 })
      } else {
        // await this.updateProfile()
        const params = {
          // nationality: this.dataInput.nationality,
          ...this.updateUser,
          idPhoto1: this.idPhoto1,
          idPhoto2: this.idphoto2,
          selfiePhoto: this.selfiePhoto,
          nationality: this.dataInput.nationality,
          identificationType: this.dataInput.idcard,
          userId: this.dataInput.userId,
          firstName: this.dataInput.firstName,
          lastName: this.dataInput.lastName,
          rotateSelfiePhoto: `rotate(${this.rotateDeg[2]}deg)`,
          rotatePhoto2: `rotate(${this.rotateDeg[1]}deg)`,
          rotatePhoto1: `rotate(${this.rotateDeg[0]}deg)`,
          identificationNumber: this.dataInput.identificationNumber
        }
        this.api
          ?.CreateDataKyc(params)
          .then(() => {
            let message: any = ''
            message = this.$t('settingkyc.updateSuccess')
            this.$message.success(message)
            this.statusKyc == 'PENDING'
            // this.updateProfile()
            setTimeout(() => {
              this.getUser()
            }, 1000)
          })
          .catch(error => {
            // if (error.errorCode === 500 && error.message === 'Mã chương trình đã tồn tại') {
            //   this.$message.error(error.message)
            // }
            console.log(error)
          })
      }
    }

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
      nationality: ''
    }

    updateProfile(): void {
      delete this.updateUser.roles
      const params = {
        // email: this.updateUser.email,
        // firstName: this.dataInput.firstName,
        // lastName: this.dataInput.lastName,
        // confirm: false,
        // id: this.updateUser.userId,
        // avatar: this.updateUser.avatar,
        // displayName: this.updateUser.displayName,
        // birthday: '',
        // address: this.updateUser.address,
        // cityName: this.updateUser.cityName,
        // stateName: this.updateUser.stateName,
        // country: this.country,
        // countryCode: this.countryCode,
        ...this.dataDetailProfile,
        nationality: this.dataInput.nationality
      }
      console.log('params', params)
      this.api
        ?.updateProfile(params)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }

    //rotate image 0:idPhoto1,1:idPhoto2,2:idPhotoSelfie
    rotateDeg = {
      0: 0,
      1: 0,
      2: 0
    }

    // function rotate image
    rotateRightImage(id: number) {
      if (this.rotateDeg[id] < 270) {
        this.rotateDeg[id] += 90
      } else {
        this.rotateDeg[id] = 0
      }
    }

    created(): void {
      this.api = getRepository('setting')
      this.apiUpload = getRepository('upload')
      this.apiAuth = getRepository('auth')
    }

    mounted(): void {
      this.getUser()
      this.getproFile()
      // this.form = { ...this.user }
    }
  }
</script>

<style lang="scss" scoped>
  .kyc-content {
    background-color: var(--bc-color-white);
    padding: 20px 25px;
    // khi thanh cong
    .kyc-success {
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: var(--bc-color-white);

      .icon-success {
        // margin-left: 20px;
        // background-color: var(--bc-btn-bg-hover);
        // border-radius: 50%;
        margin-right: 20px;
        // width: 52px;
        // text-align: center;
      }

      .information-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .description {
        color: var(--bc-color-grey230);
      }
    }

    .personal-verifi-hedding {
      font-size: 24px;
      line-height: 32px;
      font-weight: 600;
      margin-top: 4px;
    }

    .personal-verifi-about-form {
      border-bottom: 1px solid var(--bc-color-gray);
      margin-top: 24px;
    }

    .type--insurance {
      margin-bottom: -16px;
      margin-top: -12px;
      color: #2b2b2b;
    }

    .personal-verifi-form {
      max-width: 540px;
    }

    .personal-verifi-front-side,
    .personal-verifi-back-side {
      display: flex;
      align-items: center;
      justify-content: start;
    }

    .personal-verifi-front-side {
      margin-top: 24px;
      margin-bottom: 32px;
    }

    .personal-verifi-id-photo {
      font-size: 16px;
      font-weight: 600;
      margin: 24px 0 16px 0;
      line-height: 24px;
    }

    // .icon-success {
    //   background-color: var(--bc-btn-bg-hover);
    //   border-radius: 50%;
    //   margin-right: 20px;
    //   width: 52px;
    //   text-align: center;
    // }
    .k-tick1,
    .k-tick2 {
      display: flex;
      flex-direction: column;
    }

    .k-tick1 {
      margin-right: 30px;
    }

    .tick-note {
      display: flex;
      margin-top: 16px;
      margin-bottom: 16px;
    }

    .example {
      margin: 0 24px;
      color: var(--bc-text-discript);
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
    }

    .style-headding {
      margin: 24px 0px;
    }

    .btn-about-button {
      margin-top: 24px;
    }

    .error {
      color: var(--bc-status-error);
    }

    .personal-verifi-id-photo-description {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: var(--bc-text-discript);
    }

    .el-button--primary {
      color: var(--bc-color-white);
      background-color: var(--bc-text-hyperlink);
      border-color: var(--bc-text-hyperlink);
    }

    .el-button--primary:hover {
      background: var(--bc-btn-bg-default-hover);
    }

    .btn-style {
      padding: 10px 41px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
    }
    .btn-theme {
      background: var(--bc-theme-primary-gradient) !important;
      border: none;
      &:hover {
        background: var(--bc-theme-primary-gradient-hover) !important;
      }
    }

    .btn-style-default {
      color: var(--bc-color-grey150);
      border: 1px solid var(--bc-color-grey50);
    }

    .btn-style-default:hover {
      // color: var(--bc-theme-primary);
      // border: 1px solid var(--bc-theme-primary);
      // background-color: var(--bc-color-white);
      p {
        border-color: var(--bc-btn-default-border-hover);
        background: var(--bc-btn-default-text-hover);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0px 0px #00000000;
      }
    }

    .style-headding-side {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: var(--bc-text-discript);
    }

    .el-upload__text {
      color: var(--bc-text-discript);
      font-weight: 400;
      line-height: 20px;
      margin-top: 8px;
    }

    .img-style {
      width: 446px;
      height: 320px;
    }

    .style-avatar {
      width: 360px;
      height: 230px;
    }

    .style-note-tick {
      color: var(--bc-text-discript);
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }

    .color-success {
      margin-right: 5px;
    }

    .el-input__clear {
      float: right;
    }

    .kyc-reject,
    .kyc-success-top {
      display: flex;
      align-items: flex-start;
      background-color: var(--bc-color-red);
      padding: 18px 20px 16px 18px;

      .reject-title {
        font-size: 18px;
        font-weight: 24px;
        font-weight: 600;
      }

      .reject-desscription {
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        color: var(--bc-text-discript);
      }

      .reject-error {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        margin-top: 16px;
      }

      .reject-item {
        position: relative;
        padding-left: 16px;
        margin-bottom: 8px;
      }

      .reject-item::before {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        top: 11px;
        left: 0;
        background-color: var(--bc-text-discript);
        border-radius: 50%;
      }

      .reject-close {
        margin-left: auto;
      }
    }

    .sack-reject,
    .sack-sucess {
      padding-left: 18px;
    }

    .mt48 {
      margin-top: 48px;
    }

    .fw16 {
      font-weight: 600;
    }

    .kyc-success-top {
      background-color: var(--bc-bg-vefied) !important;
      border-radius: 4px;
    }

    .kyc-success-top--clm {
      background-color: #eafcfb !important;
    }

    .icon-success1,
    .icon-pendding {
      margin-right: 18px;
    }

    .success-desscription {
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      margin-top: 8px;
    }

    .success-link {
      text-decoration: none;
      color: var(--bc-theme-dark);
      cursor: pointer;
    }

    .kyc-success-bottom {
      display: flex;
      padding-top: 48px;
    }

    .kyc-pendding {
      display: flex;
      align-items: center;
    }

    .pendding-title {
      font-size: 18px;
      font-weight: 24px;
      font-weight: 600;
    }

    .pendding-description {
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      color: var(--bc-text-discript);
      margin-top: 8px;
    }

    .close {
      display: none;
    }

    .success-title {
      font-size: 18px;
      line-height: 24px;
      font-weight: 600;
    }

    .success-success-desscription {
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      margin-top: 8px;
    }

    .nav-image {
      position: absolute;
      bottom: 8px;
      left: 35%;
    }

    .rotate,
    .clear {
      border-radius: 4px;
      padding: 4px 8px;
      margin-right: 16px;
      display: inline-block;
      background: #ffffff;
      border: 1px solid #dbdbdb;
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      color: #3b3a39;
      cursor: pointer;
    }

    .clear {
      display: flex;
      align-items: center;
      margin-right: 0;
    }
  }
</style>
