import {SplashScreen} from 'expo-router';
import { PropsWithChildren, useCallback, useEffect } from 'react';
import {View} from 'react-native';
import tw from 'twrnc';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export function SplashScreenBarrier({ children }: PropsWithChildren) {
  // hide splashscreen after this component mounts to avoid a blank screen flash
  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return children;
}
