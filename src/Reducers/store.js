import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { resources } from './ResourceReducer';
import { search } from './SearchReducer';
import { userReducer } from './UserReducer';

const reduxDevTool = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';

const rootReducer = combineReducers({
  resources,
  search,
  userReducer
});

const isNonProd = process.env.NODE_ENV !== 'production';

const middlewares = [thunk];
if (isNonProd) {
  middlewares.push(logger);
}

const composeEnhancers =
  (typeof window === 'object' && isNonProd && window[reduxDevTool]) || compose;

console.log('middlewares', middlewares);
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, enhancer); // capplyMiddleware(...middlewares));
