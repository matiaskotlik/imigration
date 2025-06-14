import { Section } from '@/components/ui/section';
import { DocumentList, DocumentListHeader } from '@/components/document/list';

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
