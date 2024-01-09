import { useContext } from 'react';
import { Context, State } from '../provider';

const UseStore = () => useContext<State>(Context);

export { UseStore };
