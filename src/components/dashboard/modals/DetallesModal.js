import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaCar, FaDollarSign, FaRegUser } from 'react-icons/fa'
import { DirectionsRenderer, GoogleMap } from '@react-google-maps/api'
import moment from 'moment'
import 'moment/locale/es'

import { closeDetallesModal } from '../../../actions/ui'
import {
  clearActiveViaje,
  startCancelarSolicitud,
  startDeleteViaje,
  startSolicitarUnirse
} from '../../../actions/viajes'

moment.locale('es')

export const DetallesModal = ({ isLoaded }) => {
  const dispatch = useDispatch()
  const { rol } = useSelector((state) => state.auth)
  const { showDetalles } = useSelector((state) => state.ui)
  const { activeViaje, listaEspera } = useSelector((state) => state.trip)
  const [directionsResponse, setDirectionsResponse] = useState(null)

  const center = { lat: -12.03331904021834, lng: -77.04477899516831 }

  const closeDetalles = () => {
    dispatch(closeDetallesModal())
    dispatch(clearActiveViaje())
  }

  const handleDeleteViaje = () => {
    dispatch(startDeleteViaje())
    dispatch(closeDetallesModal())
  }

  const handleSolicitarUnirse = () => {
    dispatch(startSolicitarUnirse())
    dispatch(closeDetallesModal())
  }

  const handleCancelarSolicitud = () => {
    dispatch(startCancelarSolicitud())
    dispatch(closeDetallesModal())
  }

  const calculateRoute = async (desde, hasta) => {
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

  const [isInList, setIsInList] = useState(false)
  useEffect(() => {
    console.log('modal detalles', activeViaje)
    if (!!activeViaje) calculateRoute(/* activeViaje.desde */'Lima', activeViaje.ci_nombre)
    let prueba
    for (const item of listaEspera) {
      if(activeViaje?.vi_id === Number(item.vi_id)) prueba = true
    }
    console.log(prueba)
    setIsInList(prueba)
  }, [activeViaje, listaEspera])

  return (
    <Modal show={showDetalles} onHide={closeDetalles} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del viaje</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <p>
            <AiOutlineClockCircle />{' '}
            {!!activeViaje
              ? moment(activeViaje.ci_fecha).format('D MMMM YYYY, h:mm a')
              : ''}
          </p>
        </div>

        <div className="row align-items-center justify-content-center">
          {isLoaded && (
            <div className="col-11">
              <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '250px' }}
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
            <FaDollarSign /> {!!activeViaje ? activeViaje.ci_precio : ''}
          </p>
          <p>Por pasajero</p>
          <p>
            <FaRegUser /> {!!activeViaje ? activeViaje.vi_asiento : ''}
          </p>
          <p>
            <FaCar /> {!!activeViaje ? activeViaje.vi_carro : ''}
          </p>
          <p>Detalles</p>
          <p>
            {!!activeViaje
              ? activeViaje.vi_detalle !== ''
                ? activeViaje.vi_detalle
                : 'Sin detalles'
              : ''}
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        {rol === 'USER_ROLE' ? (
          (!isInList) ? (
            <Button variant="success" onClick={handleSolicitarUnirse}>
              Solicitar unirse
            </Button>
          ) : (
            <Button variant="danger" onClick={handleCancelarSolicitud}>
              Cancelar solicitud
            </Button>
          )
        ) : null}

        {rol === 'CONDUCTOR_ROLE' ? (
          <Button variant="danger" onClick={handleDeleteViaje}>
            Eliminar viaje
          </Button>
        ) : null}
      </Modal.Footer>
    </Modal>
  )
}
