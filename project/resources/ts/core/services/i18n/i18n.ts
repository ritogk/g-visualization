import { createI18n } from 'vue-i18n'
import ja from '@/core/services/i18n/lang/ja'
import en from '@/core/services/i18n/lang/en'

const messages = {
  en: {
    message: en,
  },
  ja: {
    message: ja,
  },
}
const i18n = createI18n({
  legacy: false,
  locale: 'ja',
  fallbackLocale: 'ja',
  messages,
})

export { i18n }
