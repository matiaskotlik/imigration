import { Container } from '@/components/ui/container';
import { P } from '@/components/ui/typography';

export function Footer() {
  return (
    <Container>
      <P>
        &copy;
        {new Date().getFullYear()} Kiltok, LLC. All rights reserved.
      </P>
    </Container>
  );
}
