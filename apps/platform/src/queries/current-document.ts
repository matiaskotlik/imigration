import {
  InferDataType,
  redirectMissing,
  supabaseQueryOptions,
  TypedSupabaseClient,
} from '@/lib/supabase/utils';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { useDocumentId } from '@/lib/app-context';
import { DesignerProps } from '@pdfme/common';

export const currentDocumentQueryOptions = (id: string) =>
  queryOptions({
    ...supabaseQueryOptions({
      query: (supabase: TypedSupabaseClient) =>
        supabase
          .from('documents')
          .select(
            `
      id,
      name,
      description,
      updatedAt:updated_at,
      template
    `
          )
          .eq('id', id)
          .single(),
      transform: ({ template, ...document }) => ({
        ...document,
        template: template as DesignerProps['template'],
      }),
      transformError: redirectMissing,
    }),
    meta: {
      errorMessage: 'Failed to load document',
    },
  });

export type CurrentDocument = InferDataType<
  ReturnType<typeof currentDocumentQueryOptions>
>;

// for dev: hover to see type
let _: CurrentDocument;

export const useCurrentDocument = () =>
  useSuspenseQuery(currentDocumentQueryOptions(useDocumentId())).data;
