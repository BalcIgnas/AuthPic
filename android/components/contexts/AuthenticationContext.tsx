import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface AuthenticationContextType {
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const defaultContextValue: AuthenticationContextType = {
  authenticated: false,
  setAuthenticated: () => {},
};

const AuthenticationContext =
  createContext<AuthenticationContextType>(defaultContextValue);

export const useAuthentication = () => useContext(AuthenticationContext);

interface AuthenticationProps {
  children: ReactNode;
}

export const AuthenticationProvider: FunctionComponent<AuthenticationProps> = ({
  children,
}) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  return (
    <AuthenticationContext.Provider value={{authenticated, setAuthenticated}}>
      {children}
    </AuthenticationContext.Provider>
  );
};
