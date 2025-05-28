import { Stack, useRouter } from 'expo-router';
import { Button, Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import tw from 'twrnc';
import { Container } from '@/components/ui/container';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView, View } from 'react-native';
import { Trans } from '@/components/Trans';

export default function I589WelcomeScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
      <View style={tw`flex-1`}>
        <SafeAreaView />
        <Container style={tw`flex-1 items-center gap-4`}>
          <MaterialCommunityIcons
            name="clipboard-edit-outline"
            size={96}
            color={theme.colors.primary}
          />
          <Text
            variant="displayMedium"
            style={tw.style('text-center', { color: theme.colors.primary })}>
            <Trans i18nKey="i589.welcome.title" />
          </Text>
          <Text
            variant="bodyLarge"
            style={tw.style('text-center', { color: theme.colors.primary })}>
            <Trans i18nKey="i589.welcome.description" />
          </Text>
          <Text variant="bodyLarge" style={tw`text-center`}>
            <Trans i18nKey="i589.welcome.privacyDescription" />
          </Text>
          <Button
            mode="contained"
            style={tw`w-full mt-auto`}
            labelStyle={tw`text-2xl`}
            onPress={() => router.push('/i589/survey')}>
            <Trans i18nKey="i589.welcome.continue" />
          </Button>
          <Button
            mode="text"
            onPress={() => router.push('/i589/learn-more')}
            labelStyle={tw`text-base text-gray-500`}>
            <Trans i18nKey="i589.welcome.learnMore" />
          </Button>
        </Container>
      </View>
    </>
  );
}
