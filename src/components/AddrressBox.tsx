interface AddrressBoxProps {
  text: string | number;
  func: () => void;
}

/**
 * 컴포넌트
 */
export const AddrressBox: React.FC<AddrressBoxProps> = ({ text, func }) => {
  return (
    <button type='button' onClick={func}>
      {text}
    </button>
  );
};
