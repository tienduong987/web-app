<template>
  <div id="product-list" class="wrap-detail">
    <div class="product">
      <div class="map">
        <!-- <div class="mapouter">
          <div class="gmap_canvas">
            <iframe
              class="gmap_iframe"
              width="100%"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com/maps?width=1120&amp;height=1000&amp;hl=en&amp;q=lang ha&amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
        </div> -->
        <img style="width: 100%; height: 100vh; object-fit: cover" src="../../../../icons/png/map.png" alt="" />
        <!-- <img src="https://s3.cloud.cmctelecom.vn/bework-production/blockchain/AVATAR/AVATAR_unsplash_JCMQo028t3Q_533122371_1641287137359.png" alt="" /> -->
      </div>

      <div class="content">
        <div class="product-filter">
          <div class="search">
            <div class="search__input">
              <el-input v-model="form.search" @keyup.enter.native="handleSearch" class="input-search" :placeholder="$t('placeholder.search-property')">
                <span slot="prefix" class="prefix-search">
                  <base-icon icon="icon-search" class="d-iflex" size="24" />
                </span>
              </el-input>
            </div>
            <div class="search__btn" style="padding-left: 24px">
              <button type="button" @click="handleSearch" class="header-6 text-semibold text-white is-none-border cursor btn-market-search">
                {{ $t('market-home.form.search') }}
              </button>
            </div>
          </div>
          <div class="filter-project">
            <div class="nav-filter">
              <div class="location" :class="form.projectIds && 'chose-active'">
                <el-select v-model="form.projectIds" @change="handleChangeProject" :placeholder="$t('placeholder.project')" clearable class="none-border-form-item">
                  <div v-infinite-scroll="loadMoreProject" infinite-scroll-delay="500" class="dropdown-menu-product-list">
                    <!-- <el-option :label="$t('market-home.form.all')" :value="null" /> -->
                    <el-option v-for="item in listProject" :key="item.id" :label="item.projectName" :value="item.id" />
                  </div>
                </el-select>
              </div>

              <div class="location" :class="form.productType && 'chose-active'">
                <el-select v-model="form.productType" @change="handleChangeProductType" :placeholder="$t('placeholder.type')" clearable class="none-border-form-item">
                  <div class="dropdown-menu-product-list">
                    <!-- <el-option :label="$t('market-home.form.all')" :value="null" /> -->
                    <el-option v-for="item in listType" :key="item.value" :label="item.value" :value="item.value" />
                  </div>
                </el-select>
              </div>
              <div class="location" :class="form.status !== '' && 'chose-active'">
                <el-select v-model="form.status" @change="handleChangeStatus" clearable :placeholder="$t('placeholder.status')" class="none-border-form-item">
                  <div class="dropdown-menu-product-list">
                    <!-- <el-option :label="$t('market-home.form.all')" :value="null" /> -->
                    <el-option v-for="item in listStatus" :key="item.id" :label="item.value" :value="item.value" />
                  </div>
                </el-select>
              </div>
              <div class="location" :class="form.price !== '' && 'chose-active'">
                <el-select
                  :placeholder="$t('placeholder.price')"
                  clearable
                  v-model="form.price"
                  @change="handleChangePrice"
                  class="none-border-form-item"
                  :popper-class="language === 'vi' ? 'market-price-popper market-price-popper--vi' : 'market-price-popper'"
                >
                  <div class="dropdown-menu-product-list">
                    <el-option v-for="item in listPrice" :key="item.id" :label="$t(`market-detail.${item.key}`)" :value="item.key" />
                  </div>
                </el-select>
              </div>
              <div class="location" :class="form.area !== '' && 'chose-active'">
                <el-select :placeholder="$t('placeholder.area')" @change="handleChangeArea" v-model="form.area" clearable class="none-border-form-item">
                  <div infinite-scroll-delay="500" class="dropdown-menu-product-list">
                    <el-option v-for="item in areaList" :key="item.id" :label="$t(`market-detail.${item.key}`)" :value="item.key" />
                  </div>
                </el-select>
              </div>
              <!-- <div class="setting">
                <base-icon icon="setting" size="15" />
                <div class="notification">3</div>
              </div> -->
            </div>
            <div class="information-filter">
              <div class="info">
                <p v-if="endElement > 1">
                  <b style="font-weight: bold">{{ startElement }} - {{ endElement }}</b> of <b style="font-weight: bold">{{ totalElement }}</b> {{ $t('market-detail.products') }}
                </p>
                <p v-else>
                  <b style="font-weight: bold">{{ startElement }} - {{ endElement }}</b> of <b style="font-weight: bold">{{ totalElement }}</b> {{ $t('market-detail.product') }}
                </p>
              </div>
              <div class="dot-filter"></div>
              <div class="sort-by">
                <el-dropdown trigger="click" @command="handleSort4">
                  <span class="el-dropdown-link">
                    {{ $t('market-detail.order') }}: <span class="text-sort-by" style="margin-left: 8px">{{ sortLabel }}</span
                    ><i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" class="dropdown-project-list">
                    <el-dropdown-item
                      v-for="(value, index) in sortsByLatest"
                      :key="index"
                      :class="sortActive4 === value.command ? 'active' : null"
                      :command="value.command"
                      :divided="value.divided"
                      ><span>{{ value.label }}</span>

                      <base-icon v-if="sortActive4 === value.command" icon="tick-color" size="16" />
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
        <div class="image-product">
          <div class="image1" @click="handleDetail(item.id)" v-for="item in listProduct" :key="item">
            <div class="img" style="positon: absolute">
              <img style="width: 100%; height: 240px; object-fit: cover" :src="item.avatar" alt="" />
              <div class="on-sale">{{ item.propertyStatus }}</div>
              <!-- <div class="icon-heart"><base-icon icon="heart" size="32" /></div> -->
            </div>
            <div class="product-content">
              <div class="image-content text-0xl" style="font-weight: 500">{{ item.propertyName }}</div>
              <div class="text-base1" style="padding-top: 8px; color: #5b616e">{{ item.projectName }}</div>
              <div class="icon-product" style="padding-top: 16px">
                <div class="sack-icon">
                  <base-icon icon="icon-bed" size="24" style="margin-right: 10px" />
                  <a style="font-size: 16px; line-height: 24px; font-weight: 400">{{ item.numOfBedroom }}</a>
                </div>
                <div class="sack-icon">
                  <base-icon icon="icon-park-outline_shower-head" size="24" style="margin-right: 10px" />
                  <a style="font-size: 16px; line-height: 24px; font-weight: 400">{{ item.numOfBathroom }}</a>
                </div>
                <div>
                  <base-icon icon="crop" size="24" style="margin-right: 10px" />
                  <a style="font-size: 16px; line-height: 24px; font-weight: 400">{{ item.numOfSquare | convertAmountDecimal('AREA') }} m2</a>
                </div>
              </div>
              <div class="money text-1xl" style="padding-top: 16px">
                <span class="text-1xl text-bg" style="font-weight: 600">{{ item.tokenAmount | convertAmountDecimal('USD') }} LYNK </span>
                <a class="text-base1"> ~${{ item.price | convertAmountDecimal('USD') }}</a>
              </div>
            </div>
            <!-- {{ scope.row.availableBalanceUSD | convertAmountDecimal('USD') }} -->
          </div>

          <!-- <div class="image1">
            <div class="img" style="positon: absolute">
              <img src="https://s3.cloud.cmctelecom.vn/bework-production/blockchain/AVATAR/AVATAR_unsplash_JCMQo028t3Q_533122371_1641287137359.png" alt="" />
              <div class="on-sale">ĐANG MỞ BÁN</div>
              <div class="icon-heart"><base-icon icon="heart" size="32" /></div>
            </div>
            <div class="product-content">
              <div class="image-content text-0xl">Sky Lux Beach Villa</div>
              <div class="text-base1" style="padding-top: 8px">Khu biệt thự The Sky, The Star Capital Tower</div>
              <div class="icon-product" style="padding-top: 16px">
                <div class="sack-icon">
                  <base-icon icon="icon-bed" size="24" />
                  <a style="font-size: 16px; line-height: 24px; font-weight: 400">10</a>
                </div>
                <div class="sack-icon">
                  <base-icon icon="icon-park-outline_shower-head" size="24" />
                  <a style="font-size: 16px; line-height: 24px; font-weight: 400">10</a>
                </div>
                <div>
                  <base-icon icon="crop" size="24" />
                  <a style="font-size: 16px; line-height: 24px; font-weight: 400">47.7 m2</a>
                </div>
              </div>
              <div class="money text-1xl" style="padding-top: 16px">
                <span class="text-1xl" style="font-weight: 600">120,000 LYNK</span> <a class="text-base1" style="font-weight: 500">~$ 120,000</a>
              </div>
            </div>
          </div> -->
        </div>
        <!-- 
        <div style="display: flex; justify-content: center; margin-bottom: 40px">
          <el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination>
        </div> -->
        <div style="display: flex; justify-content: center; margin-bottom: 40px">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="param.page"
            :page-sizes="param.size"
            :page-size="param.limit"
            :total="param.total"
            :pager-count="5"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
        <footer-market />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import FooterMarket from '@/modules/marketplace/home/components/FooterProduct.vue'
  import getRepository from '@/services'
  import { forEach, trim, debounce } from 'lodash'
  import MarketRepository from '@/services/repositories/marketplace'
  import EventBus from '@/utils/eventBus'

  const apiMarket: MarketRepository = getRepository('market')
  const api: MarketRepository = getRepository('market')
  @Component({ components: { FooterMarket } })
  export default class ProjectList extends Vue {
    form: Record<string, any> = {
      projectIds: '',
      productType: '',
      fromPriceUsd: '',
      toPriceUsd: '',
      status: '',
      search: '',
      page: 1,
      area: '',
      limit: 12,
      orderBy: 0,
      price: '',
      total: null
    }
    sortLabel = 'Default'
    projectIds = ''
    productType = ''
    fromPriceUsd = ''
    toPriceUsd = ''
    status = ''
    search = ''
    page = 1
    limit = 12
    orderBy = 0
    area = ''
    total = null
    param1: Record<string, any> = {
      page: 1,
      limit: 12
    }

    price = ''
    totalPage = 0
    language = ''
    items = [{ type: '', label: 'Tag 1' }]
    listProduct: any = []
    param: Record<string, any> = {
      search: null,
      projectType: null,
      nationalityCode: null,
      stateCode: null,
      cityCode: null,
      projectStatus: null,
      page: 1,
      limit: 12,
      sortBy: 1,
      total: null
      // size: 10
    }
    sortActive = ''
    sortActive2 = ''
    sortActive3 = ''
    sortActive4 = 0
    listProject: any = []
    // @Watch('form.search') handleSearch(value: string): void {
    //   this.searchText(value)
    // }
    handleSearch(): void {
      // this.form.search = this.search
      this.getProductList()
    }
    searchText = debounce((value: string) => {
      this.form.search = value
      console.log('text', this.form.search)
      this.getProductList()
    }, 500)
    handleChangeProject(value: string | number): void {
      console.log('value', value)
      this.form.page = 1
      if (value) {
        this.form.projectIds = value
        this.getProductList()
      } else {
        this.form.projectIds = null
        this.getProductList()
      }
    }
    handleChangeProductType(value: string | number): void {
      this.form.page = 1
      console.log('value', value)
      if (value) {
        this.form.productType = value
        this.getProductList()
      } else {
        this.form.productType = null
        this.getProductList()
      }
    }
    handleChangeStatus(value: string | number): void {
      this.form.page = 1
      console.log('Status', value)
      if (value) {
        this.form.productStatus = value
        this.getProductList()
      } else {
        this.form.productStatus = null
        this.getProductList()
      }
    }
    handleChangePrice(value: string | number): void {
      this.form.page = 1
      console.log('value', value)
      if (value == 'price_range.below_50k') {
        this.form.fromPriceUsd = 0
        this.form.toPriceUsd = 50000
      } else if (value == 'price_range.50k_to_500k') {
        this.form.fromPriceUsd = 50000
        this.form.toPriceUsd = 500000
      } else if (value == 'price_range.500k_to_1m') {
        this.form.fromPriceUsd = 500000
        this.form.toPriceUsd = 1000000
      } else if (value == 'price_range.1m_to_3m') {
        this.form.fromPriceUsd = 1000000
        this.form.toPriceUsd = 3000000
      } else if (value == 'price_range.3m_to_5m') {
        this.form.fromPriceUsd = 3000000
        this.form.toPriceUsd = 5000000
      } else if (value == 'price_range.5m_to_8m') {
        this.form.fromPriceUsd = 5000000
        this.form.toPriceUsd = 8000000
      } else if (value == 'price_range.8m_to_10m') {
        this.form.fromPriceUsd = 8000000
        this.form.toPriceUsd = 10000000
      } else if (value == 'price_range.above_10m') {
        this.form.fromPriceUsd = 10000000
        this.form.toPriceUsd = null
      } else {
        this.form.fromPriceUsd = null
        this.form.toPriceUsd = null
      }
      this.getProductList()
    }
    handleChangeArea(value: string | number): void {
      this.form.page = 1
      if (value == 'area_range.below_30') {
        this.form.fromArea = null
        this.form.toArea = 30
      } else if (value == 'area_range.below_30_to_50') {
        this.form.fromArea = 30
        this.form.toArea = 50
      } else if (value == 'area_range.50_to_80') {
        this.form.fromArea = 50
        this.form.toArea = 80
      } else if (value == 'area_range.80_to_100') {
        this.form.fromArea = 80
        this.form.toArea = 100
      } else if (value == 'area_range.100_to_150') {
        this.form.fromArea = 100
        this.form.toArea = 150
      } else if (value == 'area_range.150_to_300') {
        this.form.fromArea = 150
        this.form.toArea = 300
      } else if (value == 'area_range.300_to_500') {
        this.form.fromArea = 300
        this.form.toArea = 500
      } else if (value == 'area_range.above_500') {
        this.form.fromArea = 500
        this.form.toArea = null
      } else {
        this.form.fromArea = null
        this.form.toArea = null
      }
      this.getProductList()
    }

    async created(): Promise<void> {
      // EventBus.$on('searchPrice', this.getProductList)
      this.form = Object.assign(this.form, this.$route.query)
      this.init()
      this.getProductList()
    }
    // handleOpen(value: any): void {
    //   console.log('search', value)
    //   this.getProductList()
    // }
    async loadMoreProject(): Promise<void> {
      try {
        if (this.form.page === this.totalPage) {
          return
        }
        this.form.page += 1
        const result = await apiMarket.getDataProjectList(this.form)
        this.listProject = [...this.listProject, ...result.content]
      } catch (error) {
        console.log(error)
      }
    }
    handleDetail(id: string | number): void {
      console.log('id', id)
      EventBus.$emit('detailProject', id)
      this.$router.push({ name: 'DetailProject', params: { type: 'product', id: id.toString() } })
    }
    destroyed(): void {
      EventBus.$off('detailProject')
    }
    // page = {
    //   page: 1,
    //   limit: 10
    // }
    startElement = 1
    endElement = 0
    totalElement = 0
    async getProductList(): Promise<any> {
      // delete this.form.price
      // delete this.form.area
      const result = await api.getProductList({ ...this.form })
      if (result) {
        this.listProduct = result.content
        if (result.numberOfElements) {
          this.startElement = 1
        } else {
          this.startElement = 0
        }
        this.endElement = result.numberOfElements
        this.totalElement = result.totalElements
        this.param.total = result.totalElements
      }
    }
    properTypeList: Record<string, any> = []
    listType: any = []
    listPrice: any = []
    priceList: Record<string, any> = []
    listStatus: Record<string, any> = []
    projectList: Record<string, any> = []
    areaList: Record<string, any> = []
    sortsByLatest: Array<Record<string, any>> = [
      {
        command: 0,
        // label: 'Default',
        label: this.$i18n.t('market-detail.sort.default'),
        divided: false,
        i18n: ''
      },
      {
        command: 1,
        label: this.$i18n.t('market-detail.sort.createat'),
        divided: false,
        i18n: ''
      },
      {
        command: 2,
        label: this.$i18n.t('market-detail.sort.price'),
        divided: false,
        i18n: ''
      },
      {
        command: 4,
        label: this.$i18n.t('market-detail.sort.size'),
        divided: false,
        i18n: ''
      }
      // {
      //   command: 3,
      //   label: 'Favourite',
      //   divided: false,
      //   i18n: ''
      // }
    ]
    async init(): Promise<void> {
      try {
        const result = await apiMarket.getDataProjectList(this.param1)
        this.listType = await apiMarket.getSystemparam({ type: 'PROPERTY_TYPE' })
        this.listPrice = await apiMarket.getSystemparam({ type: 'PRICE_RANGE' })
        this.listStatus = await apiMarket.getSystemparam({ type: 'PROPERTY_STATUS' })
        this.areaList = await apiMarket.getSystemparam({ type: 'AREA_RANGE' })
        this.listProject = result.content
        console.log('pro', this.listProject)

        // const list: any = []
        // for (let i = 0; i < this.listProject.length; i++) {
        //   console.log('i', this.listProject[i].projectName)
        //   if (this.listProject[i].projectName.length >= 11) {
        //     const a = this.listProject[i].projectName
        //     console.log('?', a)

        //     this.listProject[i].projectName = a.substring(0, 10) + '...'

        //     console.log('add', this.listProject[i].projectName)
        //   }
        // }
      } catch (error) {
        console.log(error)
      }
    }
    // async getDataFilter(): Promise<void> {
    //   const result = await api.getDataProjectList({ page: 1, limit: 10, orderBy: 0 })
    //   if (result) {
    //     this.projectList = result.content
    //   }
    //   //propetype
    //   const result1 = await api.getSystemparam({ type: 'PROPERTY_TYPE' })
    //   if (result1) {
    //     this.properTypeList = result1
    //     console.log('properTypeList', result1)
    //   }
    //   //price
    //   const result2 = await api.getSystemparam({ type: 'PRICE_RANGE' })
    //   if (result2) {
    //     this.priceList = result2
    //     console.log('price', this.priceList)
    //   }
    //   //status
    //   const result3 = await api.getSystemparam({ type: 'PROPERTY_STATUS' })
    //   if (result3) {
    //     this.statusList = result3
    //     console.log('status', this.statusList)
    //   }
    // }
    handleSort(command: string): void {
      console.log(command)
      this.sortActive = command
    }

    handleSort2(command: string): void {
      console.log(command)
      this.sortActive2 = command
    }

    handleSort3(command: string): void {
      console.log(command)
      this.sortActive3 = command
      this.param = {
        ...this.param,
        projectStatus: command
      }
    }

    handleSort4(command: string | number): void {
      this.sortActive4 = Number(command) as number
      console.log(command)
      if (command == 0) {
        this.sortLabel = 'Default'
      } else if (command == 1) {
        this.sortLabel = 'Lastest'
      } else if (command == 2) {
        this.sortLabel = 'Price'
      } else if (command == 3) {
        this.sortLabel = 'Favourite'
      } else if (command == 4) {
        this.sortLabel = 'Size'
      }
      this.form.orderBy = command
      this.getProductList()
    }

    handleClickCancel(e: any): void {
      e.preventDefault()
      this.sortActive = ''
    }

    handleClickCancel2(): void {
      this.sortActive2 = ''
    }

    handleClickCancel3(): void {
      this.sortActive3 = ''
      this.param = {
        ...this.param,
        projectStatus: null
      }
    }
    handleSizeChange(val: number): void {
      console.log('size change', val)
    }

    handleCurrentChange(val: number): void {
      console.log('currenchange', val)
      this.form.page = val
      this.getProductList()
    }
  }
