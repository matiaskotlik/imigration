import 'survey-core/survey-core.css';
import { memo, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import DOMSurvey from '@/components/survey/dom';
import { useTheme } from 'react-native-paper';
import { buildSurveyTheme } from '@/components/survey/theme';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import tw from 'twrnc';

const DOMSurveyWrapper = memo(function DOMSurveyWrapper({
  survey,
  onComplete,
}: {
  survey: any;
  onComplete: () => Promise<void>;
}) {
  const appTheme = useTheme();
  const theme = useMemo(() => buildSurveyTheme(appTheme), [appTheme]);

  const surveyRef = useRef<View>(null);
  const loadingRef = useRef<View>(null);

  useLayoutEffect(() => {
    surveyRef.current?.setNativeProps({ opacity: 0 });
    loadingRef.current?.setNativeProps({ opacity: 1 });
  });

  return (
    <View style={tw`flex-1 relative`}>
      <View ref={surveyRef} style={tw`flex-1`}>
        <DOMSurvey
          survey={survey}
          theme={theme}
          onAfterRenderSurvey={async () => {
            // update opacity after render without re-rendering
            setTimeout(() => {
              surveyRef.current?.setNativeProps({ opacity: 1 });
              loadingRef.current?.setNativeProps({ opacity: 0 });
            }, 100);
          }}
          onComplete={onComplete}
        />
      </View>
      <View ref={loadingRef} style={tw`absolute inset-0 items-center justify-center`}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
});

export function Survey({
  survey,
  onFinish = async () => {},
}: {
  survey: any;
  onFinish?: () => Promise<void>;
}) {
  const [pageIdx, setPageIndex] = useState(0);
  const currentPage = useMemo(() => ({
    ...survey,
    pages: survey.pages[pageIdx],
  }), [survey, pageIdx]);

  const onComplete = useCallback(async () => {
    if (pageIdx >= survey.pages.length - 1) {
      await onFinish();
      return
    }

    setPageIndex((prev) => prev + 1);
  }, [pageIdx, survey, onFinish]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <DOMSurveyWrapper survey={currentPage} onComplete={onComplete} />
    </SafeAreaView>
  );
}
