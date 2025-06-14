import { Stack, useRouter } from 'expo-router';
import { Button, Text, useTheme } from 'react-native-paper';
import tw from 'twrnc';
import { Container } from '@/components/ui/container';
import { SafeAreaView, useWindowDimensions, View } from 'react-native';
import { Trans } from '@/components/trans';
import { Confetti } from 'react-native-fast-confetti';
import { FontAwesome } from '@expo/vector-icons';

export default function I589CompleteScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { height, width } = useWindowDimensions();

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          title: '',
        }}
      />
      <Confetti
        autoplay={true}
        blastDuration={600}
        cannonsPositions={[
          { x: -30, y: height },
          { x: width + 30, y: height },
        ]}
        count={300}
        fallDuration={3000}
        isInfinite={false}
        sizeVariation={0.3}
        verticalSpacing={60}
      />
      <View style={tw`flex-1`}>
        <SafeAreaView />
        <Container style={tw`flex-1 items-center gap-8`}>
          <FontAwesome
            name='check-circle'
            size={96}
            style={tw`text-green-500`}
          />
          <Text
            style={tw.style('text-center', { color: theme.colors.primary })}
            variant='displayMedium'
          >
            <Trans i18nKey='i589.complete.title' />
          </Text>
          <Text style={tw`text-center`} variant='titleLarge'>
            <Trans i18nKey='i589.complete.message' />
          </Text>
          <Button
            labelStyle={tw`text-2xl`}
            mode='contained'
            onPress={() => {
              router.dismissAll();
              router.replace('/documents');
            }}
            style={tw`mt-auto w-full`}
          >
            <Trans i18nKey='i589.complete.continue' />
          </Button>
        </Container>
      </View>
    </>
  );
}
