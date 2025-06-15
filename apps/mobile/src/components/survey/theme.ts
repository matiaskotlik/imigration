import { useMemo } from 'react';
import { MD3Theme, useTheme } from 'react-native-paper';
import { DoubleBorderLightPanelless } from 'survey-core/themes';

export const buildSurveyTheme = (theme: MD3Theme) => ({
  colorPalette: 'light',
  cssVariables: {
    ...DoubleBorderLightPanelless.cssVariables,
    '--sjs-general-backcolor-dim': theme.colors.background,
    '--sjs-general-backcolor-dim-dark':
      DoubleBorderLightPanelless.cssVariables['--sjs-general-backcolor'],
    // disable activecolor
    '--sjs-general-backcolor-dim-light':
      DoubleBorderLightPanelless.cssVariables['--sjs-general-backcolor'],
  },
  isPanelless: true,
});
export const useSurveyTheme = () => {
  const appTheme = useTheme();
  return useMemo(() => buildSurveyTheme(appTheme), [appTheme]);
};
