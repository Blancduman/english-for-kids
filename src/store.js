import { reducer } from './reducer';

let state;
const getState = () => state;
const listeners = [];

const dispatch = (action) => {
  state = reducer(state, action);
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.push(listener);
  return () => {
    listeners.filter((lis) => lis !== listener);
  };
};

dispatch({});

const reducers = () => reducer;

reducers();

export { getState, dispatch, subscribe };
