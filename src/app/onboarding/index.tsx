import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import tw from 'twrnc';
import { Container } from '@/components/ui/container';
import { withImageIcon } from '@/lib/with-image-icon';

export default function WelcomeScreen() {
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Welcome' }} />
      <View
        style={tw.style('min-h-screen gap-6', {
          backgroundColor: theme.colors.background,
        })}>
        <Image
          alt="Banner"
          style={tw.style('w-full', { aspectRatio: 2.3 })}
          source={require('@/assets/onboarding/picado-banner.png')}
        />
        <Container style={tw`items-center mt-auto gap-4 mb-10`}>
          <Text
            variant="displayMedium"
            style={tw.style('text-center', { color: theme.colors.primary })}>
            {t('welcome.welcome')}
          </Text>
          <Text
            variant="headlineSmall"
            style={tw.style('text-center', { color: theme.colors.primary })}>
            {t('welcome.chooseLanguage')}
          </Text>
          <Image
            alt="Person holding a passport"
            style={tw.style('h-56', { aspectRatio: 1 })}
            source={require('@/assets/onboarding/person-passport.png')}
          />
          <Button
            icon={withImageIcon(require('@/assets/flags/us.png'))}
            style={tw.style('w-full', { backgroundColor: theme.colors.surface })}
            contentStyle={tw`justify-start`}
            labelStyle={tw`text-2xl`}
            mode="outlined"
            onPress={() => changeLanguage('en')}>
            {t('welcome.selectEnglish')}
          </Button>
          <Button
            icon={withImageIcon(require('@/assets/flags/mx.png'))}
            style={tw.style('w-full', { backgroundColor: theme.colors.surface })}
            contentStyle={tw`justify-start`}
            labelStyle={tw`text-2xl`}
            mode="outlined"
            onPress={() => changeLanguage('es')}>
            {t('welcome.selectSpanish')}
          </Button>
          <Button
            onPress={() => router.push('/onboarding/choose-situation')}
            mode="contained"
            style={tw`w-full`}
            labelStyle={tw`text-2xl`}>
            {t('welcome.next')}
          </Button>
        </Container>
      </View>
    </>
  );
}
