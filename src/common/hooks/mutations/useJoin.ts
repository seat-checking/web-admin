import { useMutation } from '@tanstack/react-query';
import type { JoinForm } from 'common/utils/types';
import { AuthApi } from 'api/lib/auth';

export const useJoin = () => {
  return useMutation({
    mutationFn: (joinForm: JoinForm) => {
      return AuthApi.signUp(joinForm);
    },
  });
};
