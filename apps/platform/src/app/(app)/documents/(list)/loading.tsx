import { Section } from '@/components/ui/section';
import {
  DocumentListHeaderSkeleton,
  DocumentListSkeleton,
} from '@/components/document/list';

export default function DocumentListLoading() {
  return (
    <>
      <Section>
        <DocumentListHeaderSkeleton />
      </Section>
      <Section viewport>
        <DocumentListSkeleton />
      </Section>
    </>
  );
}
