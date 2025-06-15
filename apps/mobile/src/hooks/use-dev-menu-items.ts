import { isDevelopmentBuild, registerDevMenuItems } from 'expo-dev-client';
import { useCallback, useEffect } from 'react';
import { useMMKVObject } from 'react-native-mmkv';

interface DevMenuItem {
  callback?: () => void;
  key: string;
  title: string;
}

const ITEMS: DevMenuItem[] = [] as const;

const useDevMenuItems = () => {
  return useMMKVObject<Record<string, boolean>>('dev-menu-items');
};

export const useRegisterDevMenuItems = () => {
  const [value, setValue] = useDevMenuItems();

  const register = useCallback(
    () =>
      registerDevMenuItems(
        ITEMS.map((item) => {
          return {
            callback: () => {
              setValue((prevValue) => {
                return {
                  ...prevValue,
                  [item.key]: !prevValue?.[item.key],
                };
              });
              item.callback?.();
            },
            name: `${item.title} (${value?.[item.key] ? 'enabled' : 'disabled'})`,
            shouldCollapse: true,
          };
        })
      ),
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
