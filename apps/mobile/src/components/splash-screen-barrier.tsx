import { SplashScreen } from 'expo-router';
import { PropsWithChildren, useCallback } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

// Keep the splash screen visible while we fetch resources
void SplashScreen.preventAutoHideAsync();

export function SplashScreenBarrier({ children }: PropsWithChildren) {
  // hide splashscreen after this component mounts to avoid a blank screen flash
  const handleLayout = useCallback(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View onLayout={handleLayout} style={tw`flex-1`}>
      {children}
    </View>
  );
}
