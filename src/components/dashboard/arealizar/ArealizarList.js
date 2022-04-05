import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import { ViajesItem } from '../ViajesItem'

export const ArealizarList = () => {
  const { viajes } = useSelector((state) => state.trip)
  const now = moment()
  const arealizar = viajes.filter((item) => {
    const date = moment(item.fecha)
    return date.isAfter(now)
  })

  return (
    <div>
      {arealizar.length !== 0 ? (
        arealizar.map((item) => <ViajesItem key={item.uid} {...item} />)
      ) : (
        <p>Sin viajes por realizar</p>
      )}
    </div>
  )
}
