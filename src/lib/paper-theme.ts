import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { MD3LightTheme } from 'react-native-paper';

export const theme: ThemeProp = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    background: '#f5f5f5',
    primary: '#223A5F',
    onPrimary: '#ffffff',
    secondary: '#c29a3c',
  },
  fonts: {
    ...MD3LightTheme.fonts,
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      lineHeight: MD3LightTheme.fonts.titleLarge.lineHeight,
    }
  }
};