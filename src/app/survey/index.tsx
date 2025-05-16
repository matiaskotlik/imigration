import { Stack, useRouter } from 'expo-router';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import tw from 'twrnc';
import Survey from '@/components/survey';
import { useLayoutEffect, useRef, useState } from 'react';
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
  const surveyRef = useRef<View>(null);
  const spinnerRef = useRef<View>(null);

  // avoid re render flash on survey load
  useLayoutEffect(() => {
    surveyRef?.current?.setNativeProps({ opacity: 0 })
    spinnerRef?.current?.setNativeProps({ opacity: 1 })

    const timeout = setTimeout(() => {
      surveyRef.current?.setNativeProps({ opacity: loaded ? 1 : 0 });
      spinnerRef.current?.setNativeProps({ opacity: loaded ? 0 : 1 });
    }, 100);

    return () => clearTimeout(timeout);
  });

  return (
    <>
      <Stack.Screen options={{ title: 'Survey' }} />
      <SafeAreaView style={tw`flex-1 relative`}>
        <View ref={surveyRef} style={tw`flex-1`}>
          <Survey
            onAfterRenderSurvey={async () => {
              setLoaded(true);
            }}
            theme={surveyTheme(theme)}
            surveyJson={surveyJson}
          />
        </View>
        <View ref={spinnerRef} style={tw`absolute inset-0 items-center justify-center`}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    </>
  );
}
