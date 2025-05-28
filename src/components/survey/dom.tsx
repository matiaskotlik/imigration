'use dom';

import 'survey-core/survey-core.css';
import { Model, Survey as SurveyJS } from 'survey-react-ui';
import { DOMProps } from 'expo/dom';
import { SurveyProps } from '@/components/survey/types';
import { ITheme } from 'survey-core';
import { SurveyJson } from '@/lib/schema/survey';

export default function DOMSurvey({
  json,
  theme,
  onComplete = async () => {},
  onAfterRenderSurvey = async () => {},
}: SurveyProps & {
  dom?: DOMProps;
  json: SurveyJson;
  theme: ITheme;
  onAfterRenderSurvey?: () => Promise<void>;
}) {
  const model = new Model(json);
  model.applyTheme(theme);

  model.onAfterRenderSurvey.add(async () => await onAfterRenderSurvey());
  model.onComplete.add(async (sender, _options) => await onComplete(sender.data));

  return <SurveyJS model={model} />;
}
