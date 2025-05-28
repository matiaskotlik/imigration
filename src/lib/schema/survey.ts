import { z } from 'zod/v4';

export const SurveyJsonSchema = z.looseObject({
  pages: z.array(z.looseObject({}))
});

export type SurveyJson = z.infer<typeof SurveyJsonSchema>;

export const SurveySchema = z.object({
  name: z.string(),
  description: z.string(),
  updatedAt: z.date(),
  json: SurveyJsonSchema,
})

export type Survey = z.infer<typeof SurveySchema>;