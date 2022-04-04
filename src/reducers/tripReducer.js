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

    case types.viajesClear:
      return {
        viajes: [],
        activeViaje: null
      }

    case types.viajesSetActive:
      return {
        ...state,
        activeViaje: action.payload
      }

    case types.viajesClearActive:
      return {
        ...state,
        activeViaje: null
      }

    case types.viajesDelete:
      return {
        ...state,
        viajes: state.viajes.filter((viaje) => viaje.uid !== action.payload),
        activeViaje: null
      }

    default:
      return state
  }
}
