'use dom';

import 'survey-core/survey-core.css';
import { Model, Survey as SurveyJS, SurveyModel } from 'survey-react-ui';
import { DOMProps } from 'expo/dom';
import { GetProgressTextEvent, ITheme } from 'survey-core';
import { Survey } from '@/lib/schema/survey';

const SURVEY_OPTIONS = {
  showTitle: false,
  showPageTitles: true,
  showCompletePage: false,
  showQuestionNumbers: 'on',
  completedBeforeHtml: '',
  loadingHtml: '',
  showProgressBar: true,
  progressBarType: 'requiredQuestions',
  autoGrowComment: true,
  allowResizeComment: false,
  autoAdvanceEnabled: true,
  autoAdvanceAllowComplete: false,
  widthMode: 'responsive',
  headerView: 'advanced',
};

interface SavedData {
  data: unknown;
  currentPageNo: number;
}

export default function DOMSurvey({
  survey,
  theme,
  onSave,
  onRestore,
  onRender,
  onComplete,
  progressText,
}: {
  dom?: DOMProps;
  survey: Survey,
  theme: ITheme;
  onSave: (data: SavedData) => Promise<void>;
  onRestore: () => Promise<SavedData | undefined>;
  onRender: () => Promise<void>;
  onComplete: (data: unknown) => Promise<void>;
  progressText: string;
}) {
  const model = new Model({
    ...SURVEY_OPTIONS,
    pages: survey.json.pages,
    currentPageNo: 1,
  });
  model.applyTheme(theme);

  onRestore()
    .then((savedData) => {
      if (!savedData) return;

      model.data = savedData.data;
      model.currentPageNo = savedData.currentPageNo;
    })
    .catch((error) => {
      console.error('Error restoring survey data:', error);
    });

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

  const handleSave = async ({ data, currentPageNo }: SurveyModel) => {
    await onSave({ data, currentPageNo });
  };

  model.onValueChanged.add(handleSave);
  model.onCurrentPageChanged.add(handleSave);

  return <SurveyJS model={model} />;
}
