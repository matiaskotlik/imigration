import { Section } from '@/components/ui/section';
import {
  SurveyListHeaderSkeleton,
  SurveyListSkeleton,
} from '@/components/survey/list';

export default function SurveyListLoading() {
  return (
    <>
      <Section>
        <SurveyListHeaderSkeleton />
      </Section>
      <Section viewport>
        <SurveyListSkeleton />
      </Section>
    </>
  );
}
