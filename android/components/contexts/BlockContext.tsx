import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface BlockContextType {
  blocked: boolean;
  setBlocked: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: BlockContextType = {
  blocked: false,
  setBlocked: () => {},
};

const BlockContext = createContext<BlockContextType>(defaultContextValue);

export const useBlock = () => useContext(BlockContext);

interface BlockProps {
  children: ReactNode;
}

export const BlockProvider: FunctionComponent<BlockProps> = ({children}) => {
  const [blocked, setBlocked] = useState<boolean>(false);

  return (
    <BlockContext.Provider value={{blocked, setBlocked}}>
      {children}
    </BlockContext.Provider>
  );
};
