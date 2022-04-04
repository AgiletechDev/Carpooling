import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { tripReducer } from './tripReducer'
import { uiReducer } from './uiReducer'

export const rootReducer = combineReducers({
  trip: tripReducer,
  auth: authReducer,
  ui: uiReducer
})
