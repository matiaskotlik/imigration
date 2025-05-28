'use dom';

import 'survey-core/survey-core.css';
import { Model, Survey } from 'survey-react-ui';
import { DOMProps } from 'expo/dom';
import { SurveyProps } from '@/components/survey/types';
import { GetProgressTextEvent, ITheme } from 'survey-core';

const SURVEY_OPTIONS = {
  showTitle: false,
  showPageTitles: true,
  showQuestionNumbers: 'on',
  showProgressBar: true,
  progressBarType: 'requiredQuestions',
  autoGrowComment: true,
  allowResizeComment: false,
  autoAdvanceEnabled: true,
  autoAdvanceAllowComplete: false,
  widthMode: 'responsive',
  headerView: 'advanced',
};

export default function DOMSurvey({
  survey,
  theme,
  onRender,
  progressText,
  onComplete = async () => {},
}: {
  dom?: DOMProps;
  theme: ITheme;
  onRender: () => Promise<void>;
  progressText: string;
} & SurveyProps) {
  const model = new Model({
    ...SURVEY_OPTIONS,
    pages: survey.json.pages,
  });
  model.applyTheme(theme);

  model.onAfterRenderSurvey.add(async () => {
    await onRender();
  });

  model.onComplete.add(async ({ data }, _) => {
    await onComplete(data);
  });

  model.onGetProgressText.add(async (_, options) => {
    options.text = progressText.replace(/{([^}]*)}/g, (match, key) => {
      if (key in options) {
        return options[key as keyof GetProgressTextEvent].toString();
      } else {
        console.warn(`Progress text placeholder ${key} not found in options.`);
        return match;
      }
    });
  });

  return <Survey model={model} />;
}
