import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import tw from 'twrnc';

import { Trans } from '@/components/trans';
import { Container } from '@/components/ui/container';

export default function I589WelcomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          title: '',
        }}
      />
      <View style={tw`flex-1`}>
        <SafeAreaView />
        <Container style={tw`flex-1 items-center gap-4`}>
          <MaterialCommunityIcons
            color={theme.colors.primary}
            name='clipboard-edit-outline'
            size={96}
          />
          <Text
            style={tw.style('text-center', { color: theme.colors.primary })}
            variant='displayMedium'
          >
            <Trans i18nKey='i589.welcome.title' />
          </Text>
          <Text
            style={tw.style('text-center', { color: theme.colors.primary })}
            variant='bodyLarge'
          >
            <Trans i18nKey='i589.welcome.description' />
          </Text>
          <Text style={tw`text-center`} variant='bodyLarge'>
            <Trans i18nKey='i589.welcome.privacyDescription' />
          </Text>
          <Button
            labelStyle={tw`text-2xl`}
            mode='contained'
            onPress={() => {
              router.push('./survey');
            }}
            style={tw`mt-auto w-full`}
          >
            <Trans i18nKey='i589.welcome.continue' />
          </Button>
          <Button
            labelStyle={tw`text-base text-gray-500`}
            mode='text'
            onPress={() => {
              router.push('./learn-more');
            }}
          >
            <Trans i18nKey='i589.welcome.learnMore' />
          </Button>
        </Container>
      </View>
    </>
  );
}
