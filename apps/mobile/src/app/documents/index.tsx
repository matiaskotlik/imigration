import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import tw from 'twrnc';

import { Container } from '@/components/ui/container';
import { documentListQueryOptions } from '@/queries/documents';

// interface StoredDocument {
//   title: string;
//   uri: string;
// }

export default function DocumentsScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  // const [documents] = useMMKVObject<StoredDocument[]>('documents');
  const { data: documents, status: _status } = useQuery(
    documentListQueryOptions()
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTitleStyle: { color: theme.colors.onPrimary },
          title: t('documents.screenTitle'),
        }}
      />
      <View style={tw`flex-1`}>
        <Container style={tw`flex-1 gap-4`}>
          {documents && documents.length > 0 ? (
            documents.map((doc, idx) => (
              <Button
                key={idx}
                mode='outlined'
                // onPress={() => Linking.openURL(doc.uri)}
                style={tw`w-full`}
              >
                {doc.name}
              </Button>
            ))
          ) : (
            <Text style={tw`text-center text-lg`}>
              {t('documents.noneMessage')}
            </Text>
          )}
        </Container>
      </View>
    </>
  );
}
