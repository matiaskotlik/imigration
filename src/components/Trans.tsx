import { ComponentProps } from 'react';
import { Trans as I18NTrans } from 'react-i18next';
import { Text } from 'react-native';

export function Trans({ components, ...props }: ComponentProps<typeof I18NTrans>) {
  return (
    <I18NTrans
      parent={Text}
      components={{
        strong: <Text style={{ fontWeight: 'bold' }} />,
        italic: <Text style={{ fontStyle: 'italic' }} />,
        ...components,
      }}
      {...props}
    />
  );
}
