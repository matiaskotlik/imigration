import { SplashScreenBarrier } from '@/components/SplashScreenBarrier';
import { LanguageProvider } from '@/providers/language';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import tw, { useDeviceContext } from 'twrnc';
import * as SystemUI from 'expo-system-ui';
import { AppStack } from '@/components/ui/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { QueryProvider } from '@/providers/query';
import { ReducedMotionConfig, ReduceMotion } from 'react-native-reanimated';

const theme: ThemeProp = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    background: '#f5f5f5',
    primary: '#223A5F',
    onPrimary: '#ffffff',
    secondary: '#c29a3c'
  },
};

void SystemUI.setBackgroundColorAsync(theme.colors!.background!);

export default function RootLayout() {
  useDeviceContext(tw);

  return (
    <PaperProvider theme={theme}>
      <ReducedMotionConfig mode={ReduceMotion.Never} />
      <QueryProvider>
        <LanguageProvider>
          <SplashScreenBarrier>
            <AppStack />
          </SplashScreenBarrier>
        </LanguageProvider>
      </QueryProvider>
    </PaperProvider>
  );
}
