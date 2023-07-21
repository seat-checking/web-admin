import type { JoinFormInputs } from 'common/utils/types';
import type { UseFormReturn } from 'react-hook-form';

export type JoinStatus = 'FIRST' | 'SECOND';

export interface InnerPageProps {
  onClickNext: (status: JoinStatus) => void;
  useJoinForm: UseFormReturn<JoinFormInputs>;
}
