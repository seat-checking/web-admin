import { useGetShops } from 'common/hooks/queries/useGetShops';

/**
 * 가게 현황 컴포넌트
 */
export const ShopStatusPage: React.FC = () => {
  const { data } = useGetShops();
  console.log('data :>> ');
  return <div>ShopStatusPage 루트경로</div>;
};
