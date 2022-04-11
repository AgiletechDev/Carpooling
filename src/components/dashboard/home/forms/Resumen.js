import React, { useEffect, useState } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaCar, FaDollarSign, FaRegUser } from 'react-icons/fa'
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api'

export const Resumen = ({
  desde,
  hasta,
  fecha,
  precio,
  asientos,
  vehiculo,
  detalles,
  handleFinalSubmit,
  handleBack,
  isLoaded
}) => {
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const center = { lat: -12.03331904021834, lng: -77.04477899516831 }

  const calculateRoute = async () => {
    if (desde === '' || hasta === '') return
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService()
    const results = await directionService.route({
      origin: desde,
      destination: hasta,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
  }
  useEffect(() => {
    calculateRoute()
  }, [])

  return (
    <>
      <div className="row">
        <h3 className="mb-3">Resumen</h3>
        <p>
          <AiOutlineClockCircle /> {fecha.toString()}
        </p>
      </div>
      <div className="row align-items-center justify-content-center">
        {isLoaded && (
          <div className="col-11">
            <GoogleMap
              center={center}
              zoom={15}
              mapContainerStyle={{ width: '100%', height: '350px' }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false
              }}
            >
              {/* <Marker position={center} /> */}
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </div>
        )}
      </div>

      <div className="row mt-2">
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
      </div>
    </>
  )
}
