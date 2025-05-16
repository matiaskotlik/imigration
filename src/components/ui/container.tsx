import { View } from 'react-native';
import { ComponentProps } from 'react';
import tw from 'twrnc';

export function Container({
  style,
  ...props
}: ComponentProps<typeof View>) {
  return <View style={[tw`flex-1 m-4 mb-8`, style]} {...props} />;
}