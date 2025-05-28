import { z } from 'zod/v4';

export const SurveyPageSchema = z.looseObject({});

export type SurveyPage = z.infer<typeof SurveyPageSchema>;

export const SurveyJsonSchema = z.looseObject({
  title: z.string().default(''),
  pages: z.array(SurveyPageSchema).default([]),
});

export type SurveyJson = z.infer<typeof SurveyJsonSchema>;

export const SurveySchema = z.object({
  id: z.string(),
  json: SurveyJsonSchema,
})

export type Survey = z.infer<typeof SurveySchema>;
