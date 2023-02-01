import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { store } from './src/store/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
