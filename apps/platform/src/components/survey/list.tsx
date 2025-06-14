'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRowTrigger,
} from '@/components/ui/table';
import { Container } from '@/components/ui/container';
import { ChevronRightIcon, FilePlusIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { H3 } from '@/components/ui/typography.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Button } from '@/components/ui/button.tsx';
import { SurveyListItem, useInfiniteSurveyList } from '@/queries/survey-list';
import {
  EmptyContainer,
  EmptyDescription,
  EmptyTitle,
} from '@/components/ui/empty.tsx';
import { CreateSurveyDialog } from '@/components/survey/modal/create';
import InfiniteFetcher from '@/components/infinite-scroller';
import { BrandSpinner } from '@/components/brand/logo';
import { urlId } from '@/lib/id';

export function SurveyList() {
  const {
    data: surveys,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteSurveyList();

  if (surveys.length === 0) {
    return <SurveyListEmpty />;
  }
  return (
    <Container>
      <Table borderVariant='rounded'>
        <TableHeader>
          <HeaderRow />
        </TableHeader>
        <TableBody>
          {surveys.map((survey) => (
            <SurveyRow key={survey.id} survey={survey} />
          ))}
          {isFetchingNextPage && (
            <TableRow hover={false} key={0}>
              <TableCell colSpan={99}>
                <BrandSpinner />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <InfiniteFetcher
        count={surveys.length}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </Container>
  );
}

export function SurveyListHeader() {
  return (
    <Container className='flex justify-between'>
      <H3>Surveys</H3>
      <CreateSurveyDialog>
        <Button size='icon'>
          <PlusIcon />
        </Button>
      </CreateSurveyDialog>
    </Container>
  );
}

export function SurveyListHeaderSkeleton() {
  return (
    <Container className='flex justify-between'>
      <H3>Surveys</H3>
      <Skeleton size='title' />
    </Container>
  );
}

export function SurveyListSkeleton() {
  return (
    <Container>
      <Table borderVariant='rounded'>
        <TableHeader>
          <HeaderRow />
        </TableHeader>
        <TableBody>
          {Array.from({ length: 7 }).map((_, i) => (
            <TableRow className='h-12' hover={false} key={i}>
              <TableCell>
                <Skeleton size='description' />
              </TableCell>
              <TableCell colSpan={99}>
                <Skeleton className='ml-auto' size='label' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

function HeaderRow() {
  return (
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Description</TableHead>
      <TableHead>Last Updated</TableHead>
      <TableHead className='w-6'></TableHead>
    </TableRow>
  );
}

function SurveyListEmpty() {
  return (
    <EmptyContainer>
      <FilePlusIcon />
      <EmptyTitle>No surveys</EmptyTitle>
      <EmptyDescription>Get started by creating a new survey.</EmptyDescription>
    </EmptyContainer>
  );
}

function SurveyRow({ survey }: { survey: SurveyListItem }) {
  return (
    <TableRow>
      <TableCell>{survey.name}</TableCell>
      <TableCell>{survey.description}</TableCell>
      <TableCell>
        {new Date(survey.updatedAt).toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })}
      </TableCell>
      <TableCell className='text-right'>
        <ChevronRightIcon className='text-muted-foreground size-4 flex-none' />
        <TableRowTrigger>
          <Link href={`/surveys/${urlId(survey.id)}`} />
        </TableRowTrigger>
      </TableCell>
    </TableRow>
  );
}