</script>

<style scoped lang="scss">
  div#footer-market {
    margin-left: -40px;
  }
  .el-select {
    margin-top: 3.9px;
  }
  ::v-deep.dropdown-menu-product-list {
    .el-select-dropdown__item.hover {
      span {
        font-size: 16px;
        font-weight: 400;
        font-family: Open Sans;
        background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .el-select-dropdown__item.selected {
      span {
        font-size: 16px;
        font-weight: 400;
        font-family: Open Sans;
        background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .el-select-dropdown__item.selected::after {
      background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .dropdown-menu-product-list {
    width: 280px;
  }
  ::v-deep.el-select-dropdown .el-scrollbar .el-select-dropdown__list .el-select-dropdown__item.selected::after {
    /* position: absolute; */
    right: 16px;
    top: 0;
    font-family: element-icons;
    content: '\e6da';
    font-size: 16px;
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
    color: red;
    margin-left: 10px !important;
  }
  ::v-deep.el-select-dropdown .el-scrollbar .el-select-dropdown__list .el-select-dropdown__item.selected {
    color: red;
    font-weight: 400;
  }
  ::v-deep.chose-active {
    border: solid 1px transparent !important;
    background-image: linear-gradient(#ffffff, #ffffff), linear-gradient(to bottom right, #3626af, #824bc4, #b966d3);
    background-origin: border-box;
    background-clip: content-box, border-box;
    .el-input__inner {
      // padding: 0 6px;
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      font-family: Open Sans;
      background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
      -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
    }
  }

  ::v-deep .el-input--prefix .el-input__inner {
    padding-left: 44px;
    height: 48px;
  }
  ::v-deep .el-input__prefix {
    left: 15px;
    top: 12px !important;
    transition: all 0.3s;
  }
  .btn-market-search {
    padding: 12px 24px;
    border-radius: 6px;
    height: 48px;
    background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
  }
  .i4ewOd-pzNkMb-haAclf {
    background-color: #2e312f;
    display: none !important;
  }
  .text-value {
    color: linear-gradient(to right, #9d3ef2 100%, #3036f4 100%);
  }
  ::v-deep.el-input--prefix .el-input__inner {
    padding-left: 44px;
    height: 48px;
    font-size: 16px;
    line-height: 24px;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 30px;
    height: 46px;
    font-size: 16px;
    line-height: 24px;
  }
  .search {
    margin-top: 16px;
    margin-bottom: 24px;
    display: flex;
    margin-right: 32px;
    &__input {
      flex: 1;
    }
    &__input {
      flex-shrink: 0;
    }
  }
  .filter-project {
    margin-bottom: 16px;
    margin-top: 16px;
    margin-right: 32px;
    .nav-filter {
      margin-bottom: 24px;
      display: grid;
      margin-bottom: 24px;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;
      grid-column-gap: 16px;

      .location {
        position: relative;
        border: 1px solid #ccc;
        border-radius: 8px;
        overflow: hidden;
        height: 48px;

        .icon-cancel {
          position: absolute;
          top: 0;
          left: 0;
        }
      }

      .name-project {
      }

      .setting {
        padding: 12px 16px;
        border: 1px solid #dbdbdb;
        border-radius: 8px;
        position: relative;

        .notification {
          background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
          border-radius: 50%;
          font-family: Open Sans;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 24px;
          color: #ffffff;
          position: absolute;
          top: -10px;
          right: -10px;
          width: 24px;
          height: 24px;
          text-align: center;
        }
      }
    }

    .information-filter {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .dot-filter {
        width: 4px;
        height: 4px;
        background: #c4c4c4;
        border-radius: 50%;
        margin: 0 16px;
      }

      .sort-by {
        .text-sort-by {
          font-size: 16px;
          font-weight: 600;
          line-height: 24px;
          font-family: Open Sans;
          background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .info {
        color: #5b616e;
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;

        b {
          color: #0e0b23;
        }
      }
    }
  }

  .product-content {
    padding: 24px;
    border: 1px solid #eeeeee75;
    margin-top: -5px;
    border-radius: 0 0 11px 11px;
    filter: drop-shadow(0px 1.2px 3.6px rgba(0, 0, 0, 0.1)) drop-shadow(0px 6.4px 14.4px rgba(0, 0, 0, 0.13));
  }
  .image-product {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 840px;
    flex-wrap: wrap;
    margin-top: 56px;
    min-height: 500px;
  }
  .image1 .img {
    position: relative;
  }
  img {
    max-width: 100%;
    object-fit: cover;
  }
  .icon-heart {
    position: absolute;
    top: 10px;
    right: 16px;
  }
  .on-sale {
    padding: 8px 16px;
    background-color: #0e0b23;
    position: absolute;
    top: 16px;
    left: 16px;
    color: #ffffff;
    text-align: center;
    text-transform: uppercase;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    opacity: 0.8;
  }
  .sack-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 6px;
    position: relative;
    padding-right: 8px;
    opacity: 0.7;
  }
  .sack-icon::before {
    content: '';
    position: absolute;
    top: 12px;
    right: 0;
    background: #0e0b23;
    height: 40%;
    width: 2px;
  }
  .icon-product {
    display: flex;
    align-items: center;
  }
  .text-onsale {
    position: absolute;
    top: 16px;
    left: 16px;
    color: #ffffff;
    text-align: center;
    text-transform: uppercase;
  }
  // .image-content {
  //   padding-top: 24px;
  // }
  .image1 {
    margin-right: 24px;
    // border: 1px solid #2e312f;
    margin-bottom: 24px;
    border-radius: 12px;
    overflow: hidden;
  }
  .wrap-detail {
    padding-top: 80px;
    .product {
      display: flex;
    }
    .content {
      overflow-y: scroll;
      overflow-x: hidden;
      height: calc(100vh);
      padding-left: 40px;
      .product-filter {
        height: 136px;
        max-width: 800px;
      }
    }
    .map {
      width: 58.3%;
      .mapouter {
        position: relative;
        text-align: right;
        width: 100%;
        height: 100vh;
      }
      .gmap_canvas {
        overflow: hidden;
        background: none !important;
        width: 100%;
        height: 100vh;
      }
      .gmap_iframe {
        height: 93vh !important;
      }

      .place-card.place-card-large {
        display: none !important;
      }
    }
  }
</style>
