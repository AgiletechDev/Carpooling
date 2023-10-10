import moment from 'moment'

export const prepareViajes = (viajes = [], uid) => {
  console.log(viajes)
  return viajes.map((e) => {
    if (e.pa_estado === 'ACEPTADO')
      return {
        ...e,
        ci_fecha: moment(e.ci_fecha).toDate(),
        joined: true,
        inlist: false
      }
    else if (e.pa_estado === 'PENDIENTE')
      return {
        ...e,
        ci_fecha: moment(e.ci_fecha).toDate(),
        joined: false,
        inlist: true
      }
    else
      return {
        ...e,
        ci_fecha: moment(e.ci_fecha).toDate(),
        joined: false,
        inlist: false
      }
  })
}

export const prepareViaje = (viaje = {}, uid) => {
  return {
    ...viaje,
    ci_fecha: moment(viaje.ci_fecha).toDate(),
    joined: false,
    inlist: false
  }
}
