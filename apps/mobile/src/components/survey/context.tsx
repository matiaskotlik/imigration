import { PropsWithChildren, useState } from 'react';
import { createStore, StoreApi, useStore } from 'zustand/index';

import {
  createRequiredContext,
  useRequiredContext,
} from '@/hooks/use-required-context';

interface SurveyState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

function buildSurveyStore() {
  return createStore<SurveyState>((set) => ({
    isLoading: false,
    setLoading: (loading: boolean) => {
      set({ isLoading: loading });
    },
  }));
}

const SurveyContext = createRequiredContext<StoreApi<SurveyState>>();

export function SurveyProvider({ children }: PropsWithChildren) {
  const [store] = useState(() => buildSurveyStore());
  return (
    <SurveyContext.Provider value={store}>{children}</SurveyContext.Provider>
  );
}

export const useIsLoading = () =>
  useStore(useRequiredContext(SurveyContext), (state) => state.isLoading);
export const useSetLoading = () =>
  useStore(useRequiredContext(SurveyContext), (state) => state.setLoading);
