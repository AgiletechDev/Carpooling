import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import { ViajesItem } from '../ViajesItem'

export const ArealizarList = () => {
  const { viajes } = useSelector((state) => state.trip)
  console.log(viajes)
  const now = moment()
  const arealizar = viajes.filter((item) => {
    console.log(item)
    const date = moment(item.ci_fecha)
    return date.isAfter(now)
  })

  return (
    <div className="row row-cols-lg-3 row-cols-sm-2 g-3">
      {arealizar.length !== 0 ? (
        arealizar.map((item) => <ViajesItem key={item.vi_id} {...item} />)
      ) : (
        <p className="text-center">Sin viajes por realizar</p>
      )}
    </div>
  )
}
