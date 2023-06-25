export type JoinStatus = 'FIRST' | 'SECOND';

export interface InnerPageProps {
  onClickNext: (status: JoinStatus) => void;
}
