import { Stack } from 'expo-router';
import { Button, Text, useTheme } from 'react-native-paper';
import { Linking, View } from 'react-native';
import { Container } from '@/components/ui/container';
import { useMMKVObject } from 'react-native-mmkv';
import { useTranslation } from 'react-i18next';
import tw from 'twrnc';

type StoredDocument = {
  title: string;
  uri: string;
};

export default function DocumentsScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [documents] = useMMKVObject<StoredDocument[]>('documents');

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
                onPress={() => Linking.openURL(doc.uri)}
                style={tw`w-full`}
              >
                {doc.title}
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
