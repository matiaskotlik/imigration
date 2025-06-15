import { useMemo } from 'react';
import { z } from 'zod/v4';

import { storage } from '@/lib/mmkv';

export const useStoredObjectOnce = <T extends z.ZodType>(
  key: string,
  schema: T
) => {
  const value = useMemo(() => {
    const json = storage.getString(key);
    return schema.parse(json);
  }, [key, schema]);

  const setValue = (value: z.input<T>) => {
    storage.set(key, JSON.stringify(value));
  };

  const deleteValue = () => {
    storage.delete(key);
  };

  return [value, setValue, deleteValue] as const;
};
