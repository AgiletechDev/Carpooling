import Swal from 'sweetalert2'
import { fetchConToken } from '../helpers/fetch'
import { prepareViajes } from '../helpers/prepareViajes'
import { types } from '../types/types'

export const startGetViajes = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('viajes/misviajes')
      const body = await resp.json()
      const viajes = prepareViajes(body.viajes)
      dispatch(loadViajes(viajes))
    } catch (error) {
      console.log(error)
    }
  }
}

const loadViajes = (viajes) => ({
  type: types.viajesLoad,
  payload: viajes
})

export const startCrearViaje = (viaje) => {
  return async (dispatch, getState) => {
    const { uid, rol } = getState().auth
    viaje.owner = uid
    viaje.rol = rol
    const resp = await fetchConToken('viajes/', viaje, 'POST')
    const body = await resp.json()
    if (body.ok) {
      dispatch(crearViaje(body.viaje))
      Swal.fire('Success', 'Viaje creado', 'success')
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

const crearViaje = (viaje) => ({
  type: types.viajesCreate,
  payload: viaje
})

export const clearViajes = () => ({
  type: types.viajesClear
})

export const setActiveViaje = (viaje) => ({
  type: types.viajesSetActive,
  payload: viaje
})

export const clearActiveViaje = () => ({
  type: types.viajesClearActive
})

export const startDeleteViaje = () => {
  return async (dispatch, getState) => {
    const { activeViaje } = getState().trip
    const { uid } = activeViaje
    const resp = await fetchConToken(`viajes/${uid}`, {}, 'DELETE')
    const body = await resp.json()
    if (body.ok) {
      dispatch(deleteViaje(uid))
      Swal.fire('Success', 'Viaje eliminado', 'success')
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

const deleteViaje = (uid) => ({
  type: types.viajesDelete,
  payload: uid
})
