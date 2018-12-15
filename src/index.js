import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/index.scss';
import App from './components/App/App';
import { Provider } from 'react-redux';
import request from './services/request';
import config from './config';

if (process.env.REACT_APP_ENV !== 'production' && process.env.REACT_APP_WHYUPDATE === 'true') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

(process.env.REACT_APP_ENV === 'production' ? import('./store/configureStore.prod') : import('./store/configureStore.dev'))
  .then( async ({ default: configureStore }) => {
    const store = configureStore();
    window.store = store;

    if (config.apiUrl) {
      request.setApiUrl(config.apiUrl);
    } else {
      const { apiUrl } = await request.makeExternalRequest('get', '/api/config');
      request.setApiUrl(apiUrl);
    }

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
  });
