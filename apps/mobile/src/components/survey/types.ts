import { z } from 'zod/v4';

export const SurveyDataSchema = z
  .object({
    currentPageNo: z.number().positive().default(1),
    data: z.any().default({}),
  })
  .prefault({});
