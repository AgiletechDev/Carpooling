import Swal from 'sweetalert2'
import { fetchConToken } from '../helpers/fetch'
import { types } from '../types/types'

export const startGetViajes = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('viajes/misviajes')
      const body = await resp.json()
      dispatch(loadViajes(body.viajes))
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
    console.log(body)
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
