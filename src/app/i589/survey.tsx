import { Stack, useLocalSearchParams } from 'expo-router';
import { Survey } from '@/components/survey';
import { SafeAreaView, View } from 'react-native';
import tw from 'twrnc';
import { useQuery } from '@tanstack/react-query';
import { SurveyLoader } from '@/components/survey/load';
import { useCallback } from 'react';
import { surveyQueryOptions } from '@/queries/survey';
import { SurveyProvider } from '@/components/survey/context';

const I589_SURVEY_ID = '68368fc5ab924061e1c0ad64';

export default function SurveyScreen() {
  const { data: survey, status } = useQuery(surveyQueryOptions(I589_SURVEY_ID));
  const params = useLocalSearchParams();

  const handleComplete = useCallback(async (data: unknown) => {
    console.log(data);
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: params.surveyTitle as string,
        }}
      />
      <View style={tw`flex-1`}>
        <SafeAreaView />
        <SurveyProvider>
          <SurveyLoader>
            {status === 'success' && (
              <>
                <Survey survey={survey} onComplete={handleComplete} />
              </>
            )}
          </SurveyLoader>
        </SurveyProvider>
      </View>
    </>
  );
}
