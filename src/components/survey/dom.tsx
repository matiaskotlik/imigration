'use dom';

import 'survey-core/survey-core.css';
import { Model, Survey as SurveyJS } from 'survey-react-ui';
import { ITheme } from 'survey-core';
import { SurveyHandlers } from '@/components/survey/types';
import { DOMProps } from 'expo/dom';

export default function DOMSurvey({
  survey,
  theme,
  saveInProgressText,
  onAfterRenderSurvey = async () => {},
  onComplete = async () => {},
}: {
  dom?: DOMProps,
  survey: any;
  theme: ITheme;
  saveInProgressText?: string;
} & SurveyHandlers) {
  const model = new Model(survey);
  model.applyTheme(theme);

  model.onAfterRenderSurvey.add(async () => await onAfterRenderSurvey());
  model.onComplete.add(async (sender, options) => {
    options.showSaveInProgress()
    await onComplete(sender.data)
  });

  return <SurveyJS model={model} />;
}
