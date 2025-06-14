import 'survey-core/survey-core.css';
import { memo, useLayoutEffect } from 'react';
import DOMSurvey from '@/components/survey/dom';
import { useSurveyTheme } from '@/components/survey/theme';
import { useSetLoading } from '@/components/survey/context';
import { useTranslation } from 'react-i18next';
import { useSetSurveyTitle } from '@/components/survey/title';
import { type Survey as SurveyType } from '@/lib/schema/survey';
import { useMutation } from '@tanstack/react-query';
import { sleep } from '@/lib/utils';
import { SurveyDataSchema } from '@/components/survey/types';
import { useStoredObjectOnce } from '@/hooks/use-storage';
import { z } from 'zod/v4';

export const Survey = memo(function Survey({
  onComplete,
  survey,
}: {
  onComplete: (data: unknown) => Promise<boolean>;
  survey: SurveyType;
}) {
  // if we didn't use the *Once variation of the hook here, we would re-render
  // the survey each time we save the data
  const [surveyData, setSurveyData, deleteSurveyData] = useStoredObjectOnce(
    `surveyData:${survey.id}`,
    SurveyDataSchema
  );

  const { t } = useTranslation();
  const theme = useSurveyTheme();
  useSetSurveyTitle(survey.json.title);

  const setLoading = useSetLoading();
  const { mutateAsync: handleComplete } = useMutation({
    mutationFn: onComplete,
    onError: (error) => {
      console.error('Error completing survey:', error);
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onSuccess: (completed) => {
      if (completed) {
        deleteSurveyData();
      }
    },
  });

  const handleSave = async (data: z.input<typeof SurveyDataSchema>) => {
    setSurveyData(data);
  };

  // Start loading UI on each re-render so the DOMSurvey can start loading
  useLayoutEffect(() => {
    setLoading(true);
  });

  // When it's done, we will set loading to false.
  const handleRender = async () => {
    await sleep(100); // Allow the DOMSurvey to resize itself
    setLoading(true);
  };

  return (
    <DOMSurvey
      onComplete={handleComplete}
      onRender={handleRender}
      onSave={handleSave}
      progressText={t('survey.progressText')}
      survey={survey}
      surveyData={surveyData}
      theme={theme}
    />
  );
});
