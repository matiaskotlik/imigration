import { Trans as I18NTrans } from 'react-i18next';
import { Text } from 'react-native';
import { ComponentProps } from 'react';

export function Trans({
  ...props
}: Omit<ComponentProps<typeof I18NTrans>, 'components'>) {
  // TODO this might not update when we change the language: https://react.i18next.com/latest/trans-component#important-note
  return (
    <I18NTrans
      components={{
        italic: <Text style={{ fontStyle: 'italic' }} />,
        strong: <Text style={{ fontWeight: 'bold' }} />,
      }}
      parent={Text}
      {...props}
    />
  );
}
