import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { LoginResponse } from 'api/lib/auth';
import type { Permission } from 'common/utils/auth';
import type { LoginForm } from 'common/utils/types';
import { AuthApi } from 'api/lib/auth';
import { useAuthActions } from 'common/stores/authStore';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAccessToken, setPermissions, setSelectedShop } = useAuthActions();

  return useMutation({
    mutationFn: (loginform: LoginForm) => {
      return AuthApi.signIn(loginform);
    },
    onSuccess: (data: LoginResponse) => {
      const {
        accessToken,
        permissionByMenu,
        storeId,
        storeName,
        mainImage,
        introduction,
      } = data;

      setAccessToken(accessToken);

      const permissions: Permission = JSON.parse(permissionByMenu);
      setPermissions(permissions);

      setSelectedShop({ storeId, storeName, mainImage, introduction });

      navigate('/');
    },
  });
};
