import { types } from '../types/types'

const initialState = {
  viajes: [],
  activeViaje: null,
  busqueda: [],
  listaEspera: []
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

    case types.viajesLoadLista:
      return {
        ...state,
        listaEspera: [...action.payload]
      }

    case types.viajesClear:
      return {
        viajes: [],
        activeViaje: null,
        busqueda: [],
        listaEspera: []
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

    case types.viajesGuardar:
      return {
        ...state,
        busqueda: [...action.payload]
      }

    case types.viajesSolicitarUnirse:
      return {
        ...state,
        listaEspera: [...state.listaEspera, action.payload],
        busqueda: state.busqueda.filter(
          (viaje) => viaje.uid !== action.payload.uid
        )
      }

    case types.viajesCancelarSolicitud:
      return {
        ...state,
        listaEspera: state.listaEspera.filter(
          (viaje) => viaje.uid !== action.payload
        )
      }

    case types.viajesConfirmar:
      return {
        ...state,
        viajes: state.viajes.map((viaje) => {
          if (viaje.uid === action.payload.uid) {
            viaje.asientos = action.payload.asientos
            viaje.listaespera = action.payload.listaespera
            viaje.pasajeros = action.payload.pasajeros
          }
          return viaje
        }),
        activeViaje: action.payload
      }

    default:
      return state
  }
}
