import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import { ViajesItem } from '../ViajesItem'

export const RealizadoList = () => {
  const { viajes } = useSelector((state) => state.trip)
  const now = moment()
  const realizados = viajes.filter((item) => {
    const date = moment(item.fecha)
    return date.isBefore(now)
  })

  return (
    <div>
      {realizados.length !== 0 ? (
        realizados.map((item) => (
          <ViajesItem key={item.uid} {...item} realizado />
        ))
      ) : (
        <p>Sin viajes realizados</p>
      )}
    </div>
  )
}
