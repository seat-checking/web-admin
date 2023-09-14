import { useMutation } from '@tanstack/react-query';
import { editShopInformation } from 'api/shop';

export const useEditShopInformation = () => {
  return useMutation({
    mutationFn: (mainImage: File[]) => {
      return editShopInformation(mainImage);
    },
  });
};
