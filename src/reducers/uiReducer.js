import { types } from '../types/types'

const initialState = {
  showEditar: false,
  showDetalles: false
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

    default:
      return state
  }
}
