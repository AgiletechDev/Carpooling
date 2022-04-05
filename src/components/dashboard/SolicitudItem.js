import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { startAceptarSolicitud } from '../../actions/viajes'

export const SolicitudItem = (solicitud) => {
  const dispatch = useDispatch()

  const handleConfirmar = () => {
    dispatch(startAceptarSolicitud(solicitud._id))
  }

  return (
    <Card style={{ width: '22rem' }} className="shadow-sm m-3 bg-body rounded">
      <Card.Body>
        <Row>
          <Col>{solicitud.nombre} solicito unirse!</Col>
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
        </div>
      </Card.Footer>
    </Card>
  )
}
