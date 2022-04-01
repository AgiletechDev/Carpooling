import React from 'react'
import { ViajesItem } from '../ViajesItem'

export const RealizadoList = () => {
  const viajes = [1, 2, 3, 4, 5, 6]
  return (
    <div>
      {viajes.map((item) => (
        <ViajesItem key={item} />
      ))}
    </div>
  )
}
