import dynamic from 'next/dynamic';

const DocumentDesigner = dynamic(() => import('./client-document-designer'), {
  ssr: false,
});

export default DocumentDesigner;
