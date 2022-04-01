import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

export const ViajesItem = () => {
  return (
    <Card style={{ width: '26rem' }} className="shadow-sm m-3 bg-body rounded">
      <Card.Body>
        <Row>
          <Col xs={8} className="border-end">
            <p>Sabado, Abril 2, 2022 10:00 AM</p>
            <p>Mar de la Plata, Provincia de Buenos Aires, Argentina</p>
            <p>Buebos Aires, CABA, Argentina</p>
            <p>Ford</p>
          </Col>
          <Col className="border-start">
            <p>100</p>
            <p>Por pasajero</p>
            <p>4</p>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-evenly">
        <button type="button" className="btn btn-primary">
          Detalles
        </button>
        <button type="button" className="btn btn-success">
          Solicitudes
        </button>
        <button type="button" className="btn btn-warning">
          Editar
        </button>
      </Card.Footer>
    </Card>
  )
}
