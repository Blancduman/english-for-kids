import { reducer } from "./reducer";

let state;
const getState = () => state;
const listeners = [];

const dispatch = action => {
  state = reducer(state, action);
  console.log(state);
  listeners.forEach(listener => listener());
};

const subscribe = listener => {
  listeners.push(listener);
  return () => {
    listeners.filter(lis => lis !== listener);
  };
};

dispatch({});

const reducers = () => reducer;

reducers(); //getting the reducers

function Async(cb, request) {
  request(cb);
}
//helps to do async things
const thunk = function(cb, request, delay) {
  if (delay) {
    return setTimeout(() => {
      Async(cb, request);
    }, delay);
  }
  Async(cb, request);
};

export { getState, dispatch, thunk, subscribe };
