import { createContext, useCallback, useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';

interface Size {
  w: number;
  h: number;
}

interface DragContextType {
  size: MutableRefObject<Size>;
  setSize: (w: number, h: number) => void;
}

const defaultValue: DragContextType = {
  size: { current: { w: 1, h: 1 } },
  setSize: () => {
    throw new Error('no provider');
  },
};

export const DragContext = createContext<DragContextType>(defaultValue);

interface DragContextProviderProps {
  children: React.ReactNode;
}

export const DragContextProvider = ({ children }: DragContextProviderProps) => {
  const size = useRef({ w: 1, h: 1 });

  const setSize = useCallback((w: number, h: number) => {
    size.current = { w, h };
  }, []);

  const DragContextProviderValue = useMemo(
    () => ({ size, setSize }),
    [size, setSize],
  );

  return (
    <DragContext.Provider value={DragContextProviderValue}>
      {children}
    </DragContext.Provider>
  );
};
