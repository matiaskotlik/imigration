'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  type ControllerProps,
  FieldErrors,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  useFormState,
} from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { twc } from 'react-twc';
import {
  createRequiredContext,
  useRequiredContext,
} from '@/lib/required-context';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createRequiredContext<FormFieldContextValue>();

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller control={control} {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useRequiredContext(FormFieldContext);
  const itemContext = useRequiredContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    formDescriptionId: `${id}-form-item-description`,
    formItemId: `${id}-form-item`,
    formMessageId: `${id}-form-item-message`,
    id,
    name: fieldContext.name,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createRequiredContext<FormItemContextValue>();

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formDescriptionId, formItemId, formMessageId } =
    useFormField();

  return (
    <Slot
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
      }
      aria-invalid={!!error}
      data-slot='form-control'
      id={formItemId}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      className={cn('text-muted-foreground text-sm', className)}
      data-slot='form-description'
      id={formDescriptionId}
      {...props}
    />
  );
}

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        className={cn('grid auto-rows-min gap-2', className)}
        data-slot='form-item'
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn('data-[error=true]:text-destructive', className)}
      data-error={!!error}
      data-slot='form-label'
      htmlFor={formItemId}
      {...props}
    />
  );
}

const FormError = twc.p`text-destructive text-sm`;

export function FormGlobalMessage<
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  ...props
}: { name: keyof FieldErrors<TFieldValues> } & React.ComponentProps<'p'>) {
  const {
    formState: { errors },
  } = useFormContext();

  const message = errors[name]?.message;

  if (message === undefined) {
    return null;
  }

  if (typeof message !== 'string') {
    console.warn(
      `Expected error message to be a string, but got ${typeof message}`
    );
    return null;
  }

  return (
    <FormError data-slot='form-list-message' {...props}>
      {message}
    </FormError>
  );
}

function FormMessage({ ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message ?? '') : props.children;

  if (!body) {
    return null;
  }

  return (
    <FormError data-slot='form-message' id={formMessageId} {...props}>
      {body}
    </FormError>
  );
}

export {
  Form,
  FormControl,
  FormDescription,
  FormError,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
