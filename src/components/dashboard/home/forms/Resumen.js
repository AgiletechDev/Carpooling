import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaCar, FaDollarSign, FaRegUser } from 'react-icons/fa'

export const Resumen = ({
  fecha,
  precio,
  asientos,
  vehiculo,
  detalles,
  handleFinalSubmit,
  handleBack
}) => {
  return (
    <>
      <h3 className="mb-3">Resumen</h3>

      <p>
        <AiOutlineClockCircle /> {fecha.toString()}
      </p>
      <p>Imagen Mapa</p>
      <p>Información del auto</p>
      <p>
        <FaDollarSign /> {precio}
      </p>
      <p>Por pasajero</p>
      <p>
        <FaRegUser /> {asientos}
      </p>
      <p>
        <FaCar /> {vehiculo}
      </p>
      <p>Detalles</p>
      <p>{detalles !== '' ? detalles : 'Sin detalles'}</p>

      <div className="d-grid gap-2">
        <button onClick={handleFinalSubmit} className="btn btn-success">
          Confirmar
        </button>

        <button onClick={handleBack} className="btn btn-secondary">
          Volver
        </button>
      </div>
    </>
  )
}
