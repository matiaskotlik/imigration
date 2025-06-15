'use client';

import { DesignerProps } from '@pdfme/common';
import { Designer } from '@pdfme/ui';
import plugins from '@repo/pdfme-plugins';
import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cssHex, reforwardRef } from '@/lib/utils';

export default forwardRef(function ClientDocumentDesigner(
  {
    containerRef: forwardedContainerRef,
    onChangeTemplate,
    onSaveTemplate,
    template,
    ...props
  }: ComponentProps<'div'> & {
    readonly containerRef?: RefObject<HTMLDivElement | null>;
    readonly onChangeTemplate?: (template: DesignerProps['template']) => void;
    readonly onSaveTemplate?: (template: DesignerProps['template']) => void;
    readonly template: DesignerProps['template'];
  },
  ref: ForwardedRef<Designer>
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [designer, setDesigner] = useState<Designer | null>(null);

  useEffect(() => {
    reforwardRef(ref, designer);
  }, [designer, ref]);

  useEffect(() => {
    if (!designer || !onSaveTemplate) {
      return;
    }

    designer.onSaveTemplate(onSaveTemplate);
  }, [designer, onSaveTemplate]);

  useEffect(() => {
    if (!designer || !onChangeTemplate) {
      return;
    }

    designer.onChangeTemplate(onChangeTemplate);
  }, [designer, onChangeTemplate]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const newDesigner = new Designer({
      domContainer: containerRef.current,
      options: {
        icons: {
          multiVariableText:
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-line-icon lucide-pencil-line"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/><path d="m15 5 3 3"/></svg>',
          signature:
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-signature-icon lucide-signature"><path d="m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284"/><path d="M3 21h18"/></svg>',
        },
        labels: {
          'signature.clear': '🗑️',
        },
        lang: 'en',
        maxZoom: 250,
        theme: {
          token: { colorPrimary: cssHex('--primary') },
        },
      },
      plugins,
      template,
    });

    setDesigner(newDesigner);

    return () => {
      newDesigner.destroy();
    };
  }, [template]);

  useEffect(() => {
    if (!forwardedContainerRef) {
      return;
    }

    reforwardRef(forwardedContainerRef, containerRef.current);
  }, [forwardedContainerRef]);

  return <div {...props} ref={containerRef} />;
});
