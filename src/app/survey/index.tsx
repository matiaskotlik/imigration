import { Stack, useRouter } from 'expo-router';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import tw from 'twrnc';
import Survey, { SurveyProps } from '@/components/survey';
import { useState } from 'react';
import surveyTheme from '@/lib/survey-theme';
import surveyJson from '@/assets/survey';

export default function SurveyScreen() {
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Stack.Screen options={{ title: 'Survey' }} />
      <SafeAreaView
        style={tw.style('min-h-screen gap-6', {
          backgroundColor: theme.colors.background,
        })}>
        <View style={tw`relative flex-1`}>
          <View style={tw.style('absolute inset-0', !loaded && 'opacity-0')}>
            <Survey
              onAfterRenderSurvey={async () => setLoaded(true)}
              theme={surveyTheme(theme)}
              surveyJson={surveyJson}
            />
          </View>
          <View style={tw.style('absolute inset-0 items-center justify-center', loaded && 'opacity-0')}>
            <ActivityIndicator size="large" />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
