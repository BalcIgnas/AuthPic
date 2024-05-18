import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FunctionComponent,
  Dispatch,
  SetStateAction,
} from 'react';

interface GridItem {
  id: string;
  path: any;
  row: number;
  col: number;
}

interface GridItemsContextType {
  gridItems: GridItem[];
  setGridItems: Dispatch<SetStateAction<GridItem[]>>;
}

const defaultContextValue: GridItemsContextType = {
  gridItems: [],
  setGridItems: () => {},
};

const GridItemsContext =
  createContext<GridItemsContextType>(defaultContextValue);

export const useGridItems = () => useContext(GridItemsContext);

interface GridProps {
  children: ReactNode;
}

export const GirdItemsProvider: FunctionComponent<GridProps> = ({children}) => {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);

  return (
    <GridItemsContext.Provider value={{gridItems, setGridItems}}>
      {children}
    </GridItemsContext.Provider>
  );
};
