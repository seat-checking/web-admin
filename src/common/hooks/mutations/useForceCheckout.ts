import { useMutation, useQueryClient } from '@tanstack/react-query';
import { forceCheckout } from 'api/lib/reservations';

export const useForceCheckout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chairId: number) => {
      return forceCheckout(chairId);
    },
    onSuccess: () => {
      // TODO api 수정 후 작동 확인해야 함
      // queryClient.invalidateQueries([queryKeys.GET_CURRENTLY_IN_USE, spaceId]);
    },
  });
};
