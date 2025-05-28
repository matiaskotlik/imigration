import { isDevelopmentBuild, registerDevMenuItems } from 'expo-dev-client';
import { useCallback, useEffect } from 'react';
import { useMMKVObject } from 'react-native-mmkv';

type DevMenuItem = {
  key: string;
  title: string;
  callback?: () => void;
};

const ITEMS: DevMenuItem[] = [] as const;

const useDevMenuItems = () => {
  return useMMKVObject<{ [key: string]: boolean }>('dev-menu-items');
};

export const useRegisterDevMenuItems = () => {
  const [value, setValue] = useDevMenuItems();

  const register = useCallback(
    () =>
      registerDevMenuItems([
        ...ITEMS.map((item) => {
          return {
            name: `${item.title} (${value?.[item.key] ? 'enabled' : 'disabled'})`,
            shouldCollapse: true,
            callback: () => {
              setValue((prevValue) => {
                return {
                  ...prevValue,
                  [item.key]: !prevValue?.[item.key],
                };
              });
              item.callback?.();
            },
          };
        }),
      ]),
    [value, setValue]
  );

  useEffect(() => {
    if (!isDevelopmentBuild()) {
      return;
    }

    void register();
  }, [register]);
};

export const useDevMenuItem = (key: (typeof ITEMS)[number]['key']) => {
  const [value] = useDevMenuItems();

  return value?.[key] ?? false;
};
