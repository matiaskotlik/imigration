import 'survey-core/survey-core.css';
import { memo, PropsWithChildren, useLayoutEffect, useMemo } from 'react';
import DOMSurvey from '@/components/survey/dom';
import { type Survey as SurveyType, SurveyJson } from '@/lib/schema/survey';
import { ActivityIndicator, View } from 'react-native';
import tw from 'twrnc';
import { atom, Provider, useAtomValue, useSetAtom } from 'jotai';
import { useTheme } from 'react-native-paper';
import { buildSurveyTheme } from '@/components/survey/theme';
import { SurveyProps } from '@/components/survey/types';

const loadingAtom = atom(true);

const useSurveyTheme = () => {
  const appTheme = useTheme();
  return useMemo(() => buildSurveyTheme(appTheme), [appTheme]);
};

const DOMSurveyWrapper = memo(function DOMSurveyWrapper({
  json,
  ...props
}: SurveyProps & {
  json?: SurveyJson;
}) {
  const setLoading = useSetAtom(loadingAtom);
  useLayoutEffect(() => setLoading(true));

  const theme = useSurveyTheme();

  if (!json) return;

  return (
    <DOMSurvey
      json={json}
      theme={theme}
      onAfterRenderSurvey={async () => {
        setTimeout(() => setLoading(false), 100);
      }}
      {...props}
    />
  );
});

function SurveyLoader({ children }: PropsWithChildren) {
  const loading = useAtomValue(loadingAtom);
  return (
    <View style={tw`flex-1 relative`}>
      <View style={tw.style('flex-1', { opacity: loading ? 0 : 1 })}>{children}</View>
      <View
        style={tw.style('absolute inset-0 items-center justify-center', {
          opacity: loading ? 1 : 0,
        })}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
}

export function Survey({
  survey,
  onComplete,
}: {
  survey?: SurveyType;
  onComplete?: (data: any) => Promise<void>;
}) {
  console.log('render outer ');

  return (
    <Provider>
      <SurveyLoader>
        <DOMSurveyWrapper onComplete={onComplete} json={survey?.json} />
      </SurveyLoader>
    </Provider>
  );
}
