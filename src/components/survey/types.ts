export type SurveyHandlers = {
  onAfterRenderSurvey?: () => Promise<void>;
  onComplete?: () => Promise<void>;
}