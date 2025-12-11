'use client';

import { translations, TranslationKey } from './i18n';
import { useAppContext } from '../components/Providers';

export const useTranslations = () => {
  const { language } = useAppContext();
  return (key: TranslationKey) => translations[language][key] || key;
};
