import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  ,
  document.getElementById('root')
);