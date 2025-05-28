import { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';

export const useContentLoader = (timeout: number = 100) => {

  return {
    handleReactRender,
    handleContentRender,
    contentRef,
    loadingRef,
  };
};
