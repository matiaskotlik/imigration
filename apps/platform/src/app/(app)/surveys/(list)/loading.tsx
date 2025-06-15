import {
  SurveyListHeaderSkeleton,
  SurveyListSkeleton,
} from '@/components/survey/list';
import { Section } from '@/components/ui/section';

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
