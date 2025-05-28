import { createRequiredContext, useRequiredContext } from '@/lib/required-context';
import { createStore, StoreApi } from 'zustand/index';
import { useStore } from 'zustand';
import { PropsWithChildren, useState } from 'react';

interface SurveyState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

function buildSurveyStore() {
  return createStore<SurveyState>((set) => ({
    isLoading: false,
    setLoading: (loading: boolean) => set({ isLoading: loading }),
  }));
}

const SurveyContext = createRequiredContext<StoreApi<SurveyState>>();

export function SurveyProvider({ children }: PropsWithChildren) {
  const [store] = useState(() => buildSurveyStore());
  return <SurveyContext.Provider value={store}>{children}</SurveyContext.Provider>;
}

export const useIsLoading = () =>
  useStore(useRequiredContext(SurveyContext), (state) => state.isLoading);
export const useSetLoading = () =>
  useStore(useRequiredContext(SurveyContext), (state) => state.setLoading);
