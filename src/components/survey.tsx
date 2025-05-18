'use dom';

import 'survey-core/survey-core.css';
import { Model, Survey as SurveyJS } from 'survey-react-ui';
import { ITheme } from 'survey-core';
import { useMemo, useState } from 'react';

export type SurveyProps = {
  surveyTheme: ITheme;
  surveyJson: any;
  onComplete?: () => Promise<void>;
  onBeforeRenderSurvey?: () => Promise<void>;
  onAfterRenderSurvey?: () => Promise<void>;
};

export default function Survey({
  surveyTheme,
  surveyJson,
  onComplete = async () => {},
  onBeforeRenderSurvey = async () => {},
  onAfterRenderSurvey = async () => {},
}: SurveyProps) {
  const [pageIdx, setPageIndex] = useState(0);
  const model = useMemo(() => {
    const model = new Model({
      ...surveyJson,
      pages: [surveyJson.pages[pageIdx]],
    });
    model.applyTheme(surveyTheme);
    const isLastPage = pageIdx >= surveyJson.pages.length - 1;
    if (isLastPage) {
      model.onComplete.add(onComplete);
    } else {
      model.onComplete.add(async () => {
        await onBeforeRenderSurvey();
        setPageIndex((prev) => prev + 1);
      })
    }
    model.onAfterRenderSurvey.add(() => onAfterRenderSurvey());
    return model;
  }, [onAfterRenderSurvey, onComplete, pageIdx, surveyJson, surveyTheme]);
  return <SurveyJS model={model} />;
}
