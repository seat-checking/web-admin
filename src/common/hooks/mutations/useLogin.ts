import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { LoginResponse } from 'api/lib/auth';
import type { Permission } from 'common/utils/auth';
import type { LoginForm } from 'common/utils/types';
import { AuthApi } from 'api/lib/auth';
import { setAccessToken, setPermissions } from 'common/utils/auth';
import { STORAGE } from 'common/utils/constants';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (loginform: LoginForm) => {
      return AuthApi.signIn(loginform);
    },
    onSuccess: (data: LoginResponse) => {
      const { accessToken, permissionByMenu, storeId, storeName } = data;

      setAccessToken(accessToken);

      const permissions: Permission = JSON.parse(permissionByMenu);
      setPermissions(permissions);

      localStorage.setItem(STORAGE.storeId, String(storeId));
      localStorage.setItem(STORAGE.storeName, storeName);
      // localStorage.setItem(STORAGE.introduction, String(storeId));
      // localStorage.setItem(STORAGE.mainImage, String(storeId));

      navigate('/');
    },
  });
};
