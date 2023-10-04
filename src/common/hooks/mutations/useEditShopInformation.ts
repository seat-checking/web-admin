import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { EditShopInformationRequest } from 'api/shop/types';
import { editShopInformation } from 'api/shop';

export const useEditShopInformation = () => {
  return useMutation({
    mutationFn: (params: EditShopInformationRequest) => {
      return editShopInformation(params);
    },
    onSuccess: () => {
      toast.success('변경사항이 성공적으로 저장되었습니다.');
    },
  });
};
