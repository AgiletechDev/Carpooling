import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import { ViajesItem } from '../ViajesItem'

export const ArealizarList = () => {
  const { viajes } = useSelector((state) => state.trip)
  console.log(viajes)
  const now = moment()
  const [arealizar, setArelizar] = useState([])

  useEffect(() => {
    const viajesarealizar = viajes.filter((item) => {
      const date = moment(item.ci_fecha)
      if((item.pa_estado === 'ACEPTADO' || item.pa_estado === 'CONDUCTOR_ROLE') && date.isAfter(now)) return true
    })
    console.log(viajesarealizar)
    setArelizar(viajesarealizar)
  }, [viajes])

  return (
    <div className="row row-cols-lg-3 row-cols-sm-2 g-3">
      {arealizar?.length !== 0 ? (
        arealizar?.map((item) => <ViajesItem key={item.vi_id} {...item} />)
      ) : (
        <p className="text-center">Sin viajes por realizar</p>
      )}
    </div>
  )
}
