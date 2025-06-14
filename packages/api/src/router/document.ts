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
        documentId: z.uuid(),
        variables: z.any(),
      })
    )
    .mutation(
      async ({ ctx: { supabase }, input: { documentId, variables } }) => {
        const { template } = await supabase
          .from('documents')
          .select(`template`)
          .eq('id', documentId)
          .single()
          .then(handleMissing)
          .then(unwrap);

        const pdf = await generate({
          inputs: [variables] as GenerateProps['inputs'],
          plugins,
          template: template as GenerateProps['template'],
        });

        const data = btoa(
          pdf.reduce((data, byte) => data + String.fromCodePoint(byte), '')
        );
        return { data };
      }
    ),
} satisfies TRPCRouterRecord;
