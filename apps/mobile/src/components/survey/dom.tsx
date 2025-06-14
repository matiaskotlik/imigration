'use dom';

import 'survey-core/survey-core.css';
import { Model, Survey as SurveyJS, SurveyModel } from 'survey-react-ui';
import { DOMProps } from 'expo/dom';
import { GetProgressTextEvent, ITheme } from 'survey-core';
import { Survey } from '@/lib/schema/survey';
import { SurveyDataSchema } from '@/components/survey/types';
import { z } from 'zod/v4';

const SURVEY_OPTIONS = {
  allowResizeComment: false,
  autoAdvanceAllowComplete: false,
  autoAdvanceEnabled: true,
  autoGrowComment: true,
  completedBeforeHtml: '',
  headerView: 'advanced',
  loadingHtml: '',
  progressBarType: 'requiredQuestions',
  showCompletePage: false,
  showPageTitles: true,
  showProgressBar: true,
  showQuestionNumbers: 'on',
  showTitle: false,
  widthMode: 'responsive',
};

export default function DOMSurvey({
  onComplete,
  onRender,
  onSave,
  progressText,
  survey,
  surveyData,
  theme,
}: {
  dom?: DOMProps;
  onComplete: (data: unknown) => Promise<boolean>;
  onRender: () => Promise<void>;
  onSave: (data: z.input<typeof SurveyDataSchema>) => Promise<void>;
  progressText: string;
  survey: Survey;
  surveyData: z.output<typeof SurveyDataSchema>;
  theme: ITheme;
}) {
  const model = new Model({
    ...SURVEY_OPTIONS,
    currentPageNo: surveyData.currentPageNo,
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
    options.text = progressText.replaceAll(/{([^}]*)}/g, (match, key) => {
      if (key in options) {
        return options[key as keyof GetProgressTextEvent].toString();
      } else {
        console.warn(`Progress text placeholder ${key} not found in options.`);
        return match;
      }
    });
  });

  const handleSave = async ({ currentPageNo, data }: SurveyModel) => {
    await onSave({
      currentPageNo,
      data: data as unknown,
    });
  };

  model.onValueChanged.add(handleSave);
  model.onCurrentPageChanged.add(handleSave);

  return <SurveyJS model={model} />;
}
