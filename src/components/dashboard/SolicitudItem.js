import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { startAceptarSolicitud, startRechazarSolicitud } from '../../actions/viajes'

export const SolicitudItem = (solicitud) => {
  const dispatch = useDispatch()

  const handleConfirmar = () => {
    dispatch(startAceptarSolicitud(solicitud.us_id))
  }

  const handleRechazar = () => {
    //TODO: dispatch de rechazar
    dispatch(startRechazarSolicitud(solicitud.us_id))
  }

  return (
    <Card style={{ width: '22rem' }} className="shadow-sm m-3 bg-body rounded">
      <Card.Body>
        <Row>
          <Col>{solicitud.us_nombre} solicito unirse!</Col>
        </Row>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-evenly">
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleConfirmar}
          >
            Confirmar
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleRechazar}
          >
            Rechazar
          </button>
        </div>
      </Card.Footer>
    </Card>
  )
}
