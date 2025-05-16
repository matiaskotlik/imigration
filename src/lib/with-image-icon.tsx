import { Image } from 'expo-image';

export const withImageIcon = (iconSource: any) => (function ImageIcon({ size }: { size: number }) {
  return (
    <Image
      source={iconSource}
      style={{
        width: size,
        height: size,
      }}
      contentFit="contain"
    />
  );
})