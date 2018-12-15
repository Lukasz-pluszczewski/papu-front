import { createStore, compose, applyMiddleware } from 'redux';
import reduxBetterPromise from './middleware/reduxBetterPromise';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middlewares = [
    reduxBetterPromise,
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
  ));
}