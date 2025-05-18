import { Stack } from 'expo-router';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import tw from 'twrnc';
import Survey from '@/components/survey';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { buildSurveyTheme } from '@/lib/survey-theme';
import surveyJson from '@/assets/survey.json';

export default function SurveyScreen() {
  const theme = useTheme();
  const surveyTheme = useMemo(() => buildSurveyTheme(theme), [theme]);
  const [loaded, setLoaded] = useState(false);
  const surveyRef = useRef<View>(null);
  const loadingRef = useRef<View>(null);

  useLayoutEffect(() => {
    surveyRef.current?.setNativeProps({ opacity: 0 });
    loadingRef.current?.setNativeProps({ opacity: 1 });

    if (!loaded) return;

    const timeout = setTimeout(() => {
      surveyRef.current?.setNativeProps({ opacity: 1 });
      loadingRef.current?.setNativeProps({ opacity: 0 });
    }, 100);

    return () => clearTimeout(timeout);
  }, [loaded]);

  const handleAfterRenderSurvey = useCallback(async () => {
    setLoaded(true);
  }, [setLoaded]);

  const handleBeforeRenderSurvey = useCallback(async () => {
    setLoaded(false);
  }, [setLoaded]);

  return (
    <>
      <Stack.Screen options={{ title: 'Survey' }} />
      <SafeAreaView style={tw`flex-1 relative`}>
        <View ref={surveyRef} style={tw`flex-1`}>
          <Survey
            onBeforeRenderSurvey={handleBeforeRenderSurvey}
            onAfterRenderSurvey={handleAfterRenderSurvey}
            surveyTheme={surveyTheme}
            surveyJson={surveyJson}
          />
        </View>
        <View ref={loadingRef} style={tw`absolute inset-0 items-center justify-center`}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    </>
  );
}
