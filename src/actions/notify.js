import { fetchConToken } from '../helpers/fetch'
import { types } from '../types/types'

export const startLoadingNotifications = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('notificaciones/')
      const body = await resp.json()
      dispatch(loadNotifications(body.notificaciones))
    } catch (error) {
      console.log(error)
    }
  }
}

const loadNotifications = (notificaciones) => ({
  type: types.notifyLoad,
  payload: notificaciones
})

export const addNotification = (notify) => ({
  type: types.notifyAdd,
  payload: notify
})
