import { useQuery } from '@tanstack/react-query';
import { AuthApi } from 'api/lib/auth';

export const useSearchEmail = () => {
  return useQuery({
    queryKey: ['search'],
    queryFn: AuthApi.searchTest,
  });
};
