<template>
  <div class="sack-footer">
    <div class="footer">
      <div class="info">
        <div class="footer-content">
          <img src="../../../assets/image/logo-footer.png" alt="" class="logo-footer" />
          <div class="about-us">
            <div class="email-footer">
              Email:
              <a href="mailto:support@lynkey.com" style="color: #fff; text-decoration: none">support@lynkey.com</a>
            </div>
            <div class="line"></div>
            <div class="email-address">Address: Asia Leading Chambers, P.O. Box 986, Road Town, Tortola, British Virgin Islands</div>
          </div>
          <div class="footer-copyright">Copyright @2021 Lynkey International Ltd.</div>
          <div class="footer-icon">
            <a href="https://t.me/LynkeyToken" target="_blank"> <img src="../../../assets/image/tele.png" alt="" class="icon-ft" /></a>
            <a href="https://twitter.com/LynKey_" target="_blank"><img src="../../../assets/image/Twitter.png" alt="" class="icon-ft" /></a>
            <a href="https://www.facebook.com/LynKey-103648988780161" target="_blank"><img src="../../../assets/image/facebook.png" alt="" class="icon-ft" /></a>
            <a href="https://www.youtube.com/channel/UCH1a6zb0lnkt69rMLFdN4zg" target="_blank"><img src="../../../assets/image/youtube.png" alt="" class="icon-ft" /></a>
            <a href="https://www.linkedin.com/company/76635212 " target="_blank"><img src="../../../assets/image/linkdiln.png" alt="" class="icon-ft" /></a>
            <a href="https://www.instagram.com/lynkey__/" target="_blank"><img src="../../../assets/image/telegram.png" alt="" class="icon-ft" /></a>
            <a href="https://www.reddit.com/r/LynKey_Global/" target="_blank"><img src="../../../assets/image/reddit.png" alt="" /></a>
          </div>
        </div>
      </div>
      <vue-particles
        color="#ffffff"
        :particleOpacity="0.7"
        linesColor="#ffffff"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="6"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="160"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
      >
      </vue-particles>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeNames: [''],
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
        console.log(val)
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sack-footer {
    position: relative;
  }
  .footer {
    background-image: url('../../../assets/image/FOOTER.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 0px 277px;
    margin-top: -516px;
    margin-right: -2px;
    margin-left: -2px;

    .form-question {
      display: flex;
      background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
      box-shadow: 0px 3px 3px rgba(40, 52, 75, 0.08);
      border-radius: 20px;
      justify-content: space-between;
      padding: 60.19px 116.36px 49.81px 119.04px;
      margin: 0 auto;
      margin-bottom: 371.17px;

      .title-1 {
        .title-folder-top {
          justify-content: left;
        }

        .title-folder-center {
          text-align: left;
        }
      }
      .left {
        max-width: 204.9px;
      }
      .right {
        max-width: 662.51px;
        input {
          height: 52px;
          border-radius: 4px;
          border: none;

          &:focus {
            outline: none;
          }
        }

        textarea {
          width: 100%;
          height: 120px;
          border-radius: 4px;

          &:focus {
            outline: none;
          }
        }

        .fullname {
          input {
            width: 100%;
            height: 52px;
          }
        }
        .box-email-phone {
          display: flex;
          justify-content: space-between;
        }

        .fullname,
        .yourphone,
        .email,
        .text-area {
          color: #151718;
          margin-bottom: 24px;

          .form-label {
            top: 25px;
            left: 25px;
          }
        }
        .error-small {
          margin-top: 8px;
          color: #ffffff;
        }

        .btn-submit-box {
          width: 100%;
          display: flex;
          justify-content: right;
        }

        .btn-submit {
          border-radius: 50px;
          border: 2px solid #ffffff;
          padding: 15px 52px;
          font-size: 24px;
          background-color: transparent;
          color: #ffffff;
          cursor: pointer;
          font-weight: 700;
          line-height: 24px;
          font-family: 'Source Sans Pro';
        }

        .star {
          color: #e75757;
        }

        .form-input {
          border: 1px solid #eee;
          width: 100%;
          height: 50px;
          padding: 0 16.56px;
          font-size: 20px;
          transition: 0.25s ease;
          font-weight: 600;
          line-height: 20px;
          border-radius: 4px;
          color: var(--cle-black) !important;
        }

        input.form-input:focus {
          border: 1px solid #a7dada;
          outline: none !important;
          box-shadow: 0px 8px 16px rgba(135, 212, 235, 0.25);
        }

        textarea.form-textarea:focus {
          border: 1px solid #a7dada;
          outline: none !important;
          box-shadow: 0px 8px 16px rgba(135, 212, 235, 0.25);
        }
      }
      .form-field {
        position: relative !important;
      }

      .form-label {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 21px;
        user-select: none;
        font-size: 20px;
        line-height: 20px;
        font-weight: 400;
        color: #21242a;
        pointer-events: none;
        transition: 0.25s ease;
        font-family: 'Source Sans Pro';
      }

      .mb22 {
        margin-bottom: 22px;
      }

      .form-input:not(:placeholder-shown) + .form-label,
      .form-input:focus + .form-label {
        top: 0;
        left: 11px;
        padding: 0 10px;
        display: inline-block;
        background-color: white;
        color: var(--cle-gray);
        font-size: 16px;
      }

      /* textarea */
      .form-textarea {
        padding: 20px;
        border: 1px solid #eee;
        padding: 10px 20px;
        font-size: 20px;
        transition: 0.25s ease;
        font-weight: 400;
        line-height: 20px;
        border-radius: 4px;
        color: var(--cle-black) !important;
      }

      .form-field {
        position: relative;
      }

      .form-labelA {
        position: absolute;
        top: 25px;
        transform: translateY(-50%);
        left: 25px;
        user-select: none;
        font-size: 20px;
        line-height: 20px;
        font-weight: 400;
        pointer-events: none;
        transition: 0.25s ease;
        border-radius: 4px;
        color: #21242a;
        font-family: 'Source Sans Pro';
      }

      .form-textarea:not(:placeholder-shown) + .form-labelA,
      .form-textarea:focus + .form-labelA {
        top: 0;
        left: 11px;
        padding: 0 10px;
        display: inline-block;
        background-color: white;
        color: var(--cle-gray);
        font-size: 16px;
      }
    }
    .info {
      display: flex;
      justify-content: center;
      padding-top: 520px;
      .footer-content {
        text-align: center;
        .logo-footer {
          margin-bottom: 34.17px;
          width: 270px;
          @media (max-width: 739px) {
            width: 160px;
            margin-bottom: 24px;
          }
        }
        .about-us {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          font-size: 18px;
          font-weight: 400;
          line-height: 28px;
          .line {
            width: 1px;
            height: 20px;
            margin-right: 10px;
            margin-left: 10px;
            border-right: 1px solid white;
          }
        }
        .footer-copyright {
          margin-bottom: 32px;
          font-size: 18px;
          font-weight: 400;
          line-height: 28px;
        }
        .terms {
          margin-bottom: 63px;
          font-size: 20px;
          line-height: 28px;
          font-weight: 400;
        }
        .footer-app {
          margin: 0 auto;
          max-width: 429px;
          max-height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        .footer-icon {
          margin: 0 auto;
          max-width: 400px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 79.98px;
          position: relative;
          z-index: 100;
        }
        .link-app {
          max-width: 48%;
        }
      }
    }
  }
  .particles-js {
    position: absolute;
    bottom: 15vh;
    right: 0;
    width: 600px !important;
    height: 400px;
  }
  @media (max-width: 1710px) {
    .footer {
      padding: 0px 177px;
    }
  }
  @media (max-width: 1500px) {
    .footer {
      padding: 0px 77px;
    }
  }
  @media (max-width: 1300px) {
    .form-question {
      padding: 50px 80px 40px 80px;
    }
  }
  @media (max-width: 1240px) {
    .info {
      .email-footer,
      .email-address,
      .footer-copyright {
        line-height: 28px !important;
        text-align: center;
      }
      .about-us {
        display: unset !important;
        .line {
          display: none;
        }
        .email-footer,
        .email-address {
          margin-bottom: 16px;
        }
      }
      .footer-copyright {
        margin-bottom: 24px !important;
      }
      .footer-app {
        max-width: 429px;
        margin-bottom: 24px !important;
      }
      .footer-icon {
        margin-bottom: 60.17px !important;
      }
    }
  }
  @media (max-width: 1200px) {
    .form-question {
      padding: 60px 70px 40px 70px;
      .title-folder-top {
        font-size: 20px;
      }
      .title-folder-center {
        font-size: 32px;
      }
      .btn-submit {
        font-size: 24px;
      }
      .right {
        .form-input {
          font-size: 18px;
        }
        .error-small {
          font-size: 16px;
        }
      }
    }
  }
  @media (max-width: 1116px) {
    .footer {
      padding: 0px 50px;
      .form-question {
        padding: 60px 64px 40px 64px;
        .right {
          max-width: 600px;
          .yourphone,
          .email {
            width: 48%;
          }
        }
      }
    }
  }
  @media (max-width: 1024px) {
    .footer {
      padding: 0px 40px;
      background-image: url('../../../assets/image/bg-footer-tablet.png');
    }
  }
  @media (max-width: 850px) {
    .footer {
      .form-question {
        margin-bottom: 359px;
        .left {
          max-width: 139.96px;
        }
        .right {
          max-width: 360px;
        }
        .error-small {
          font-size: 12px;
        }
        .form-label {
          font-size: 18px;
        }
      }
      .info {
        .email-footer,
        .email-address,
        .footer-copyright,
        .terms {
          font-size: 18px !important;
        }
      }
    }
  }
  @media (max-width: 730px) {
    .sack-footer {
      // position: unset;
      margin-top: 117px;
    }
    .footer {
      background-image: url('../../../assets/image/mobile-footer.png');
      padding: 0px 30px;
      // min-height: 100vh;

      .form-question {
        padding: 40px 30px 40px 30px;
      }
      .info {
        padding-top: 372px;
        .footer-content {
          text-align: center;
          .about-us {
            text-align: left;
          }
        }
        .email-footer,
        .email-address,
        .footer-copyright,
        .terms {
          font-size: 16px !important;
        }
      }
    }
  }
  @media (max-width: 650px) {
    .form-question {
      display: block !important;
      padding-left: 20px !important;
      padding-right: 20px !important;
      .left {
        max-width: 100% !important;
        .title-folder-center {
          margin-top: 24px !important;
          margin-bottom: 31px !important;
        }
      }
      .right {
        max-width: 100% !important;
        .box-email-phone {
          display: block !important;
          .yourphone,
          .email {
            width: 100% !important;
          }
        }
        .fullname,
        .yourphone,
        .email {
          margin-bottom: 22px !important;
        }
      }
    }
  }
  @media (max-width: 568px) {
    .info {
      .email-footer,
      .email-address,
      .footer-copyright {
        text-align: left;
      }
    }
  }
  @media (max-width: 375px) {
    .footer {
      padding: 0px;
      .form-question {
        background-image: unset !important;
        border-radius: 0px;
        box-shadow: none;
        margin-bottom: 316px;
        .btn-submit-box {
          display: block !important;
          .btn-submit {
            width: 100%;
          }
        }
      }
      .info {
        .footer-content {
          padding-left: 20px;
          padding-right: 20px;
          text-align: center;

          .logo-footer {
            margin-bottom: 24px;
          }
        }
        .footer-icon {
          img {
            width: 37.65px;
            height: 39px;
          }
        }
      }
    }
  }
</style>
