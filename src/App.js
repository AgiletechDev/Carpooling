import React from 'react'
import { Provider } from 'react-redux'

import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import 'react-datepicker/dist/react-datepicker.css'

export const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}
