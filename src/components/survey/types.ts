export type SurveyHandlers = {
  onAfterRenderSurvey?: () => Promise<void>;
  onComplete?: (data: any) => Promise<void>;
}