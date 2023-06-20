import type { UseFormRegister } from 'react-hook-form';

export type JoinStatus = 'FIRST' | 'SECOND';

export interface InnerPageProps {
  onClickNext: (status: JoinStatus) => void;
  register: UseFormRegister<any>;
}
