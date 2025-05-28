import 'survey-core/survey-core.css';
import { memo, useEffect, useLayoutEffect } from 'react';
import DOMSurvey from '@/components/survey/dom';
import { useSurveyTheme } from '@/components/survey/theme';
import { SurveyProps } from '@/components/survey/types';
import { useSetLoading } from '@/components/survey/context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export const Survey = memo(function Survey({ survey, ...props }: SurveyProps) {
  const setLoading = useSetLoading();
  useLayoutEffect(() => setLoading(true));

  const { t } = useTranslation();

  const theme = useSurveyTheme();

  // set route param from survey title
  const router = useRouter();
  useEffect(() => {
    router.setParams({ surveyTitle: survey.json.title })
  }, [router, survey.json.title]);

  return (
    <DOMSurvey
      survey={survey}
      theme={theme}
      onRender={async () => {
        setTimeout(() => setLoading(false), 100);
      }}
      progressText={t('survey.progressText')}
      {...props}
    />
  );
});
