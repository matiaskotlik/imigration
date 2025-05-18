import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export function AppStack() {
  const theme = useTheme();
  return (
    <>
      <StatusBar style='light' translucent={false} backgroundColor={theme.colors.primary} />
      <Stack
        screenOptions={{
          headerTitleStyle: { color: theme.colors.onPrimary },
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTransparent: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      />
    </>
  );
}
