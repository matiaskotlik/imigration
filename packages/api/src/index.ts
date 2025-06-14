import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import type { AppRouter } from '@/root';

/**
 * Inference helpers for input types
 * @example
 * type documentByIdInput = RouterInputs['document']['byId']
 *      ^? { id: number }
 **/
type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example
 * type AllDocumentsOutput = RouterOutputs['document']['all']
 *      ^? document[]
 **/
type RouterOutputs = inferRouterOutputs<AppRouter>;

export type { RouterInputs, RouterOutputs };

export { appRouter, type AppRouter } from '@/root';
export { type TRPCContext } from '@/trpc';
