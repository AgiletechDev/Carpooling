import React, { useEffect, useState } from 'react'
import { Button, Modal, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaCar, FaDollarSign, FaRegUser } from 'react-icons/fa'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import moment from 'moment'
import 'moment/locale/es'

import {
  clearActiveViaje,
  startDeleteViaje,
  startGetViajes,
  startSolicitarUnirse
} from '../../actions/viajes'
import { ArealizarList } from './arealizar/ArealizarList'
import { BuscarScreen } from './home/BuscarScreen'
import { CrearScreen } from './home/CrearScreen'
import { PorconfirmarList } from './porconfirmar/PorconfirmarList'
import { RealizadoList } from './realizados/RealizadoList'
import {
  closeDetallesModal,
  closeEditarModal,
  closeSolicitudesModal
} from '../../actions/ui'
import { SolicitudItem } from './SolicitudItem'

import 'react-datepicker/dist/react-datepicker.css'
import './app.css'

moment.locale('es')
registerLocale('es', es)

const now = moment()

const initState = {
  desde: '',
  hasta: '',
  fecha: now.toDate(),
  precio: ''
}

export const AppScreen = () => {
  const dispatch = useDispatch()
  const { rol } = useSelector((state) => state.auth)
  const { showDetalles, showEditar, showSolicitudes } = useSelector(
    (state) => state.ui
  )
  const { activeViaje } = useSelector((state) => state.trip)

  const [desdeValid, setDesdeValid] = useState(true)
  const [hastaValid, setHastaValid] = useState(true)
  const [fechaValid, setFechaValid] = useState(true)
  const [precioValid, setPrecioValid] = useState(true)
  const [formValues, setFormValues] = useState(initState)
  const [key, setKey] = useState('home')

  const { desde, hasta, fecha, precio } = formValues

  const disabled =
    rol === 'USER_ROLE' ? { disabled: false } : { disabled: true }

  useEffect(() => {
    dispatch(startGetViajes())
  }, [dispatch])

  useEffect(() => {
    if (!!activeViaje) {
      let { desde, hasta, fecha, precio } = activeViaje
      fecha = moment(fecha).toDate()
      setFormValues({ desde, hasta, fecha, precio })
    } else setFormValues(initState)
  }, [activeViaje])

  const closeDetalles = () => {
    dispatch(closeDetallesModal())
    dispatch(clearActiveViaje())
  }

  const closeEditar = () => {
    dispatch(closeEditarModal())
    dispatch(clearActiveViaje())
  }

  const closeSolicitudes = () => {
    dispatch(closeSolicitudesModal())
  }

  const validateForm = () => {
    let valid = true
    const selectedDate = moment(fecha)

    if (desde.trim().length < 2) {
      setDesdeValid(false)
      valid = valid && false
    } else setDesdeValid(true)

    if (hasta.trim().length < 2) {
      setHastaValid(false)
      valid = valid && false
    } else setHastaValid(true)

    if (selectedDate.isBefore(now)) {
      setFechaValid(false)
      valid = valid && false
    } else setFechaValid(true)

    if (precio.trim().length < 1 || Number(precio.trim()) < 0) {
      setPrecioValid(false)
      valid = valid && false
    } else setPrecioValid(true)

    return valid
  }

  const handleEditar = (e) => {
    e.preventDefault()
    const isValid = validateForm()
    if (isValid) console.log(formValues)
  }

  const handleDateChange = (e) => {
    handleInputChange({
      target: {
        name: 'fecha',
        value: e
      }
    })
  }

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const handleDeleteViaje = () => {
    dispatch(startDeleteViaje())
    dispatch(closeDetallesModal())
  }

  const handleSolicitarUnirse = () => {
    dispatch(startSolicitarUnirse())
    dispatch(closeDetallesModal())
  }

  // const { activeViaje } = useSelector((state) => state.trip)
  // const now = moment()
  // const arealizar = listaEspera.filter((item) => {
  //   const date = moment(item.fecha)
  //   return date.isAfter(now)
  // })

  return (
    <>
      <div className="container mt-5 pb-5 app-container rounded shadow">
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab
            eventKey="home"
            title={rol === 'CONDUCTOR_ROLE' ? 'Crear' : 'Buscar'}
          >
            <div
              style={{
                display: `${rol === 'CONDUCTOR_ROLE' ? '' : 'none'}`
              }}
            >
              <CrearScreen />
            </div>
            <div
              style={{
                display: `${rol === 'USER_ROLE' ? '' : 'none'}`
              }}
            >
              <BuscarScreen />
            </div>
          </Tab>
          <Tab eventKey="realizados" title="Realizados">
            <RealizadoList />
          </Tab>
          <Tab eventKey="arealizar" title="Arealizar">
            <ArealizarList />
          </Tab>
          <Tab eventKey="por confirmar" title="Por confirmar" {...disabled}>
            <PorconfirmarList />
          </Tab>
        </Tabs>
      </div>

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

      <Modal show={showEditar} onHide={closeEditar} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar viaje</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleEditar}>
            <div className="form-group text-start mb-2">
              <label className="form-label">Desde</label>
              <input
                type="text"
                className={`form-control ${!desdeValid && 'is-invalid'}`}
                placeholder="Desde"
                name="desde"
                value={desde}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>

            <div className="form-group text-start mb-2">
              <label className="form-label">Hasta</label>
              <input
                type="text"
                className={`form-control ${!hastaValid && 'is-invalid'}`}
                placeholder="Hasta"
                name="hasta"
                value={hasta}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>

            <div className="form-group text-start mb-4">
              <label className="form-label">Fecha y hora</label>
              <DatePicker
                className={`form-control ${!fechaValid && 'is-invalid'}`}
                locale="es"
                dateFormat="dd/MM/yyyy, hh:mm:aa"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={fecha}
                showTimeSelect
                timeIntervals={15}
                onChange={handleDateChange}
              />
            </div>

            <div className="form-group text-start mb-2">
              <label className="form-label">Precio</label>
              <input
                type="text"
                className={`form-control ${!precioValid && 'is-invalid'}`}
                placeholder="Precio"
                name="precio"
                value={precio}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>

            <div className="d-grid gap-2">
              <Button type="submit" variant="warning" onClick={handleEditar}>
                Editar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showSolicitudes} onHide={closeSolicitudes}>
        <Modal.Header closeButton>
          <Modal.Title>Solicitudes</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!!activeViaje && rol === 'CONDUCTOR_ROLE' ? (
            activeViaje.listaespera !== null ? (
              activeViaje.listaespera.map((item) => (
                <SolicitudItem key={item._id} {...item} />
              ))
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}
