<template>
  <section id="docs">
    <div id="docs" class="document-card">
      <div class="grid wide">
        <div class="title-1">
          <div class="title-folder">
            <div class="title-folder-top">
              <img src="../../../assets/image/line.png" style="height: 1px; margin-right: 16px" alt="" />
              <span>{{ $t('docs.title') }}</span>
            </div>
            <div class="title-folder-center">{{ $t('docs.docs') }}</div>
            <div class="title-folder-bottom">{{ $t('docs.intro') }}</div>
          </div>
        </div>
        <div class="box-download be-flex row">
          <!-- <div class="start-1 col l-3 m-6 c-12">
          <div class="po-relative image-title">
            <img src="../../../assets/image/Star-1.png" style="" alt="" />
            <div class="title-star po-absolute">
              <svg
                width="88"
                height="88"
                viewBox="0 0 88 88"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M78.2805 82.371H23.9164C21.3469 82.371 19.2586 80.2828 19.2586 77.7132V10.0804C19.2586 7.51089 21.3469 5.42261 23.9164 5.42261H66.1375C66.9969 5.42261 67.693 6.1187 67.693 6.97808V18.6312H81.3828C82.2422 18.6312 82.9383 19.3273 82.9383 20.1867V77.7132C82.9383 80.2742 80.85 82.371 78.2805 82.371ZM23.9164 8.53355C23.057 8.53355 22.3609 9.22964 22.3609 10.089V77.7132C22.3609 78.5726 23.057 79.2687 23.9164 79.2687H78.2805C79.1399 79.2687 79.8359 78.5726 79.8359 77.7132V21.7335H66.1289C65.2695 21.7335 64.5734 21.0375 64.5734 20.1781V8.53355H23.9164Z"
                  fill="#B32DF0"
                />
                <path
                  d="M81.4172 21.7423H66.1633C65.3039 21.7423 64.6078 21.0462 64.6078 20.1868V6.97821C64.6078 6.36806 64.9602 5.81806 65.5188 5.56884C66.0688 5.31962 66.7219 5.40556 67.1774 5.80946L68.9133 7.30478C68.9305 7.31337 68.9391 7.33056 68.9563 7.33915L82.4399 19.0095C82.9297 19.4306 83.1016 20.1181 82.8782 20.7282C82.6461 21.3384 82.0703 21.7423 81.4172 21.7423ZM67.7188 18.6313H77.2578L67.7188 10.3727V18.6313ZM57.1055 67.1603H6.82346C5.84377 67.1603 5.04456 66.361 5.04456 65.3813V42.161C5.04456 41.1813 5.84377 40.3821 6.82346 40.3821H57.1141C58.0938 40.3821 58.893 41.1813 58.893 42.161V65.3813C58.8844 66.361 58.0852 67.1603 57.1055 67.1603Z"
                  fill="#B32DF0"
                />
                <path
                  d="M9.78827 44.8335H15.6578C19.6195 44.8335 22.6617 46.2085 22.6617 50.4366C22.6617 54.5187 19.5937 56.3491 15.7523 56.3491H13.3633V62.6999H9.78827V44.8335ZM15.5117 53.5304C17.9781 53.5304 19.1555 52.4905 19.1555 50.4366C19.1555 48.3569 17.8492 47.6608 15.3914 47.6608H13.3633V53.5304H15.5117ZM25.893 44.8335H30.7914C36.2484 44.8335 39.6258 47.6608 39.6258 53.6936C39.6258 59.7093 36.2484 62.6999 30.9805 62.6999H25.8844V44.8335H25.893ZM30.5766 59.8296C33.9109 59.8296 35.982 58.0421 35.982 53.6936C35.982 49.3194 33.9023 47.678 30.5766 47.678H29.468V59.821H30.5766V59.8296ZM43.132 44.8335H54.1406V47.8069H46.707V52.4647H53.0578V55.4554H46.707V62.6999H43.132V44.8335Z"
                  fill="#21242A"
                />
              </svg>
              <p>ONE PAGE</p>
            </div>
          </div>
          <div class="btn-download">
            <a
              href="https://docs.google.com/document/d/1ICsRFEoFFVI16WPyr0mlxPbFfzT5dL0a/edit?usp=sharing&ouid=114046845218579046653&rtpof=true&sd=true"
              target="_blank"
              download
            >
              <span>{{ $t("docs.down") }}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.99969 17V19C3.99969 19.5304 4.21041 20.0391 4.58548 20.4142C4.96055 20.7893 5.46926 21 5.99969 21H17.9997C18.5301 21 19.0388 20.7893 19.4139 20.4142C19.789 20.0391 19.9997 19.5304 19.9997 19V17"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.99969 11L11.9997 16L16.9997 11"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 4V16"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div> -->
          <a href="https://lynkey.com/media/LynKey-Presentation-Deck-Main.pdf" target="_blank" class="start-1 col l-3 m-6 c-12">
            <div class="po-relative image-title">
              <img src="../../../assets/image/Star-1.png" style="" alt="" />
              <div class="title-star start-2 po-absolute">
                <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M78.2805 82.371H23.9164C21.3469 82.371 19.2586 80.2828 19.2586 77.7132V10.0804C19.2586 7.51089 21.3469 5.42261 23.9164 5.42261H66.1375C66.9969 5.42261 67.693 6.1187 67.693 6.97808V18.6312H81.3828C82.2422 18.6312 82.9383 19.3273 82.9383 20.1867V77.7132C82.9383 80.2742 80.85 82.371 78.2805 82.371ZM23.9164 8.53355C23.057 8.53355 22.3609 9.22964 22.3609 10.089V77.7132C22.3609 78.5726 23.057 79.2687 23.9164 79.2687H78.2805C79.1399 79.2687 79.8359 78.5726 79.8359 77.7132V21.7335H66.1289C65.2695 21.7335 64.5734 21.0375 64.5734 20.1781V8.53355H23.9164Z"
                    fill="#EC647D"
                  />
                  <path
                    d="M81.4172 21.7423H66.1633C65.3039 21.7423 64.6078 21.0462 64.6078 20.1868V6.97821C64.6078 6.36806 64.9602 5.81806 65.5188 5.56884C66.0688 5.31962 66.7219 5.40556 67.1774 5.80946L68.9133 7.30478C68.9305 7.31337 68.9391 7.33056 68.9563 7.33915L82.4399 19.0095C82.9297 19.4306 83.1016 20.1181 82.8782 20.7282C82.6461 21.3384 82.0703 21.7423 81.4172 21.7423ZM67.7188 18.6313H77.2578L67.7188 10.3727V18.6313ZM57.1055 67.1603H6.82346C5.84377 67.1603 5.04456 66.361 5.04456 65.3813V42.161C5.04456 41.1813 5.84377 40.3821 6.82346 40.3821H57.1141C58.0938 40.3821 58.893 41.1813 58.893 42.161V65.3813C58.8844 66.361 58.0852 67.1603 57.1055 67.1603Z"
                    fill="#EC647D"
                  />
                  <path
                    d="M9.78827 44.8335H15.6578C19.6195 44.8335 22.6617 46.2085 22.6617 50.4366C22.6617 54.5187 19.5937 56.3491 15.7523 56.3491H13.3633V62.6999H9.78827V44.8335ZM15.5117 53.5304C17.9781 53.5304 19.1555 52.4905 19.1555 50.4366C19.1555 48.3569 17.8492 47.6608 15.3914 47.6608H13.3633V53.5304H15.5117ZM25.893 44.8335H30.7914C36.2484 44.8335 39.6258 47.6608 39.6258 53.6936C39.6258 59.7093 36.2484 62.6999 30.9805 62.6999H25.8844V44.8335H25.893ZM30.5766 59.8296C33.9109 59.8296 35.982 58.0421 35.982 53.6936C35.982 49.3194 33.9023 47.678 30.5766 47.678H29.468V59.821H30.5766V59.8296ZM43.132 44.8335H54.1406V47.8069H46.707V52.4647H53.0578V55.4554H46.707V62.6999H43.132V44.8335Z"
                    fill="#21242A"
                  />
                </svg>
                <p>PITCH DECK</p>
              </div>
            </div>
            <div class="btn-download btn-download-2">
              <a href="https://lynkey.com/media/LynKey-Presentation-Deck-Main.pdf" target="_blank">
                <span>{{ $t('docs.down') }}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.99969 17V19C3.99969 19.5304 4.21041 20.0391 4.58548 20.4142C4.96055 20.7893 5.46926 21 5.99969 21H17.9997C18.5301 21 19.0388 20.7893 19.4139 20.4142C19.789 20.0391 19.9997 19.5304 19.9997 19V17"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path d="M6.99969 11L11.9997 16L16.9997 11" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 4V16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </a>
            </div>
          </a>
          <a href="https://lynkey.com/media/LynKey-White-Paper-Tokenomics-Main.pdf" target="_blank" class="start-1 col l-3 m-6 c-12">
            <div class="po-relative image-title">
              <img src="../../../assets/image/Star-1.png" style="" alt="" />
              <div class="title-star start-3 po-absolute">
                <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M78.2805 82.371H23.9164C21.3469 82.371 19.2586 80.2828 19.2586 77.7132V10.0804C19.2586 7.51089 21.3469 5.42261 23.9164 5.42261H66.1375C66.9969 5.42261 67.693 6.1187 67.693 6.97808V18.6312H81.3828C82.2422 18.6312 82.9383 19.3273 82.9383 20.1867V77.7132C82.9383 80.2742 80.85 82.371 78.2805 82.371ZM23.9164 8.53355C23.057 8.53355 22.3609 9.22964 22.3609 10.089V77.7132C22.3609 78.5726 23.057 79.2687 23.9164 79.2687H78.2805C79.1399 79.2687 79.8359 78.5726 79.8359 77.7132V21.7335H66.1289C65.2695 21.7335 64.5734 21.0375 64.5734 20.1781V8.53355H23.9164Z"
                    fill="#FFB06D"
                  />
                  <path
                    d="M81.4172 21.7423H66.1633C65.3039 21.7423 64.6078 21.0462 64.6078 20.1868V6.97821C64.6078 6.36806 64.9602 5.81806 65.5188 5.56884C66.0688 5.31962 66.7219 5.40556 67.1774 5.80946L68.9133 7.30478C68.9305 7.31337 68.9391 7.33056 68.9563 7.33915L82.4399 19.0095C82.9297 19.4306 83.1016 20.1181 82.8782 20.7282C82.6461 21.3384 82.0703 21.7423 81.4172 21.7423ZM67.7188 18.6313H77.2578L67.7188 10.3727V18.6313ZM57.1055 67.1603H6.82346C5.84377 67.1603 5.04456 66.361 5.04456 65.3813V42.161C5.04456 41.1813 5.84377 40.3821 6.82346 40.3821H57.1141C58.0938 40.3821 58.893 41.1813 58.893 42.161V65.3813C58.8844 66.361 58.0852 67.1603 57.1055 67.1603Z"
                    fill="#FFB06D"
                  />
                  <path
                    d="M9.78827 44.8335H15.6578C19.6195 44.8335 22.6617 46.2085 22.6617 50.4366C22.6617 54.5187 19.5937 56.3491 15.7523 56.3491H13.3633V62.6999H9.78827V44.8335ZM15.5117 53.5304C17.9781 53.5304 19.1555 52.4905 19.1555 50.4366C19.1555 48.3569 17.8492 47.6608 15.3914 47.6608H13.3633V53.5304H15.5117ZM25.893 44.8335H30.7914C36.2484 44.8335 39.6258 47.6608 39.6258 53.6936C39.6258 59.7093 36.2484 62.6999 30.9805 62.6999H25.8844V44.8335H25.893ZM30.5766 59.8296C33.9109 59.8296 35.982 58.0421 35.982 53.6936C35.982 49.3194 33.9023 47.678 30.5766 47.678H29.468V59.821H30.5766V59.8296ZM43.132 44.8335H54.1406V47.8069H46.707V52.4647H53.0578V55.4554H46.707V62.6999H43.132V44.8335Z"
                    fill="#21242A"
                  />
                </svg>
                <p>WHITE PAPER</p>
              </div>
            </div>
            <div class="btn-download btn-download-3">
              <a href="https://lynkey.com/media/LynKey-White-Paper-Tokenomics-Main.pdf" target="_blank">
                <span>{{ $t('docs.down') }}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.99969 17V19C3.99969 19.5304 4.21041 20.0391 4.58548 20.4142C4.96055 20.7893 5.46926 21 5.99969 21H17.9997C18.5301 21 19.0388 20.7893 19.4139 20.4142C19.789 20.0391 19.9997 19.5304 19.9997 19V17"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path d="M6.99969 11L11.9997 16L16.9997 11" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 4V16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </a>
            </div>
          </a>
          <!-- <div class="start-1 col l-3 m-6 c-12">
          <div class="po-relative image-title">
            <img src="../../assets/image/Star-1.png" style="" alt="" />
            <div class="title-star start-4 po-absolute">
              <svg
                width="88"
                height="88"
                viewBox="0 0 88 88"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M78.2805 82.371H23.9164C21.3469 82.371 19.2586 80.2828 19.2586 77.7132V10.0804C19.2586 7.51089 21.3469 5.42261 23.9164 5.42261H66.1375C66.9969 5.42261 67.693 6.1187 67.693 6.97808V18.6312H81.3828C82.2422 18.6312 82.9383 19.3273 82.9383 20.1867V77.7132C82.9383 80.2742 80.85 82.371 78.2805 82.371ZM23.9164 8.53355C23.057 8.53355 22.3609 9.22964 22.3609 10.089V77.7132C22.3609 78.5726 23.057 79.2687 23.9164 79.2687H78.2805C79.1399 79.2687 79.8359 78.5726 79.8359 77.7132V21.7335H66.1289C65.2695 21.7335 64.5734 21.0375 64.5734 20.1781V8.53355H23.9164Z"
                  fill="#26A542"
                />
                <path
                  d="M81.4172 21.7423H66.1633C65.3039 21.7423 64.6078 21.0462 64.6078 20.1868V6.97821C64.6078 6.36806 64.9602 5.81806 65.5188 5.56884C66.0688 5.31962 66.7219 5.40556 67.1774 5.80946L68.9133 7.30478C68.9305 7.31337 68.9391 7.33056 68.9563 7.33915L82.4399 19.0095C82.9297 19.4306 83.1016 20.1181 82.8782 20.7282C82.6461 21.3384 82.0703 21.7423 81.4172 21.7423ZM67.7188 18.6313H77.2578L67.7188 10.3727V18.6313ZM57.1055 67.1603H6.82346C5.84377 67.1603 5.04456 66.361 5.04456 65.3813V42.161C5.04456 41.1813 5.84377 40.3821 6.82346 40.3821H57.1141C58.0938 40.3821 58.893 41.1813 58.893 42.161V65.3813C58.8844 66.361 58.0852 67.1603 57.1055 67.1603Z"
                  fill="#26A542"
                />
                <path
                  d="M9.78827 44.8335H15.6578C19.6195 44.8335 22.6617 46.2085 22.6617 50.4366C22.6617 54.5187 19.5937 56.3491 15.7523 56.3491H13.3633V62.6999H9.78827V44.8335ZM15.5117 53.5304C17.9781 53.5304 19.1555 52.4905 19.1555 50.4366C19.1555 48.3569 17.8492 47.6608 15.3914 47.6608H13.3633V53.5304H15.5117ZM25.893 44.8335H30.7914C36.2484 44.8335 39.6258 47.6608 39.6258 53.6936C39.6258 59.7093 36.2484 62.6999 30.9805 62.6999H25.8844V44.8335H25.893ZM30.5766 59.8296C33.9109 59.8296 35.982 58.0421 35.982 53.6936C35.982 49.3194 33.9023 47.678 30.5766 47.678H29.468V59.821H30.5766V59.8296ZM43.132 44.8335H54.1406V47.8069H46.707V52.4647H53.0578V55.4554H46.707V62.6999H43.132V44.8335Z"
                  fill="#21242A"
                />
              </svg>
              <p>LEGAL OPINION</p>
            </div>
          </div>
          <div class="btn-download btn-download-4">
            <a
              href="https://docs.google.com/spreadsheets/d/1dT7er802xNXan_ZnBfAA7hnieHmt6J16/edit?usp=sharing&ouid=114046845218579046653&rtpof=true&sd=true"
              target="_blank"
              download
            >
              <span>{{ $t("docs.down") }}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.99969 17V19C3.99969 19.5304 4.21041 20.0391 4.58548 20.4142C4.96055 20.7893 5.46926 21 5.99969 21H17.9997C18.5301 21 19.0388 20.7893 19.4139 20.4142C19.789 20.0391 19.9997 19.5304 19.9997 19V17"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.99969 11L11.9997 16L16.9997 11"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 4V16"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  // import firebase from "@/utils/firebase";

  export default {
    props: {
      id: Number
    },
    data() {
      return {
        listener: null
      }
    },
    methods: {
      // checkLengthText() {
      //   let el = document.getElementById("docs");
      //   let divHeight = el.offsetHeight;
      //   let lineHeight = parseInt(el.style.lineHeight);
      //   let lines = divHeight / lineHeight;
      //   if (lines > 4) {
      //     this.showClass = true;
      //     this.numOfLine = lines;
      //   }
      // },
    },
    mounted() {
      // this.checkLengthText();
      // const leadsRef = firebase.ref("crowd-sales");
      // this.listener = leadsRef.on("value", function (snapshot) {
      //   console.log("firebase", snapshot.val());
      // });
    }
  }
