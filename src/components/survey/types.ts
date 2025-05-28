import { type Survey } from '@/lib/schema/survey';

export type SurveyProps = {
  survey: Survey,
  onComplete?: (data: any) => Promise<void>;
};
