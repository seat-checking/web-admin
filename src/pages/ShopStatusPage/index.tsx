import { useGetShops } from 'common/hooks/queries/useGetShops';
import { useSearchEmail } from 'common/hooks/queries/useSearchEmail';

/**
 * 가게 현황 컴포넌트
 */
export const ShopStatusPage: React.FC = () => {
  const { data: shops } = useGetShops(); // TODO: 500번 에러로 담겨서 옴
  console.log('shops :>> ', shops);

  const { data: email } = useSearchEmail();
  console.log('email :>> ', email);

  return <div>ShopStatusPage 루트경로</div>;
};
