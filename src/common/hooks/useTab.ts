import { useCallback, useState } from 'react';

interface Return {
  activeTab: number;
  changeTab: (index: number) => void;
}

export const useTab = (): Return => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  return { activeTab, changeTab };
};
