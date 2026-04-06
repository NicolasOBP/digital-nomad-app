import { useState } from "react";

type UseAppMutationReturn<TData, TVariables> = {
  mutate: (variable: TVariables) => Promise<TData | void>;
  isLoading: boolean;
  error: unknown;
};

type UseAppMutationParams<TData, TVariables> = {
  mutateFn: (variable: TVariables) => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (data: unknown) => void;
};

export function useAppMutation<TData, TVariables>({
  mutateFn,
  onError,
  onSuccess,
}: UseAppMutationParams<TData, TVariables>): UseAppMutationReturn<
  TData,
  TVariables
> {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  async function mutate(variables: TVariables) {
    try {
      setIsLoading(true);
      setError(null);

      const data = await mutateFn(variables);

      onSuccess?.(data);
    } catch (error) {
      onError?.(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { mutate, isLoading, error };
}
