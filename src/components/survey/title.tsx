import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';

export const useSurveyTitle = () => useLocalSearchParams().surveyTitle?.toString() ?? '';

export const useSetSurveyTitle = (title: string) => {
  const router = useRouter();
  useEffect(() => {
    router.setParams({ surveyTitle: title });
  }, [router, title]);
};
