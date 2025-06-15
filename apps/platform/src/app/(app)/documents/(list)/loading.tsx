import {
  DocumentListHeaderSkeleton,
  DocumentListSkeleton,
} from '@/components/document/list';
import { Section } from '@/components/ui/section';

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
