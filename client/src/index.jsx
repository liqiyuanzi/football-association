/*x*/
import React from "react";
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory,IndexRoute,IndexRedirect } from 'react-router'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware } from 'redux';
import reducer from 'reducers/index';

import Routers from "routers"

const _store = createStore(
  reducer,
  applyMiddleware(thunk)
);
window._STORE_ = _store;

ReactDOM.render(
	<Provider store={_store}>
		<Routers />
	</Provider>
	, document.getElementById("content")
)