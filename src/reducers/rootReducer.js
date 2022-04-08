import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { tripReducer } from './tripReducer'
import { uiReducer } from './uiReducer'
import { notifyReducer } from './notifyReducer'

export const rootReducer = combineReducers({
  trip: tripReducer,
  auth: authReducer,
  ui: uiReducer,
  notify: notifyReducer
})
