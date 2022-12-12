<template>
  <div class="box-8">
    <div class="title-1">
      <div class="title-folder">
        <div class="title-folder-top">
          <img src="../../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
          <span> {{ $t('faq.title') }}</span>
        </div>
        <div class="title-folder-center">{{ $t('faq.faq') }}</div>
      </div>
    </div>
    <div class="box-8-container">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :title="$t('footer.col-1')" :name="1">
          <div>
            {{ $t('footer.col-content-1') }}
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('footer.col-2')" :name="2">
          <div>
            <p>
              {{ $t('footer.col-content-2') }}
            </p>
            <p style="margin-top: 10px">
              {{ $t('footer.col-content-2,2') }}
            </p>
            <p style="margin-top: 10px">
              {{ $t('footer.col-content-2,3') }}
            </p>
            <p style="margin-top: 10px">
              {{ $t('footer.col-content-2,4') }}
            </p>
            <p style="margin-top: 10px">
              {{ $t('footer.col-content-2,5') }}
            </p>
            <p style="margin-top: 10px">
              {{ $t('footer.col-content-2,6') }}
            </p>
            <p style="margin-top: 10px">
              {{ $t('footer.col-content-2,7') }}
            </p>
            <p style="margin-top: 10px">
              {{ $t('footer.col-content-2,8') }}
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('footer.col-3')" :name="3">
          <div>
            {{ $t('footer.col-content-3') }}
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('footer.col-4')" :name="4">
          <div>
            {{ $t('footer.col-content-4') }}
          </div>
        </el-collapse-item>
        <!-- <el-collapse-item :title="$t('footer.col-5')" :name="5">
          <div>
            {{ $t("footer.col-content-5") }}
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('footer.col-6')" :name="6">
          <div>
            {{ $t("footer.col-content-6") }}
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('footer.col-7')" :name="7">
          <div>
            {{ $t("footer.col-content-7") }}
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('footer.col-8')" :name="8">
          <div>
            {{ $t("footer.col-content-8") }}
          </div>
        </el-collapse-item> -->
      </el-collapse>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeNames: 1,
        form: {
          name: '',
          email: '',
          phone: '',
          message: ''
        },
        validate: {
          email: true,
          phone: true,
          message: true,
          name: true
        }
      }
    },
    methods: {
      handleChange(val) {
        this.activeNames = val
      },
      handleBlurEmail() {
        const re = /\S+@\S+\.\S+/
        this.validate.email = re.test(this.form.email)
      },
      handleBlurName() {
        this.validate.name = this.form.name !== ''
      },
      handleBlurPhone() {
        this.validate.phone = this.form.phone !== ''
      },
      handleBlurMessage() {
        this.validate.message = this.form.message !== ''
      },
      handleSendEmail() {
        this.handleBlurEmail()
        this.handleBlurName()
        this.handleBlurPhone()
        this.handleBlurMessage()
        if (!this.validate.name || !this.validate.email || !this.validate.message || !this.validate.phone) {
          return
        }
        // if (this.form.name && this.form.email && this.form.message && this.validate.email) {
        //   const subject = `${this.form.name} - ${this.form.email} - ${this.form.phone} has sent a question`
        //   // const data = {
        //   //   recipientEmail: 'chaulongdbp@gmail.com',
        //   //   code: '',
        //   //   fullName: '',
        //   //   subject,
        //   //   sendFrom: this.form.email,
        //   //   reason: '',
        //   //   content: this.form.message
        //   // }
        //
        //   // axios.post('https://test-blockchain-api.beedu.vn/api/v1/submitform', data).then(() => {
        //   //   // this.$message({
        //   //   //   showClose: true,
        //   //   //   message: 'Email sent successfully',
        //   //   //   type: 'success'
        //   //   // })
        //   //   this.formSuccess = true
        //   //   setTimeout(() => {
        //   //     this.formSuccess = false
        //   //   }, 2000)
        //   //
        //   //   this.form = {
        //   //     name: '',
        //   //     email: '',
        //   //     phone: '',
        //   //     message: ''
        //   //   }
        //   //   this.validate = {
        //   //     email: true,
        //   //     phone: true,
        //   //     message: true,
        //   //     name: true
        //   //   }
        //   // })
        // }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .box-8-container {
    max-width: 1366px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .title-1 {
    margin-bottom: 60px;
    padding-top: 100px;
    text-align: center;

    .title-folder-top {
      justify-content: center;
      color: #ececec;
      opacity: 0.5;
      font-size: 20px;
      line-height: 18px;
    }

    .title-folder-center {
      font-size: 48px;
      color: #ececec;
      font-weight: 600;
      margin-bottom: 32px;
    }

    .title-folder-bottom {
      font-size: 18px;
      color: #ececec;
    }

    @media (max-width: 1200px) {
    }

    @media (min-width: 740px) and (max-width: 1024px) {
      padding-top: 80px;
    }

    @media (max-width: 739px) {
      text-align: left;
      padding-left: 20px;
      padding-top: 56px;
      .title-folder-top {
        justify-content: left;
      }
      .title-folder-center {
        font-size: 24px;
      }
    }
  }

  .box-8 {
    background-color: #1d1a1a;
    // padding-bottom: 460.81px;
  }

  @media (min-width: 740px) and (max-width: 1024px) {
    .box-8 {
      padding-bottom: 80px;
    }
    .title-1 {
      flex-shrink: 0;

      .title-folder-center {
        font-size: 32px;
      }
    }
    .form-question {
      align-items: center;
      width: 85% !important;

      textarea {
        width: 360px !important;
      }

      .fullname {
        input {
          width: 360px !important;
        }
      }

      .yourphone,
      .email {
        input {
          width: 168px !important;
        }
      }

      .btn-submit-box {
        width: 360px !important;
      }
    }
  }

  @media (max-width: 739px) {
    .form-question {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 710px !important;
      bottom: -165px !important;

      textarea {
        width: 330px !important;
      }

      .fullname {
        input {
          width: 330px !important;
        }
      }

      .be-flex {
        display: block !important;
      }

      .yourphone,
      .email {
        input {
          width: 330px !important;
        }
      }

      .btn-submit-box {
        width: auto !important;
      }

      .title-1 {
        margin-right: 0 !important;
        margin-bottom: 30px !important;

        .title-folder-top {
        }

        .title-folder-center {
          margin-bottom: 0 !important;
        }
      }

      .fl-right {
        width: 100%;
      }

      .btn-submit {
        width: 100% !important;
      }
    }
    .grid.wide {
      padding: 0 20px;
    }
  }

  .el-icon-arrow-right:before {
    content: '\e6e1' !important;
  }
</style>