</script>

<style lang="scss" scoped>
  .title-1 {
    padding: 100px 20px 60px 20px;
    text-align: center;
    @media (max-width: 739px) {
      margin-bottom: 0px;
      padding-bottom: 32px;
      padding-top: 56px;
      text-align: left;
    }

    .title-folder-top {
      justify-content: center;
      color: #ececec;
      opacity: 0.5;
      font-size: 20px;
      @media (max-width: 739px) {
        justify-content: start;
      }
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
  }
  .document-card {
    background-color: #151718;

    .box-download {
      justify-content: center;
      padding-bottom: 100px;

      .start-1 {
        // margin-right: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;

        .image-title {
          display: inline-block;
        }

        .title-star {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;

          p {
            color: #b32df0;
            font-weight: 700;
            font-size: 24px;
            margin-top: 28px;
          }
        }

        .start-2 {
          p {
            color: #ec647d;
          }
        }

        .start-3 {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          p {
            color: #ffb06d;
            white-space: nowrap;
          }
        }

        .start-4 {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          p {
            color: #26a542;
            white-space: nowrap;
          }
        }

        .btn-download {
          display: block;
          height: 48px;
          margin-top: 36px;
          // position: absolute;
          // left: 50%;
          // transform: translateX(-50%);
          // width: fit-content;

          a {
            width: 218px;
            height: 48px;
            background-color: #b32df0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            border-radius: 60px;
            // padding: 12px 48px;
            text-align: center;
            text-decoration: none;
            color: #ffffff;
            font-weight: 600;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            // padding: 0;
            span {
              margin-right: 10px;
            }
          }
        }

        .btn-download-2 {
          a {
            background-color: #ec647d;
          }
        }

        .btn-download-3 {
          a {
            background-color: #ffb06d;
          }
        }

        .btn-download-4 {
          a {
            background-color: #26a542;
          }
        }
      }
    }
    @media (max-width: 1200px) {
      .title-star {
        // top: 92px !important;
        // left: 60px !important;
      }
      // .btn-download {
      //   a {
      //     font-size: 13px !important;
      //   }
      // }
    }

    @media (min-width: 740px) and (max-width: 1023px) {
      .box-download {
        padding-bottom: 80px;
        .start-1 {
          margin-bottom: 50px;
          .btn-download {
            margin-top: 36px;
          }
        }
        .start-1:nth-child(3),
        .start-1:nth-child(4) {
          margin-bottom: 0;
        }
      }
    }

    @media (max-width: 739px) {
      .box-download {
        padding-bottom: 0px;
        .start-1 {
          margin-bottom: 40px;
          .btn-download {
            margin-top: 24px;
          }
        }
        .start-1:nth-child(4) {
          margin-bottom: 0;
        }
        .title-folder {
          text-align: left !important;
          padding: 0 20px !important;
        }
      }
    }
  }
</style>
