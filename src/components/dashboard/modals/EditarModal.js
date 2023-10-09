import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import moment from 'moment'
import 'moment/locale/es'

import { closeEditarModal } from '../../../actions/ui'
import { clearActiveViaje, startUpdateViaje } from '../../../actions/viajes'

moment.locale('es')
registerLocale('es', es)

const now = moment()

const initState = {
  desde: '',
  hasta: '',
  fecha: now.toDate(),
  precio: ''
}

export const EditarModal = () => {
  const dispatch = useDispatch()
  const { showEditar } = useSelector((state) => state.ui)
  const { activeViaje } = useSelector((state) => state.trip)

  const [desdeValid, setDesdeValid] = useState(true)
  const [hastaValid, setHastaValid] = useState(true)
  const [fechaValid, setFechaValid] = useState(true)
  const [precioValid, setPrecioValid] = useState(true)

  const [formValues, setFormValues] = useState(initState)

  const { desde, hasta, fecha, precio } = formValues

  useEffect(() => {
    if (!!activeViaje) {
      let { desde, hasta, fecha, precio } = activeViaje
      fecha = moment(fecha).toDate()
      setFormValues({ desde, hasta, fecha, precio })
    } else setFormValues(initState)
  }, [activeViaje])

  const closeEditar = () => {
    dispatch(closeEditarModal())
    dispatch(clearActiveViaje())
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

  const handleEditar = (e) => {
    e.preventDefault()
    const isValid = validateForm()
    if (isValid) dispatch(startUpdateViaje(formValues))
  }

  return (
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
  )
}
