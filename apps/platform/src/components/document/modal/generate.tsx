'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { z } from 'zod/v4';
import { FormProvider, useForm } from 'react-hook-form';
import { ZodFormContext } from '@/lib/form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { PropsWithChildren, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CurrentDocument } from '@/queries/current-document';
import { raiseStatus } from '@/lib/utils';

export const GenerateDocumentFormSchema = z.object({
  data: z.string(),
});

export function GenerateDocumentDialog({
  children,
  document,
}: PropsWithChildren<{ document: CurrentDocument }>) {
  const [isOpen, setIsOpen] = useState(false);
  const context: ZodFormContext<typeof GenerateDocumentFormSchema> = useForm({
    defaultValues: {
      data: '{}',
    },
    resolver: standardSchemaResolver(GenerateDocumentFormSchema),
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = context;

  const handleGenerate = async (
    formData: z.output<typeof GenerateDocumentFormSchema>
  ) => {
    try {
      const res = await fetch(`/api/documents/${document.id}/pdf`, {
        body: formData.data,
        method: 'POST',
      }).then(raiseStatus);

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
    } catch (error: unknown) {
      console.error('Failed to generate document:', error);
      toast.error('Failed to generate document');
    }

    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>{children}</DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Generate document</TooltipContent>
      </Tooltip>
      <FormProvider {...context}>
        <DialogContent>
          <form>
            <DialogHeader>
              <DialogTitle>Generate Document</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <FormField
                name='data'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                loading={isSubmitting}
                onClick={handleSubmit(handleGenerate)}
                type='submit'
              >
                Generate
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
