import { createI18n } from "vue-i18n";
import en from './en';
import fi from './fi';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fi,
  },
});

export default i18n;
