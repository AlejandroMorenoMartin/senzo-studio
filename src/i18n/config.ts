import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// EN
import enCommon from '../locales/en/common.json';
import enHero from '../locales/en/hero.json';
import enWork from '../locales/en/work.json';
import enServices from '../locales/en/services.json';
import enAbout from '../locales/en/about.json';
import enFaq from '../locales/en/faq.json';
import enContact from '../locales/en/contact.json';

// ES
import esCommon from '../locales/es/common.json';
import esHero from '../locales/es/hero.json';
import esWork from '../locales/es/work.json';
import esServices from '../locales/es/services.json';
import esAbout from '../locales/es/about.json';
import esFaq from '../locales/es/faq.json';
import esContact from '../locales/es/contact.json';

// ZH
import zhCommon from '../locales/zh/common.json';
import zhHero from '../locales/zh/hero.json';
import zhWork from '../locales/zh/work.json';
import zhServices from '../locales/zh/services.json';
import zhAbout from '../locales/zh/about.json';
import zhFaq from '../locales/zh/faq.json';
import zhContact from '../locales/zh/contact.json';

// RU
import ruCommon from '../locales/ru/common.json';
import ruHero from '../locales/ru/hero.json';
import ruWork from '../locales/ru/work.json';
import ruServices from '../locales/ru/services.json';
import ruAbout from '../locales/ru/about.json';
import ruFaq from '../locales/ru/faq.json';
import ruContact from '../locales/ru/contact.json';

// Define supported languages
const SUPPORTED_LANGUAGES = ['en', 'es', 'zh', 'ru'] as const;
type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

// Helper to get stored language or default to 'en'
const getStoredLanguage = (): LanguageCode => {
  try {
    const stored = localStorage.getItem('i18n_lang');
    if (stored && SUPPORTED_LANGUAGES.includes(stored as LanguageCode)) {
      return stored as LanguageCode;
    }
  } catch {
    // localStorage may not be available in some environments
  }
  return 'en';
};

// Initialize i18next as a singleton
void i18next
  .use(initReactI18next)
  .init({
    lng: getStoredLanguage(),
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'hero', 'work', 'services', 'about', 'faq', 'contact'],
    resources: {
      en: {
        common: enCommon,
        hero: enHero,
        work: enWork,
        services: enServices,
        about: enAbout,
        faq: enFaq,
        contact: enContact,
      },
      es: {
        common: esCommon,
        hero: esHero,
        work: esWork,
        services: esServices,
        about: esAbout,
        faq: esFaq,
        contact: esContact,
      },
      zh: {
        common: zhCommon,
        hero: zhHero,
        work: zhWork,
        services: zhServices,
        about: zhAbout,
        faq: zhFaq,
        contact: zhContact,
      },
      ru: {
        common: ruCommon,
        hero: ruHero,
        work: ruWork,
        services: ruServices,
        about: ruAbout,
        faq: ruFaq,
        contact: ruContact,
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;
