import { Stack, useRouter } from 'expo-router';
import { Button, Text, useTheme } from 'react-native-paper';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import tw from 'twrnc';
import { Container } from '@/components/ui/container';
import { withImageIcon } from '@/lib/with-image-icon';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';

export default function I589WelcomeScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
      <View style={tw`flex-1`}>
        <Image
          alt="Banner"
          style={tw.style('w-full', { aspectRatio: 4 })}
          source={require('@/assets/onboarding/usa-banner-2.png')}
        />
        <Container style={tw`flex-1 items-center gap-4`}>
          <Text
            variant="displayMedium"
            style={tw.style('text-center', { color: theme.colors.primary })}>
            {t('situation.whichDescribesYou')}
          </Text>
          <Button
            mode="contained"
            style={tw`w-full mt-auto`}
            labelStyle={tw`text-2xl`}>
            {t('situation.next')}
          </Button>
        </Container>
      </View>
    </>
  );
}
