import { Image, ImageProps } from 'expo-image';

export const withImageIcon = (iconSource: ImageProps['source']) =>
  function ImageIcon({ size }: { size: number }) {
    return (
      <Image
        contentFit='contain'
        source={iconSource}
        style={{
          height: size,
          width: size,
        }}
      />
    );
  };
