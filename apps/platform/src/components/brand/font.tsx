import {
  Josefin_Sans,
  Montserrat as MontserratGoogleFont,
  Source_Code_Pro as SourceCodeProGoogleFont,
} from 'next/font/google';

export const PrimaryFont = MontserratGoogleFont({
  subsets: ['latin'],
});

export const CodeFont = SourceCodeProGoogleFont({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const BrandFont = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-brand',
});
