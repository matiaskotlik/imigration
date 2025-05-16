import { Stack } from 'expo-router';
import tw from 'twrnc';
import { useTheme } from 'react-native-paper';

export function AppStack() {
  const theme = useTheme();
  return (
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
  );
}
