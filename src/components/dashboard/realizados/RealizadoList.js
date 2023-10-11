import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import { ViajesItem } from '../ViajesItem'

export const RealizadoList = () => {
  const { viajes } = useSelector((state) => state.trip)

  const now = moment()
  const realizados = viajes.filter((item) => {
    const date = moment(item.ci_fecha)
    return date.isBefore(now)
  })

  return (
    <div className="row row-cols-lg-3 g-3">
      {!!realizados && realizados?.length !== 0 ? (
        realizados?.map((item) => (
          <ViajesItem key={item.vi_id} {...item} realizado />
        ))
      ) : (
        <p className="text-center">Sin viajes realizados</p>
      )}
    </div>
  )
}
