import { SurveyEditor } from '@/components/survey/editor';
import { Section } from '@/components/ui/section';

export const metadata = {
  title: 'Survey Editor',
};

export default function SurveyPage() {
  return (
    <>
      <Section className='flex pb-0' size='xs' viewport>
        <div className='flex-1'>
          <SurveyEditor />
        </div>
      </Section>
    </>
  );
}
