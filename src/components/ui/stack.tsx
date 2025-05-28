import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export function AppStack() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    />
  );
}
