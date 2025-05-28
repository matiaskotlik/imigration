import { Stack, useRouter } from 'expo-router';
import { Button, Text, useTheme } from 'react-native-paper';
import tw from 'twrnc';
import { Container } from '@/components/ui/container';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView, useWindowDimensions, View } from 'react-native';
import { Trans } from '@/components/Trans';
import { Confetti } from 'react-native-fast-confetti';

export default function I589CompleteScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { height, width } = useWindowDimensions();

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
      <Confetti
        autoplay={true}
        isInfinite={false}
        count={300}
        verticalSpacing={60}
        sizeVariation={0.3}
        blastDuration={600}
        fallDuration={3000}
        cannonsPositions={[
          { x: -30, y: height },
          { x: width + 30, y: height },
        ]}
      />
      <View style={tw`flex-1`}>
        <SafeAreaView />
        <Container style={tw`flex-1 items-center gap-4`}>
          <MaterialCommunityIcons name="party-popper" size={96} color={theme.colors.primary} />
          <Text
            variant="displayMedium"
            style={tw.style('text-center', { color: theme.colors.primary })}>
            <Trans i18nKey="i589.complete.title" />
          </Text>
          <Text
            variant="bodyLarge"
            style={tw.style('text-center', { color: theme.colors.primary })}>
            <Trans i18nKey="i589.complete.description" />
          </Text>
          <Text variant="bodyLarge" style={tw`text-center`}>
            <Trans i18nKey="i589.complete.privacyDescription" />
          </Text>
          <Button
            mode="contained"
            style={tw`w-full mt-auto`}
            labelStyle={tw`text-2xl`}
            onPress={() => router.push('/i589/survey')}>
            <Trans i18nKey="i589.complete.continue" />
          </Button>
          <Button
            mode="text"
            onPress={() => router.push('/i589/learn-more')}
            labelStyle={tw`text-base text-gray-500`}>
            <Trans i18nKey="i589.complete.learnMore" />
          </Button>
        </Container>
      </View>
    </>
  );
}
