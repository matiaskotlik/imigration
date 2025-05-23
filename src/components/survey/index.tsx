import 'survey-core/survey-core.css';
import { memo, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import DOMSurvey from '@/components/survey/dom';
import { useTheme } from 'react-native-paper';
import { buildSurveyTheme } from '@/components/survey/theme';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import tw from 'twrnc';
import { ITheme } from 'survey-core';

const DOMSurveyWrapper = memo(function DOMSurveyWrapper({
  theme,
  survey,
  onComplete,
}: {
  theme: ITheme,
  survey: any;
  onComplete: (data: any) => Promise<void>;
}) {
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
  onCompleteSection = async () => {},
  onFinish = async () => {},
}: {
  survey: any;
  onCompleteSection: (data: any) => Promise<void>;
  onFinish?: () => Promise<void>;
}) {
  const appTheme = useTheme();
  const theme = useMemo(() => buildSurveyTheme(appTheme), [appTheme]);

  // split survey into pages
  const pages = useMemo(() => survey.pages.map((page: any) => ({
    ...survey,
    pages: [page],
  })), [survey]);

  const [pageIdx, setPageIndex] = useState(0);

  const onComplete = useCallback(async (data: any) => {
    await onCompleteSection(data);

    if (pageIdx >= survey.pages.length - 1) {
      await onFinish();
      return
    }

    setPageIndex((prev) => prev + 1);
  }, [onCompleteSection, pageIdx, survey, onFinish]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <DOMSurveyWrapper
        theme={theme}
        survey={pages[pageIdx]}
        onComplete={onComplete}
      />
    </SafeAreaView>
  );
}
