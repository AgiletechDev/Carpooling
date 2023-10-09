import moment from 'moment'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaMapMarkerAlt, FaCar, FaDollarSign, FaRegUser } from 'react-icons/fa'
import {
  openDetallesModal,
  openEditarModal,
  openSolicitudesModal
} from '../../actions/ui'

import { setActiveViaje } from '../../actions/viajes'

export const ViajesItem = (viaje) => {
  const dispatch = useDispatch()
  const { rol } = useSelector((state) => state.auth)
  const { 
    vi_asiento: asientos, 
    //desde, 
    ci_fecha: fecha, 
    ci_nombre: hasta, 
    ci_precio: precio, 
    vi_carro: vehiculo, 
    //realizado 
  } = viaje
  const date = moment(fecha)

  const handleOpenDetalles = () => {
    dispatch(setActiveViaje(viaje))
    dispatch(openDetallesModal())
  }

  const handleOpenEditar = () => {
    dispatch(setActiveViaje(viaje))
    dispatch(openEditarModal())
  }

  const handleOpenSolicitudes = () => {
    dispatch(setActiveViaje(viaje))
    dispatch(openSolicitudesModal())
  }

  return (
    <Col>
      <Card
        style={{ width: '24rem' }}
        className="shadow-sm m-3 bg-body rounded"
      >
        <Card.Body>
          <Row>
            <Col xs={8} className="border-end">
              <p>
                <AiOutlineClockCircle /> {date.format('D MMMM YYYY, h:mm a')}
              </p>
             {/*  <p>
                <FaMapMarkerAlt /> {desde}
              </p> */}
              <p>
                <FaMapMarkerAlt /> {hasta}
              </p>
              <p>
                <FaCar /> {vehiculo}
              </p>
            </Col>
            <Col className="border-start">
              <p>
                <FaDollarSign /> {precio}
              </p>
              <p>Por pasajero</p>
              <p>
                <FaRegUser /> {asientos}
              </p>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-evenly">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleOpenDetalles}
          >
            Detalles
          </button>
                                {/* && !realizado */}
          {rol === 'CONDUCTOR_ROLE'  ? (
            <>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleOpenSolicitudes}
              >
                Solicitudes
              </button>

              <button
                type="button"
                className="btn btn-warning"
                onClick={handleOpenEditar}
              >
                Editar
              </button>
            </>
          ) : null}
        </Card.Footer>
      </Card>
    </Col>
  )
}
