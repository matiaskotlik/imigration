import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import tw from 'twrnc';

import { useIsLoading } from '@/components/survey/context';

export function SurveyLoader({ children }: PropsWithChildren) {
  const isLoading = useIsLoading();

  return (
    <View style={tw`relative flex-1`}>
      <View
        style={tw.style('absolute inset-0', { opacity: isLoading ? 0 : 1 })}
      >
        {children}
      </View>
      <View
        style={tw.style('absolute inset-0 items-center justify-center', {
          opacity: isLoading ? 1 : 0,
        })}
      >
        <ActivityIndicator size='large' />
      </View>
    </View>
  );
}
