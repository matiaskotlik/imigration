import { queryOptions } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase/client';
import { InferDataType, supabaseQueryOptions } from '@/lib/supabase/utils';

export const documentListQueryOptions = () =>
  queryOptions({
    ...supabaseQueryOptions({
      query: () =>
        supabase.from('documents').select(
          `
      id,
      name,
      description,
      updatedAt:updated_at,
      template
    `
        ),
      transform: (data) => data,
    }),
    meta: {
      errorMessage: 'Failed to load documents',
    },
  });

export type DocumentListItem = InferDataType<
  ReturnType<typeof documentListQueryOptions>
>[number];

// for dev: hover to see type
let _: DocumentListItem;
