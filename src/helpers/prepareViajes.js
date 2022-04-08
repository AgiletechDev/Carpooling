import moment from 'moment'

export const prepareViajes = (viajes = [], uid) => {
  return viajes.map((e) => {
    if (e.pasajeros.includes(uid))
      return {
        ...e,
        fecha: moment(e.fecha).toDate(),
        joined: true,
        inlist: false
      }
    else if (e.listaespera.includes(uid))
      return {
        ...e,
        fecha: moment(e.fecha).toDate(),
        joined: false,
        inlist: true
      }
    else
      return {
        ...e,
        fecha: moment(e.fecha).toDate(),
        joined: false,
        inlist: false
      }
  })
}

export const prepareViaje = (viaje = {}, uid) => {
  return {
    ...viaje,
    fecha: moment(viaje.fecha).toDate(),
    joined: false,
    inlist: false
  }
}
