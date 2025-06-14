import { serverSupabase } from '@/lib/supabase/server';
import { isMissingError } from '@/lib/supabase/utils';
import { missingResponse } from '@/lib/api';
import { generate } from '@pdfme/generator';
import { GenerateProps } from '@pdfme/common';
import { plugins } from '@/components/document/designer/plugins';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ documentId: string }> }
) {
  const { documentId } = await params;
  const data: unknown = await request.json();
  const supabase = await serverSupabase();
  const { data: document, error } = await supabase
    .from('documents')
    .select(`template`)
    .eq('id', documentId)
    .single();

  if (isMissingError(error)) {
    return missingResponse;
  }

  if (error) {
    throw error;
  }

  const pdf = await generate({
    inputs: [data] as GenerateProps['inputs'],
    plugins,
    template: document.template as GenerateProps['template'],
  });

  return new Response(pdf, {
    headers: { 'Content-Type': 'application/pdf' },
  });
}
