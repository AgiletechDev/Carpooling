import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { tripReducer } from './viajesReducer'

export const rootReducer = combineReducers({
  trip: tripReducer,
  auth: authReducer
})
