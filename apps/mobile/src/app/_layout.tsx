import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { PaperProvider, useTheme } from 'react-native-paper';
import { ReducedMotionConfig, ReduceMotion } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import tw, { useDeviceContext } from 'twrnc';

import '@/polyfill';
import { SplashScreenBarrier } from '@/components/splash-screen-barrier';
import { theme } from '@/lib/paper-theme';
import { LanguageProvider } from '@/providers/language';
import { QueryProvider } from '@/providers/query';
import { TRPCProvider } from '@/providers/trpc';

void SystemUI.setBackgroundColorAsync(theme.colors?.background ?? null);

export default function RootLayout() {
  useDeviceContext(tw);

  return (
    <PaperProvider theme={theme}>
      <ReducedMotionConfig mode={ReduceMotion.Never} />
      <QueryProvider>
        <TRPCProvider>
          <LanguageProvider>
            <SplashScreenBarrier>
              <StackWrapper />
            </SplashScreenBarrier>
            <Toast />
          </LanguageProvider>
        </TRPCProvider>
      </QueryProvider>
    </PaperProvider>
  );
}

/**
 * Wrap the Stack component so that we can use PaperProvider
 */
function StackWrapper() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        title: '',
      }}
    />
  );
}
