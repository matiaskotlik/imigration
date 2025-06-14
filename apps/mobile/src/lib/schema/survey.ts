import { z } from 'zod/v4';

export const SurveyPageSchema = z.looseObject({});

export const SurveyJsonSchema = z.looseObject({
  pages: z.array(SurveyPageSchema).default([]),
  title: z.string().default(''),
});

export const SurveySchema = z.object({
  id: z.string(),
  json: SurveyJsonSchema,
});

export type Survey = z.output<typeof SurveySchema>;
