import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import tw from 'twrnc';
import { Container } from '@/components/ui/container';
import { useState } from 'react';

const situations = {
  border: {
    iconSource: require('@/assets/icons/passport.png'),
    href: '/i589/welcome',
  },
  family: {
    iconSource: require('@/assets/icons/family.png'),
    href: '/i589/welcome',
  },
  workStudy: {
    iconSource: require('@/assets/icons/briefcase.png'),
    href: '/i589/welcome',
  },
  renewStatus: {
    iconSource: require('@/assets/icons/calendar.png'),
    href: '/i589/welcome',
  },
} as const;

export default function SituationScreen() {
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [selectedSituation, setSelectedSituation] = useState<keyof typeof situations | null>(null);

  return (
    <>
      <Stack.Screen
        options={{
          title: t('situation.screenTitle'),
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTitleStyle: { color: theme.colors.onPrimary },
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
          {Object.entries(situations).map(([situation, { iconSource, href }]) => (
            <Button
              key={situation}
              onPress={() => setSelectedSituation(situation as keyof typeof situations)}
              mode="outlined"
              style={tw.style('w-full border-2', {
                borderColor:
                  selectedSituation === situation
                    ? theme.colors.secondary
                    : theme.colors.surfaceDisabled,
                backgroundColor: theme.colors.surface,
              })}
              contentStyle={tw`h-20`}
              labelStyle={tw`flex-1`}>
              <View style={tw`flex-1 flex-row items-center justify-start gap-2`}>
                <View style={tw``}>
                  <Image
                    style={tw.style('flex-1', { aspectRatio: 1 })}
                    contentFit="contain"
                    source={iconSource}
                  />
                </View>
                <Text
                  style={tw.style(
                    'flex-1 text-xl',
                    selectedSituation === situation && 'font-medium'
                  )}>
                  {t(`situation.${situation}`)}
                </Text>
              </View>
            </Button>
          ))}
          <Button
            disabled={!selectedSituation}
            onPress={() => router.push(situations[selectedSituation!].href)}
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
