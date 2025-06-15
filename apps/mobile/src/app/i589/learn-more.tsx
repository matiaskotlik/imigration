import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import tw from 'twrnc';

import { Trans } from '@/components/trans';
import { Container } from '@/components/ui/container';

export default function I589LearnMoreScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          title: t('i589.learnMore.screenTitle'),
        }}
      />
      <View style={tw`flex-1`}>
        <SafeAreaView />
        <Container style={tw`flex-1 items-center gap-4`}>
          <Text
            style={tw.style('text-center', { color: theme.colors.primary })}
            variant='displayMedium'
          >
            <Trans i18nKey='i589.learnMore.title' />
          </Text>
          <Text style={tw`text-center`} variant='bodyLarge'>
            <Trans i18nKey='i589.learnMore.content' />
          </Text>
          <View style={tw`flex-row items-center gap-2`}>
            <MaterialIcons color={theme.colors.primary} name='lock' size={32} />
            <Text style={tw`flex-1 text-center`} variant='bodyLarge'>
              <Trans i18nKey='i589.learnMore.privacyContent' />
            </Text>
          </View>
          <Button
            labelStyle={tw`text-2xl`}
            mode='contained'
            onPress={() => {
              router.replace('/i589/survey');
            }}
            style={tw`mt-auto w-full`}
          >
            <Trans i18nKey='i589.learnMore.continue' />
          </Button>
        </Container>
      </View>
    </>
  );
}
