import { twc } from 'react-twc';

export const FormLayout = twc.div`divide-y *:py-4 *:first:pt-0 *:last:pb-0`;

export const FormSection = twc.div`grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-4`;

export const FormSectionHeader = twc.div``;

export const FormSectionTitle = twc.h2`text-base/7 font-semibold`;

export const FormSectionSubtitle = twc.p`text-muted-foreground mt-1 text-sm/6`;

export const FormSectionContent = twc.div`grid max-w-2xl grid-cols-1 gap-6`;
