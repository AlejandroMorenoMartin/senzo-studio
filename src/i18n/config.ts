import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define supported languages
const SUPPORTED_LANGUAGES = ['en', 'es', 'zh', 'ru'] as const;
type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

// Define namespace names
const NAMESPACES = ['common', 'hero', 'work', 'services', 'about', 'faq', 'contact'] as const;
type NamespaceName = (typeof NAMESPACES)[number];

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

// Initialize resources object with empty namespaces for each language
const createResources = (): Record<LanguageCode, Record<NamespaceName, Record<string, unknown>>> => {
  const resources = {} as Record<LanguageCode, Record<NamespaceName, Record<string, unknown>>>;

  SUPPORTED_LANGUAGES.forEach((lang) => {
    resources[lang] = {} as Record<NamespaceName, Record<string, unknown>>;
    NAMESPACES.forEach((ns) => {
      resources[lang][ns] = {};
    });
  });

  return resources;
};

// Initialize i18next as a singleton
void i18next
  .use(initReactI18next)
  .init({
    lng: getStoredLanguage(),
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: NAMESPACES as unknown as string[],
    resources: createResources(),
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;
