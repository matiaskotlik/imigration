import { queryOptions } from '@tanstack/react-query';
import { SurveySchema } from '@/lib/schema/survey';
import { isDevelopmentBuild } from 'expo-dev-client';
import { raiseStatus } from '@/lib/utils';

export const surveyQueryOptions = (surveyId: string) =>
  queryOptions({
    queryFn: async () =>
      fetch(`https://imigration.kiltok.com/api/survey/${surveyId}`)
        .then(raiseStatus)
        .then((r) => r.json())
        .then((data) => SurveySchema.parse(data)),
    queryKey: ['survey', surveyId],
    refetchInterval: isDevelopmentBuild() ? 1000 : false,
    staleTime: Infinity,
    throwOnError: true,
  });
