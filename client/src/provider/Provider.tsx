import { FC, ReactNode, createContext } from 'react';
import { Store, store } from '../store';

interface State {
  store: Store;
}

interface Props {
  children: ReactNode;
}

const Context = createContext<State>({ store });

const Provider: FC<Props> = ({ children }) => {
  return <Context.Provider value={{ store }}>{children}</Context.Provider>;
};

export { Provider, Context };
export type { State };
