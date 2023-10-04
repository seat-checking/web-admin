import { useMutation } from '@tanstack/react-query';
import type { EditShopInformationRequest } from 'api/shop/types';
import { editShopInformation } from 'api/shop';

export const useEditShopInformation = () => {
  return useMutation({
    mutationFn: (params: EditShopInformationRequest) => {
      return editShopInformation(params);
    },
  });
};
