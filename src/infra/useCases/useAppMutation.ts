import { useMutation } from "@tanstack/react-query";

type UseAppMutationReturn<TData, TVariables> = {
  mutate: (variable: TVariables) => TData | void;
  isPending: boolean;
  error: unknown;
};

export type UseAppMutationOptions<TData> = {
  onSuccess?: (data: TData) => void;
  onError?: (data: unknown) => void;
};

type UseAppMutationParams<TData, TVariables> = {
  mutationFn: (variable: TVariables) => Promise<TData>;
} & UseAppMutationOptions<TData>;

export function useAppMutation<TData, TVariables>({
  mutationFn,
  onError,
  onSuccess,
}: UseAppMutationParams<TData, TVariables>): UseAppMutationReturn<
  TData,
  TVariables
> {
  const { mutate, error, isPending } = useMutation({
    mutationFn: mutationFn,
    onSuccess,
    onError,
  });

  return { mutate, isPending, error };
}
