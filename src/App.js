import React from 'react'
import { Provider } from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'

import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'

moment.locale('es')

export const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}
