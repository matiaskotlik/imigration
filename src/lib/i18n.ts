import { getLocales } from 'expo-localization';
import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '@/assets/locale';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: async () => {
    const lng = await AsyncStorage.getItem('language');
    return lng || getLocales()[0].languageCode || undefined;
  },
  cacheUserLanguage: async (lng: string) => {
    await AsyncStorage.setItem('language', lng);
  },
};

export default i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });
