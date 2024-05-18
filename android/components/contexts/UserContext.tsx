import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface User {
  user: string | null;
  authentication: string | null;
}

interface UserContextType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const defaultContextValue: UserContextType = {
  user: {user: null, authentication: null},
  setUser: () => {},
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export const useUser = () => useContext(UserContext);

interface UserProps {
  children: ReactNode;
}

export const UserProvider: FunctionComponent<UserProps> = ({children}) => {
  const [user, setUser] = useState<User>({user: null, authentication: null});

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};
