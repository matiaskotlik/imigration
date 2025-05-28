import { Stack, useRouter } from 'expo-router';
import { Button, Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import tw from 'twrnc';
import { Container } from '@/components/ui/container';
import { SafeAreaView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Trans } from '@/components/Trans';

export default function I589LearnMoreScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: t('i589.learnMore.screenTitle'),
          headerTransparent: true,
        }}
      />
      <View style={tw`flex-1`}>
        <SafeAreaView />
        <Container style={tw`flex-1 items-center gap-4`}>
          <Text
            variant="displayMedium"
            style={tw.style('text-center', { color: theme.colors.primary })}>
            <Trans i18nKey="i589.learnMore.title" />
          </Text>
          <Text variant="bodyLarge" style={tw`text-center`}>
            <Trans i18nKey="i589.learnMore.content" />
          </Text>
          <View style={tw`flex-row items-center gap-2`}>
            <MaterialIcons name="lock" size={32} color={theme.colors.primary} />
            <Text variant="bodyLarge" style={tw`text-center flex-1`}>
              <Trans i18nKey="i589.learnMore.privacyContent" />
            </Text>
          </View>
          <Button
            mode="contained" style={tw`w-full mt-auto`} labelStyle={tw`text-2xl`}
            onPress={() => router.replace('/i589/survey')}
          >
            <Trans i18nKey="i589.learnMore.continue" />
          </Button>
        </Container>
      </View>
    </>
  );
}
