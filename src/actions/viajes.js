import Swal from 'sweetalert2'
import moment from 'moment'

import { fetchConToken } from '../helpers/fetch'
import { prepareViaje, prepareViajes } from '../helpers/prepareViajes'
import { types } from '../types/types'
import { addNotification } from './notify'

const now = moment()

export const startGetViajes = () => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth
      const resp = await fetchConToken('/viajes')
      const body = await resp.json()
      console.log(body)
      const viajes = prepareViajes(body.trips, uid)
      console.log(viajes)
      const viajesPorConfirmar = viajes.filter((trip) => trip.pa_estado === 'PENDIENTE')
      const lista = prepareViajes(viajesPorConfirmar, uid)
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
      const data = {
        destinationName: hasta
      }
      const resp = await fetchConToken(`viajes/buscar-viaje`, data ,'POST')
      const body = await resp.json()
      //const viajes = prepareViajes(body.trips)
      const viajesFiltered = body.trips.filter((viaje) => {
        const isFechaValid = fecha !== '' ? fecha.getTime() === new Date(viaje.ci_fecha).getTime() : true;
        const isViajeValid = moment(viaje.ci_fecha).isAfter(now) && viaje.vi_asientos !== 0;
        return isViajeValid && isFechaValid;
      })
      console.log(viajesFiltered)
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
    const { vi_id: uid } = activeViaje
    const resp = await fetchConToken(`viajes/joinviaje/${uid}`, {}, 'PUT')
    const body = await resp.json()    
    if (body.ok) {
      body.trip.joined = false
      body.trip.inlist = true
      dispatch(solicitarUnirse(body.trip))
      //dispatch(addNotification(body.notyPasajero))
      Swal.fire('Success', body.message, 'success')
    } else {
      Swal.fire('Error', body.message, 'error')
    }
  }
}

const solicitarUnirse = (viaje) => ({
  type: types.viajesSolicitarUnirse,
  payload: viaje
})

export const startCancelarSolicitud = () => {
  return async (dispatch, getState) => {
    const { activeViaje } = getState().trip
    const { vi_id: uid } = activeViaje
    const resp = await fetchConToken(`viajes/disjoinviaje/${uid}`, {}, 'PUT');
    const body = await resp.json();
    body.disjoined.joined = false
    body.disjoined.inlist = false
    console.log(body)
    if (body.ok) {
      dispatch(cancelarSolicitud(body.disjoined.uid))
      Swal.fire('Success', body.disjoined.message, 'success')
    } else {
      Swal.fire('Error', body.disjoined.message, 'error')
    }
  }
}

const cancelarSolicitud = (id) => ({
  type: types.viajesCancelarSolicitud,
  payload: id
})

export const startAceptarSolicitud = (id) => {
  return async (dispatch, getState) => {
    const { activeViaje } = getState().trip
    const { vi_id: uid } = activeViaje
    const resp = await fetchConToken(
      `viajes/addpasajero/${uid}`,
      { pasajero: id },
      'PUT'
    )
    const body = await resp.json()
    const viaje = prepareViaje(body.trip)
    if (body.ok) {
      dispatch(aceptarSolicitud(viaje))
      Swal.fire('Success', body.message, 'success')
    } else {
      Swal.fire('Error', body.message, 'error')
    }
  }
}

const aceptarSolicitud = (solicitud) => ({
  type: types.viajesConfirmar,
  payload: solicitud
})

export const startRechazarSolicitud = (id) => {
  return async (dispatch, getState) => {
    const { activeViaje } = getState().trip
    const { vi_id: uid } = activeViaje
    const resp = await fetchConToken(
      `viajes/rejectpasajero/${uid}`,
      { pasajero: id },
      'PUT'
    )
    const body = await resp.json()
    if (body.ok) {
      Swal.fire('Success', body.message, 'success')
    } else {
      Swal.fire('Error', body.message, 'error')
    }
  }
}

export const startCrearViaje = (viaje) => {
  return async (dispatch, getState) => {
    const { uid, rol } = getState().auth
    console.log(uid, rol)
    viaje.owner = uid
    viaje.rol = rol
    console.log(viaje)
    const data = {
      // trip
      seats: Number(viaje.asientos),
      automaticReservation: viaje.automaticReservation || false,
      allowedFood: viaje.automaticReservation || true,
      allowedMate: viaje.automaticReservation || true,
      car: viaje.vehiculo,
      details: viaje.detalles,
      // city,
      name_origin_city: viaje.desde,
      price:Number(viaje.precio),
      date: viaje.fecha,
      name_destination_city: viaje.hasta,
      //owner
      owner: uid,
      role: viaje.rol
    }
    const resp = await fetchConToken('viajes/', data, 'POST')
    const body = await resp.json()
    if (body.trip) {
      dispatch(crearViaje(body.trip))
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


const deleteViaje = (uid) => ({
  type: types.viajesDelete,
  payload: uid
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


const updateViaje = (viaje) => ({
  type: types.viajesUpdate,
  payload: viaje
})

export const startUpdateViaje = (viaje) => {
  return async (dispatch, getState) => {
    const { activeViaje } = getState().trip
    const { vi_id: uid } = activeViaje
    console.log(viaje)
    const data = {
      //name_origin_city: viaje.desde,
      price:Number(viaje.precio),
      date: viaje.fecha,
      name_destination_city: viaje.hasta,
    }
    const resp = await fetchConToken(`viajes/${uid}`, data, 'PUT')
    console.log('resp', resp)
    const body = await resp.json()
    console.log('body',body)
    if (body.trip) {
      dispatch(updateViaje(body.trip))
      Swal.fire('Success', 'Viaje creado', 'success')
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

  