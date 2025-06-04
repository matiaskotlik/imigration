import { SplashScreenBarrier } from '@/components/SplashScreenBarrier';
import { LanguageProvider } from '@/providers/language';
import { PaperProvider } from 'react-native-paper';
import tw, { useDeviceContext } from 'twrnc';
import * as SystemUI from 'expo-system-ui';
import { AppStack } from '@/components/ui/stack';
import { QueryProvider } from '@/providers/query';
import { ReducedMotionConfig, ReduceMotion } from 'react-native-reanimated';
import { theme } from '@/lib/paper-theme';

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
