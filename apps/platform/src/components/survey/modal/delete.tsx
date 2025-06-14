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
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CurrentSurvey } from '@/queries/current-survey';
import { supabase } from '@/lib/supabase/client';

export function DeleteSurveyDialog({
  children,
  survey,
}: PropsWithChildren<{ survey: CurrentSurvey }>) {
  const router = useRouter();
  const context = useForm();
  const {
    formState: { isSubmitSuccessful, isSubmitting },
    handleSubmit,
  } = context;

  const handleDelete = async () => {
    const { error } = await supabase
      .from('surveys')
      .delete()
      .eq('id', survey.id);

    if (error) {
      console.error(error);
      toast.error('Failed to delete survey');
    }

    toast.success('Deleted survey!');
    router.replace('/surveys');
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>{children}</DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
      <FormProvider {...context}>
        <DialogContent>
          <form>
            <DialogHeader>
              <DialogTitle>Delete {survey.name}</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this survey? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                loading={isSubmitting || isSubmitSuccessful}
                onClick={handleSubmit(handleDelete)}
                type='submit'
                variant='destructive'
              >
                Delete
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
