'use dom';

import 'survey-core/survey-core.css';
import { Model, Survey as SurveyJS } from 'survey-react-ui';
import { ITheme } from 'survey-core';
import { SurveyHandlers } from '@/components/survey/types';
import { DOMProps } from 'expo/dom';

export default function DOMSurvey({
  survey,
  theme,
  onAfterRenderSurvey = async () => {},
  onComplete = async () => {},
}: {
  dom?: DOMProps,
  theme: ITheme;
  survey: any;
} & SurveyHandlers) {
  const model = new Model(survey);
  model.applyTheme(theme);

  model.onAfterRenderSurvey.add(() => onAfterRenderSurvey());
  model.onComplete.add(() => onComplete());

  return <SurveyJS model={model} />;
}
