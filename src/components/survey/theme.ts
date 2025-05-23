import { MD3Theme } from 'react-native-paper';
import { DoubleBorderLightPanelless } from 'survey-core/themes';

export const buildSurveyTheme = (theme: MD3Theme) => ({
  colorPalette: 'light',
  isPanelless: true,
  cssVariables: {
    ...DoubleBorderLightPanelless.cssVariables,
    // disable activecolor
    '--sjs-general-backcolor-dim-light':
      DoubleBorderLightPanelless.cssVariables['--sjs-general-backcolor'],
    '--sjs-general-backcolor-dim-dark':
      DoubleBorderLightPanelless.cssVariables['--sjs-general-backcolor'],
  },
});
