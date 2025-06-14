'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
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
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { PropsWithChildren } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { supabase } from '@/lib/supabase/client';
import { urlId } from '@/lib/id';
import { BLANK_A4_PDF } from '@pdfme/common';
import { Json } from '@repo/supabase/database.types';

export const CreateDocumentFormSchema = z.object({
  description: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
});

export function CreateDocumentDialog({ children }: PropsWithChildren) {
  const router = useRouter();
  const context: ZodFormContext<typeof CreateDocumentFormSchema> = useForm({
    defaultValues: {
      description: '',
      name: '',
    },
    resolver: standardSchemaResolver(CreateDocumentFormSchema),
  });
  const {
    formState: { isSubmitSuccessful, isSubmitting },
    handleSubmit,
  } = context;
  const handleCreate = async (
    formData: z.output<typeof CreateDocumentFormSchema>
  ) => {
    const { data: document, error } = await supabase
      .from('documents')
      .insert({
        description: formData.description,
        name: formData.name,
        template: {
          basePdf: BLANK_A4_PDF as Json,
          schemas: [[]],
        },
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      toast.error('Failed to create document');
      return;
    }

    toast.success('Document created!');
    router.push(`/documents/${urlId(document.id)}`);
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>{children}</DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Create a new document</TooltipContent>
      </Tooltip>
      <FormProvider {...context}>
        <DialogContent>
          <form>
            <DialogHeader>
              <DialogTitle>New Document</DialogTitle>
              <DialogDescription>Create a new document.</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <FormField
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
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
                loading={isSubmitting || isSubmitSuccessful}
                onClick={handleSubmit(handleCreate)}
                type='submit'
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
