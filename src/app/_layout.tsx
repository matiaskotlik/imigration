import { Stack } from 'expo-router';
import { SplashScreenBarrier } from '@/components/SplashScreenBarrier';
import { LanguageProvider } from '@/providers/language';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import tw, { useDeviceContext } from 'twrnc';
import { AppStack } from '@/components/stack';
import * as SystemUI from 'expo-system-ui';

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

SystemUI.setBackgroundColorAsync(theme.colors.background);

export default function RootLayout() {
  useDeviceContext(tw);

  return (
    <PaperProvider theme={theme}>
      <LanguageProvider>
        <SplashScreenBarrier>
          <AppStack />
        </SplashScreenBarrier>
      </LanguageProvider>
    </PaperProvider>
  );
}
