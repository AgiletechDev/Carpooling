import moment from 'moment'

export const prepareViajes = (viajes = []) => {
  return viajes.map((e) => ({
    ...e,
    fecha: moment(e.fecha).toDate()
  }))
}
