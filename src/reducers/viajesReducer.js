import { types } from '../types/types'

const initialState = {
  viajes: [],
  activeViaje: null
}

export const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.viajesCreate:
      return {
        ...state,
        viajes: [...state.viajes, action.payload]
      }

    case types.viajesLoad:
      return {
        ...state,
        viajes: [...action.payload]
      }

    default:
      return state
  }
}
