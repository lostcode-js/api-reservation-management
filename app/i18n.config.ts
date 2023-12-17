import messages from './i18n'
import nuxtStorage from 'nuxt-storage';


export default defineI18nConfig(() => {
  const lang = nuxtStorage?.localStorage?.getData('jambu-bar-lang') || 'pt';

  return ({
    legacy: false,
    locale: lang,
    messages
  })}
)