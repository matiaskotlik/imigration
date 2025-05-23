import { Stack } from 'expo-router';
import { Survey } from '@/components/survey';
import surveyJson from '@/assets/survey.json';

export default function SurveyScreen() {
  // TODO screen title from survey section
  // TODO progress bar under the header
  // TODO show cancellation modal on back button
  // TODO show progress (step 2 of 5) in the header
  return (
    <>
      <Stack.Screen options={{
        title: '',
      }} />
      <Survey
        survey={surveyJson}
        onCompleteSection={async (data) => {
          console.log(data);
        }}
      />
    </>
  );
}
