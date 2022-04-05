import Swal from 'sweetalert2'
import { fetchConToken } from '../helpers/fetch'
import { prepareViajes } from '../helpers/prepareViajes'
import { types } from '../types/types'
import moment from 'moment'

const now = moment()

export const startGetViajes = () => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth
      const resp = await fetchConToken('viajes/misviajes')
      const body = await resp.json()
      const viajes = prepareViajes(body.viajes, uid)
      const lista = prepareViajes(body.porconfirmar, uid)
      dispatch(loadViajes(viajes))
      dispatch(loadListaEspera(lista))
    } catch (error) {
      console.log(error)
    }
  }
}

const loadViajes = (viajes) => ({
  type: types.viajesLoad,
  payload: viajes
})

const loadListaEspera = (viajes) => ({
  type: types.viajesLoadLista,
  payload: viajes
})

export const buscarViajes = (filters) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth
      const { desde, hasta, fecha } = filters
      const resp = await fetchConToken('viajes/')
      const body = await resp.json()
      const viajes = prepareViajes(body.viajes)
      const viajesFiltered = viajes.filter((viaje) => {
        if (
          !viaje.listaespera.includes(uid) &&
          !viaje.pasajeros.includes(uid) &&
          moment(viaje.fecha).isAfter(now)
        )
          return desde === ''
            ? true
            : viaje.desde === desde && hasta === ''
            ? true
            : viajes.hasta === hasta && (fecha === '' || fecha === null)
            ? true
            : viaje.fecha === fecha
        else return false
      })
      dispatch(guardarBusqueda(viajesFiltered))
    } catch (error) {
      console.log(error)
    }
  }
}

const guardarBusqueda = (viajes) => ({
  type: types.viajesGuardar,
  payload: viajes
})

export const startSolicitarUnirse = () => {
  return async (dispatch, getState) => {
    const { activeViaje } = getState().trip
    const { uid } = activeViaje
    const resp = await fetchConToken(`viajes/joinviaje/${uid}`, {}, 'PUT')
    const body = await resp.json()
    body.joined.joined = true
    if (body.ok) {
      dispatch(solicitarUnirse(body.joined))
      Swal.fire('Success', 'Solicitud enviada', 'success')
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

const solicitarUnirse = (viaje) => ({
  type: types.viajesSolicitarUnirse,
  payload: viaje
})

export const startAceptarSolicitud = (id) => {
  return async (dispatch, getState) => {
    const { activeViaje } = getState().trip
    const { uid } = activeViaje
    const resp = await fetchConToken(
      `viajes/addpasajero/${uid}`,
      { pasajero: id },
      'PUT'
    )
    const body = await resp.json()
    dispatch(aceptarSolicitud(body.disjoined))
  }
}

const aceptarSolicitud = (solicitud) => ({
  type: types.viajesConfirmar,
  payload: solicitud
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
