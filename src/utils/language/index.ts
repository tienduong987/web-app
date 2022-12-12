import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementViLocale from 'element-ui/lib/locale/lang/vi' // element-ui lang
import enLocale from './json/en.json'
import viLocale from './json/vi.json'
Vue.use(VueI18n)

// function loadLocaleMessages(): Record<string, any> {
//   const locales = require.context('./json', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//   const messages: Record<string, any> = {}
//   locales.keys().forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key)
//     }
//   })
//   return messages
// }
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  vi: {
    ...viLocale,
    ...elementViLocale
  }
}

export default new VueI18n({
  locale: localStorage.getItem('bc-lang')!,
  fallbackLocale: localStorage.getItem('bc-lang')!,
  messages
})
