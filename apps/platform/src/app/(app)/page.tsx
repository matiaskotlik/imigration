import { P } from '@/components/ui/typography';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';

export const metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <>
      <Section viewport>
        <Container>
          <P>Use the sidebar to get to what you&apos;re looking for.</P>
        </Container>
      </Section>
    </>
  );
}
