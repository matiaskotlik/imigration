'use client';

import { Container } from '@/components/ui/container';
import { H3, Muted } from '@/components/ui/typography';
import { useCurrentSurvey } from '@/queries/current-survey';
import { Skeleton } from '@/components/ui/skeleton';
import { EditSurveyDialog } from '@/components/survey/modal/edit';
import { Button } from '@/components/ui/button';
import { CopyIcon, EditIcon, TrashIcon } from 'lucide-react';
import { DuplicateSurveyDialog } from '@/components/survey/modal/duplicate';
import { DeleteSurveyDialog } from '@/components/survey/modal/delete';

export function SurveyShellHeader() {
  const survey = useCurrentSurvey();
  return (
    <Container className='flex flex-row justify-between gap-8' size='full'>
      <div>
        <H3>{survey.name}</H3>
        <Muted>{survey.description}</Muted>
      </div>
      <div className='flex flex-row gap-2'>
        <EditSurveyDialog survey={survey}>
          <Button size='icon'>
            <EditIcon />
          </Button>
        </EditSurveyDialog>
        <DuplicateSurveyDialog survey={survey}>
          <Button size='icon'>
            <CopyIcon />
          </Button>
        </DuplicateSurveyDialog>
        <DeleteSurveyDialog survey={survey}>
          <Button size='icon' variant='destructive'>
            <TrashIcon />
          </Button>
        </DeleteSurveyDialog>
      </div>
    </Container>
  );
}

export function SurveyShellHeaderSkeleton() {
  return (
    <Container className='flex flex-row justify-between gap-8' size='full'>
      <div>
        <Skeleton size='title' />
        <Skeleton size='description' />
      </div>
    </Container>
  );
}
