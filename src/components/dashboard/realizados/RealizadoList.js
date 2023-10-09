import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import { ViajesItem } from '../ViajesItem'

export const RealizadoList = () => {
  const { viajes } = useSelector((state) => state.trip)
  console.log(viajes)
  const now = moment()
  const realizados = viajes.filter((item) => {
    const date = moment(item.fecha)
    return date.isBefore(now)
  })

  return (
    <div className="row row-cols-lg-3 g-3">
      {realizados.length !== 0 ? (
        realizados.map((item) => (
          <ViajesItem key={item.uid} {...item} realizado />
        ))
      ) : (
        <p className="text-center">Sin viajes realizados</p>
      )}
    </div>
  )
}
