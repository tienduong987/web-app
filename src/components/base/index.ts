import Vue from 'vue'
import { VueConstructor } from 'vue'
import BaseIcon from './icon/BaseIcon.vue'
import BasePopup from './popup/BasePopup.vue'
import BaseTable from './table/BaseTable.vue'
import BaseTreeTable from './table/BaseTreeTable.vue'
import BasePagination from './pagination/BasePagination.vue'
const components: Record<string, VueConstructor<Vue>> = {
  BaseIcon,
  BaseTable,
  BaseTreeTable,
  BasePagination,
  BasePopup
}

export default components
