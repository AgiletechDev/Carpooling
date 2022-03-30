import React from 'react';

import { AppRouter } from './routers/AppRouter';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import { store } from './store/store';
import { Provider } from 'react-redux';

export const App = () => {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
};
