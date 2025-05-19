import { Stack } from 'expo-router';
import { Survey } from '@/components/survey';
import surveyJson from '@/assets/survey.json';

export default function SurveyScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Survey' }} />
      <Survey
        survey={surveyJson}
        onFinish={console.log('finished')}
      />
    </>
  );
}
