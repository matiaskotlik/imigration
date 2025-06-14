import type { TRPCRouterRecord } from '@trpc/server';

import { publicProcedure } from '@repo/api/trpc';
import { z } from 'zod/v4';
import { handleMissing, unwrap } from '@repo/api/utils';
import { generate } from '@pdfme/generator';
import plugins from '@repo/pdfme-plugins';
import { GenerateProps } from '@pdfme/common';

export const documentRouter = {
  generatePdf: publicProcedure
    .input(
      z.object({
        data: z.any(),
        documentId: z.uuid(),
      })
    )
    .mutation(async ({ ctx: { supabase }, input: { data, documentId } }) => {
      const { template } = await supabase
        .from('documents')
        .select(`template`)
        .eq('id', documentId)
        .single()
        .then(handleMissing)
        .then(unwrap);

      const pdf = await generate({
        inputs: [data] as GenerateProps['inputs'],
        plugins,
        template: template as GenerateProps['template'],
      });
    }),
} satisfies TRPCRouterRecord;
