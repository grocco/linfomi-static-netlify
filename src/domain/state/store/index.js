

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import window from 'domain/window';
import reducers from '../reducers';

const composeEnhancers = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;