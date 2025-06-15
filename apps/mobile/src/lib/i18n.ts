import { getLocales } from 'expo-localization';
// eslint-disable-next-line import-x/no-named-as-default
import i18n, { LanguageDetectorModule } from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from '@/assets/locale';
import { storage } from '@/lib/mmkv';

const languageDetector: LanguageDetectorModule = {
  cacheUserLanguage: (lng: string) => {
    storage.set('language', lng);
  },
  detect: () => {
    const cachedLanguage = storage.getString('language');
    const deviceLanguage = getLocales()[0]?.languageCode;
    return cachedLanguage ?? deviceLanguage ?? undefined;
  },
  type: 'languageDetector',
};

export default i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    resources,
  });
