import React from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { closeSolicitudesModal } from '../../../actions/ui'
import { SolicitudItem } from '../SolicitudItem'

export const SolicitudesModal = () => {
  const dispatch = useDispatch()
  const { rol } = useSelector((state) => state.auth)
  const { showSolicitudes } = useSelector((state) => state.ui)
  const { activeViaje } = useSelector((state) => state.trip)

  const closeSolicitudes = () => {
    dispatch(closeSolicitudesModal())
  }

  return (
    <Modal show={showSolicitudes} onHide={closeSolicitudes}>
      <Modal.Header closeButton>
        <Modal.Title>Solicitudes</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!!activeViaje && rol === 'CONDUCTOR_ROLE' ? (
          activeViaje.listaespera !== null &&
          activeViaje.listaespera.length !== 0 ? (
            activeViaje.listaespera.map((item) => (
              <SolicitudItem key={item._id} {...item} />
            ))
          ) : (
            <p>Sin solicitudes</p>
          )
        ) : null}
      </Modal.Body>
    </Modal>
  )
}
