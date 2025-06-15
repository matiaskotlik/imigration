import { useQuery } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { SafeAreaView, View } from 'react-native';
import tw from 'twrnc';

import { Survey } from '@/components/survey';
import { SurveyProvider } from '@/components/survey/context';
import { SurveyLoader } from '@/components/survey/load';
import { useSurveyTitle } from '@/components/survey/title';
import { generateDocument } from '@/queries/document';
import { surveyQueryOptions } from '@/queries/survey';

const I589_SURVEY_ID = '68368fc5ab924061e1c0ad64';
const I589_DOCUMENT_ID = 'TODO';

export default function SurveyScreen() {
  const { data: survey, status } = useQuery(surveyQueryOptions(I589_SURVEY_ID));
  const router = useRouter();

  const handleComplete = useCallback(
    async (data: unknown) => {
      await generateDocument(I589_DOCUMENT_ID, data);
      router.dismissTo('./welcome');
      router.push('./complete');
      return true;
    },
    [router]
  );

  const title = useSurveyTitle();

  return (
    <>
      <Stack.Screen options={{ title }} />
      <View style={tw`flex-1`}>
        <SafeAreaView />
        <SurveyProvider>
          <SurveyLoader>
            {status === 'success' && (
              <>
                <Survey onComplete={handleComplete} survey={survey} />
              </>
            )}
          </SurveyLoader>
        </SurveyProvider>
      </View>
    </>
  );
}
