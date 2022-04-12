import { types } from '../types/types'

const initState = { notifications: [] }

export const notifyReducer = (state = initState, action) => {
  switch (action.type) {
    case types.notifyLoad:
      return {
        ...state,
        notifications: [...action.payload]
      }

    case types.notifyAdd:
      return {
        ...state,
        notifications: [...state.notifications, ...action.payload]
      }

    default:
      return state
  }
}
