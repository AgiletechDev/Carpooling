import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaCar, FaDollarSign, FaRegUser } from 'react-icons/fa'
import moment from 'moment'
import 'moment/locale/es'

import { closeDetallesModal } from '../../../actions/ui'
import {
  clearActiveViaje,
  startDeleteViaje,
  startSolicitarUnirse
} from '../../../actions/viajes'

moment.locale('es')

export const DetallesModal = () => {
  const dispatch = useDispatch()
  const { rol } = useSelector((state) => state.auth)
  const { showDetalles } = useSelector((state) => state.ui)
  const { activeViaje } = useSelector((state) => state.trip)

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

  return (
    <Modal show={showDetalles} onHide={closeDetalles} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del viaje</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          <AiOutlineClockCircle />{' '}
          {!!activeViaje
            ? moment(activeViaje.fecha).format('D MMMM YYYY, h:mm a')
            : ''}
        </p>
        <p>Imagen Mapa</p>
        <p>Información del auto</p>
        <p>
          <FaDollarSign /> {!!activeViaje ? activeViaje.precio : ''}
        </p>
        <p>Por pasajero</p>
        <p>
          <FaRegUser /> {!!activeViaje ? activeViaje.asientos : ''}
        </p>
        <p>
          <FaCar /> {!!activeViaje ? activeViaje.vehiculo : ''}
        </p>
        <p>Detalles</p>
        <p>
          {!!activeViaje
            ? activeViaje.detalles !== ''
              ? activeViaje.detalles
              : 'Sin detalles'
            : ''}
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="success"
          style={{
            display: `${
              rol === 'USER_ROLE' &&
              (!!activeViaje ? !activeViaje.joined : true)
                ? ''
                : 'none'
            }`
          }}
          onClick={handleSolicitarUnirse}
        >
          Solicitar unirse
        </Button>
        <Button
          variant="danger"
          style={{
            display: `${rol === 'CONDUCTOR_ROLE' ? '' : 'none'}`
          }}
          onClick={handleDeleteViaje}
        >
          Eliminar viaje
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
