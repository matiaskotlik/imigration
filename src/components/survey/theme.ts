import { MD3Theme, useTheme } from 'react-native-paper';
import { DoubleBorderLightPanelless } from 'survey-core/themes';
import { useMemo } from 'react';

export const buildSurveyTheme = (theme: MD3Theme) => ({
  colorPalette: 'light',
  isPanelless: true,
  cssVariables: {
    ...DoubleBorderLightPanelless.cssVariables,
    "--sjs-general-backcolor-dim": theme.colors.background,
    // disable activecolor
    '--sjs-general-backcolor-dim-light':
      DoubleBorderLightPanelless.cssVariables['--sjs-general-backcolor'],
    '--sjs-general-backcolor-dim-dark':
      DoubleBorderLightPanelless.cssVariables['--sjs-general-backcolor'],
  },
});
export const useSurveyTheme = () => {
  const appTheme = useTheme();
  return useMemo(() => buildSurveyTheme(appTheme), [appTheme]);
};