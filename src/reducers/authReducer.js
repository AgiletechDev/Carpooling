import { types } from '../types/types'

const initState = { checking: true }

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false
      }

    case types.authLogout:
      return { checking: false }

    case types.authCheckingFinish:
      return {
        ...state,
        checking: false
      }
    case types.authUpdate:
      return {
        ...state,
        rol: action.payload.rol,
        data: action.payload
      }

    default:
      return state
  }
}
