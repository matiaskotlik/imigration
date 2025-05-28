import { ActivityIndicator, View } from 'react-native';
import tw from 'twrnc';
import { ComponentProps, PropsWithChildren } from 'react';
import DOMSurvey from '@/components/survey/dom';

export function SurveyWrapper({ children }: ComponentProps<typeof DOMSurvey>) {
  <MemoDOMSurvey
    survey={survey}
    theme={theme}
    onComplete={handleComplete}
    onReactRender={handleReactRender}
    onContentRender={handleContentRender}
  />;
  return (
    <View style={tw`flex-1 relative`}>
      <View ref={contentRef} style={tw`flex-1`}>
        {children}
      </View>
      <View ref={loadingRef} style={tw`absolute inset-0 items-center justify-center`}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
}
