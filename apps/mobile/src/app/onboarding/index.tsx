import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import tw from 'twrnc';

import mxFlag from '@/assets/flags/mx.png';
import usFlag from '@/assets/flags/us.png';
import personPassport from '@/assets/onboarding/person-passport.png';
import banner from '@/assets/onboarding/usa-banner.png';
import { Container } from '@/components/ui/container';
import { withImageIcon } from '@/lib/with-image-icon';

export default function WelcomeScreen() {
  const { i18n, t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: 'transparent', // need to override the default header color
          },
          headerTransparent: true,
          title: '',
        }}
      />
      <View style={tw`flex-1`}>
        <Image
          alt='Banner'
          source={banner}
          style={tw.style('w-full', { aspectRatio: 2 })}
        />
        <Container style={tw`flex-1 items-center gap-4`}>
          <Text
            style={tw.style('text-center', { color: theme.colors.primary })}
            variant='displayMedium'
          >
            {t('welcome.title')}
          </Text>
          <Text
            style={tw.style('text-center', { color: theme.colors.primary })}
            variant='headlineSmall'
          >
            {t('welcome.chooseLanguage')}
          </Text>
          <Image
            alt='Person holding a passport'
            source={personPassport}
            style={tw.style('mt-auto h-56', { aspectRatio: 1 })}
          />
          <Button
            contentStyle={tw`justify-start`}
            icon={withImageIcon(usFlag)}
            labelStyle={tw`text-2xl`}
            mode='outlined'
            onPress={() => i18n.changeLanguage('en')}
            style={tw.style('w-full', {
              backgroundColor: theme.colors.surface,
            })}
          >
            {t('welcome.selectEnglish')}
          </Button>
          <Button
            contentStyle={tw`justify-start`}
            icon={withImageIcon(mxFlag)}
            labelStyle={tw`text-2xl`}
            mode='outlined'
            onPress={() => i18n.changeLanguage('es')}
            style={tw.style('w-full', {
              backgroundColor: theme.colors.surface,
            })}
          >
            {t('welcome.selectSpanish')}
          </Button>
          <Button
            labelStyle={tw`text-2xl`}
            mode='contained'
            onPress={() => {
              router.push('/onboarding/choose-situation');
            }}
            style={tw`w-full`}
          >
            {t('welcome.next')}
          </Button>
        </Container>
      </View>
    </>
  );
}
