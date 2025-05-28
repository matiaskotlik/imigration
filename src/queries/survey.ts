import { queryOptions } from '@tanstack/react-query';
import { SurveySchema } from '@/lib/schema/survey';
import { isDevelopmentBuild } from 'expo-dev-client';

export const surveyQueryOptions = (surveyId: string) =>
  queryOptions({
    queryKey: ['survey', surveyId],
    staleTime: Infinity,
    queryFn: async () => {
      const response = await fetch(`https://imigration.kiltok.com/api/survey/${surveyId}`);
      const data = await response.json();
      return SurveySchema.parse(data);
    },
    refetchInterval: isDevelopmentBuild() ? 1000 : false,
    throwOnError: true,
  });
