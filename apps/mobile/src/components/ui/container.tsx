import { View } from 'react-native';
import { ComponentProps } from 'react';
import tw from 'twrnc';

export function Container({ style, ...props }: ComponentProps<typeof View>) {
  return <View style={[tw`m-6 mb-8 flex-1`, style]} {...props} />;
}
