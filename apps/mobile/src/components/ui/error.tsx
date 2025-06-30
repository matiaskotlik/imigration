'use client';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ErrorBoundaryProps } from 'expo-router';
import { SafeAreaView, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import tw from 'twrnc';

import { Trans } from '@/components/trans';
import { Container } from '@/components/ui/container';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  const theme = useTheme();

  return (
    <View style={tw`flex-1`}>
      <SafeAreaView />
      <Container style={tw`flex-1 items-center justify-center gap-8`}>
        <MaterialCommunityIcons
          color={theme.colors.error}
          name='alert-circle'
          size={72}
        />

        <Text style={tw`text-center`} variant='headlineSmall'>
          <Trans i18nKey='error.title' />
        </Text>

        <Text style={tw`text-center`} variant='bodyLarge'>
          <Trans i18nKey='error.message' values={{ message: error.message }} />
        </Text>

        <Button mode='text' onPress={retry}>
          Try again?
        </Button>
      </Container>
    </View>
  );
}
