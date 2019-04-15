import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import { hashHistory } from 'react-router';

import createFetchMiddleware from 'redux-composable-fetch';
import ThunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import DevTools from './DevTools';
import ownHttpMiddleware from './httpMiddleware'

const FetchMiddleware = createFetchMiddleware({
  afterFetch({ action, result }) {
    if (result.status !== 200) {
      return result.text().then(data => {
        console.log('error')
        return Promise.reject(123)
      })
    }
    return result.json().then(data => {
      return Promise.resolve({
        action,
        result: data
      });
    });
  },
});

const finalCreateStore = compose(
  applyMiddleware(ThunkMiddleware, FetchMiddleware, ownHttpMiddleware),
  DevTools.instrument()
)(createStore);

const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routerReducer,
}));

export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState);

  return store;
}
