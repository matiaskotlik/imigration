import { SurveyList, SurveyListHeader } from '@/components/survey/list';
import { Section } from '@/components/ui/section';

export const metadata = {
  title: 'Surveys',
};

export default function SurveyListPage() {
  return (
    <>
      <Section>
        <SurveyListHeader />
      </Section>

      <Section viewport>
        <SurveyList />
      </Section>
    </>
  );
}
