import moment from 'moment'

export const prepareViajes = (viajes = [], uid) => {
  return viajes.map((e) => {
    if (e.pasajeros.includes(uid) || e.listaespera.includes(uid))
      return {
        ...e,
        fecha: moment(e.fecha).toDate(),
        joined: true
      }
    else
      return {
        ...e,
        fecha: moment(e.fecha).toDate(),
        joined: false
      }
  })
}
