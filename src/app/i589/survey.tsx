import { Stack } from 'expo-router';
import { Survey } from '@/components/survey';
import { SafeAreaView, View } from 'react-native';
import tw from 'twrnc';
import { useQuery } from '@tanstack/react-query';
import { I589_SURVEY_ID } from '@/lib/constants';
import { SurveySchema } from '@/lib/schema/survey';

export default function SurveyScreen() {
  const { data: survey, status } = useQuery({
    queryKey: ['survey', I589_SURVEY_ID],
    queryFn: async () => {
      const response = await fetch(`https://imigration.kiltok.com/api/survey/${I589_SURVEY_ID}`);
      const data = response.json();
      return SurveySchema.parse(data);
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
        }}
      />
      <View style={tw`flex-1`}>
        <SafeAreaView />
        <Survey
          survey={survey}
          onComplete={async (data) => {
            console.log(data);
          }}
        />
      </View>
    </>
  );
}
