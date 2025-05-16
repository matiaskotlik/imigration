'use dom';

import 'survey-core/survey-core.css';
import { Model, Survey as SurveyJS } from 'survey-react-ui';
import { ITheme } from 'survey-core';

export type SurveyProps = {
  theme: ITheme;
  surveyJson: any;
  onComplete?: () => Promise<void>;
  onAfterRenderSurvey?: () => Promise<void>;
};

export default function Survey({
  theme,
  surveyJson,
  onComplete,
  onAfterRenderSurvey,
}: SurveyProps) {
  const model = new Model(surveyJson);
  model.applyTheme(theme);
  onComplete && model.onComplete.add(onComplete);
  onAfterRenderSurvey && model.onAfterRenderSurvey.add(() => onAfterRenderSurvey());
  return <SurveyJS model={model} />;
}
