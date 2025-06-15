import { DocumentList, DocumentListHeader } from '@/components/document/list';
import { Section } from '@/components/ui/section';

export const metadata = {
  title: 'Documents',
};

export default function DocumentListPage() {
  return (
    <>
      <Section>
        <DocumentListHeader />
      </Section>

      <Section viewport>
        <DocumentList />
      </Section>
    </>
  );
}
