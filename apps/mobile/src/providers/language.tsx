import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import '@/i18n';

export function LanguageProvider({ children }: PropsWithChildren) {
  // suspend until translations ready
  useTranslation();
  return children;
}
