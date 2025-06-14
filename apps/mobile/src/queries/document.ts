import { raiseStatus } from '@/lib/utils';

export const generateDocument = async (documentId: string, data: unknown) => {
  return await fetch(
    `https://imigration.kiltok.com/api/document/${documentId}/pdf`,
    {
      body: JSON.stringify(data),
      method: 'POST',
    }
  ).then(raiseStatus);
};
