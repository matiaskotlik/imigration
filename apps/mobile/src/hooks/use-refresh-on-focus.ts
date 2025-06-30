import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';

// https://tanstack.com/query/v5/docs/framework/react/react-native#refresh-on-screen-focus
export const useRefreshOnFocus = <T>(refetch: () => Promise<T>) => {
  const firstTimeRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      void refetch();
    }, [refetch])
  );
};
