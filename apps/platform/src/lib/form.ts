import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod/v4';

export const NumberSchema = z
  .string()
  .transform((v) => v.replace(',', ''))
  .refine((v) => !Number.isNaN(Number(v)) && v.length > 0, {
    message: 'Invalid number',
  })
  .transform(Number);

export const PositiveIntegerSchema = NumberSchema.refine(
  (v) => v > 0 && Number.isInteger(v),
  {
    message: 'Must be a positive integer',
  }
);

export const NonEmptyStringSchema = z.string().min(1, {
  message: 'Cannot be empty',
});

export const PairSchema = NonEmptyStringSchema.regex(
  /^[\dA-Z]+[/-][\dA-Z]+$/,
  'Invalid Pair'
);

export const checkUnique =
  <T>(key: keyof T) =>
  (arr: T[]) =>
    new Set(arr.map((obj) => obj[key])).size === arr.length;

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];
type PickKeysMatching<T, V> = Record<KeysMatching<T, V>, V>;

export const reduceToRecord =
  <O, T extends PickKeysMatching<T, string>>(
    key: KeysMatching<T, string>,
    transform: (obj: T) => O
  ) =>
  (arr: T[]) =>
    arr.reduce<Record<string, O>>((acc, obj) => {
      acc[obj[key]] = transform(obj);
      return acc;
    }, {});

export type ZodFormContext<T extends z.ZodType> = UseFormReturn<
  // @ts-expect-error TODO zod v4 update broke this type
  z.input<T>,
  unknown,
  z.output<T>
>;
