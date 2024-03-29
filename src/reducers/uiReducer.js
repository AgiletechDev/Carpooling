import { types } from '../types/types'

const initialState = {
  showEditar: false,
  showDetalles: false,
  showSolicitudes: false,
  showNotifications: false
}

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenModalDetalles:
      return {
        ...state,
        showDetalles: true
      }

    case types.uiCloseModalDetalles:
      return {
        ...state,
        showDetalles: false
      }

    case types.uiOpenModalEditar:
      return {
        ...state,
        showEditar: true
      }

    case types.uiCloseModalEditar:
      return {
        ...state,
        showEditar: false
      }

    case types.uiOpenModalSolicitudes:
      return {
        ...state,
        showSolicitudes: true
      }

    case types.uiCloseModalSolicitudes:
      return {
        ...state,
        showSolicitudes: false
      }

    case types.uiOpenNotifications:
      return {
        ...state,
        showNotifications: true
      }

    case types.uiCloseNotifcations:
      return {
        ...state,
        showNotifications: false
      }

    default:
      return state
  }
}
