import React from 'react'
import { useSelector } from 'react-redux'

import { ViajesItem } from '../ViajesItem'
export const PorconfirmarList = () => {
  const { listaEspera } = useSelector((state) => state.trip)

  return (
    <div className="row row-cols-lg-3 g-3">
      {listaEspera.length !== 0 ? (
        listaEspera.map((item) => <ViajesItem key={item.uid} {...item} />)
      ) : (
        <p>Sin viajes por confirmar</p>
      )}
    </div>
  )
}
