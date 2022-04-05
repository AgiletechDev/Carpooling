import React from 'react'
import { useSelector } from 'react-redux'

import { ViajesItem } from '../ViajesItem'
export const PorconfirmarList = () => {
  const { listaEspera } = useSelector((state) => state.trip)

  return (
    <div>
      {listaEspera.map((item) => (
        <ViajesItem key={item.uid} {...item} />
      ))}
    </div>
  )
}
