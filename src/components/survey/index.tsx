import 'survey-core/survey-core.css';
import { memo, useLayoutEffect } from 'react';
import DOMSurvey from '@/components/survey/dom';
import { useSurveyTheme } from '@/components/survey/theme';
import { useSetLoading } from '@/components/survey/context';
import { useTranslation } from 'react-i18next';
import { useSetSurveyTitle } from '@/components/survey/title';
import { storage } from '@/lib/mmkv';
import { type Survey as SurveyType } from '@/lib/schema/survey';

export const Survey = memo(function Survey({
  survey,
  onComplete,
}: {
  survey: SurveyType;
  onComplete: (data: unknown) => Promise<boolean>;
}) {
  const setLoading = useSetLoading();
  useLayoutEffect(() => setLoading(true));

  const { t } = useTranslation();

  const theme = useSurveyTheme();

  useSetSurveyTitle(survey.json.title);

  return (
    <DOMSurvey
      survey={survey}
      theme={theme}
      onSave={async (data) => {
        storage.set(`surveyData:${survey.id}`, JSON.stringify(data));
      }}
      onRestore={async () => {
        const data = storage.getString(`surveyData:${survey.id}`);
        return data ? JSON.parse(data) : undefined;
      }}
      onRender={async () => {
        setTimeout(() => setLoading(false), 100);
      }}
      onComplete={async (data) => {
        const success = await onComplete(data);
        if (success) {
          storage.delete(`surveyData:${survey.id}`);
        }
      }}
      progressText={t('survey.progressText')}
    />
  );
});
