import { useLayoutEffect, useRef, useState } from 'react';
import { View } from 'react-native';

export const useLoader = (timeout: number = 100) => {
  const [loading, setLoading] = useState(true);

  const ref = useRef<View>(null);
  const loadingRef = useRef<View>(null);

  useLayoutEffect(() => {
    ref.current?.setNativeProps({ opacity: 0 });
    loadingRef.current?.setNativeProps({ opacity: 1 });

    if (loading) return;

    const timeout = setTimeout(() => {
      ref.current?.setNativeProps({ opacity: 1 });
      loadingRef.current?.setNativeProps({ opacity: 0 });
    }, 100);

    return () => clearTimeout(timeout);
  }, [loading]);

  return {
    ref,
    loadingRef,
    loading,
    setLoading,
  };
};
