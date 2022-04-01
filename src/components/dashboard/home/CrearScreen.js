import React, { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import moment from 'moment'

import { useForm } from '../../../hooks/useForm'

import 'react-datepicker/dist/react-datepicker.css'

import 'moment/locale/es'

moment.locale('es')
registerLocale('es', es)

const now = moment().minutes(0).seconds(0)

export const CrearScreen = () => {
  const [step, setStep] = useState(1)

  const [desdeValid, setDesdeValid] = useState(true)
  const [hastaValid, setHastaValid] = useState(true)
  const [fechaValid, setFechaValid] = useState(true)
  const [precioValid, setPrecioValid] = useState(true)
  const [asientosValid, setAsientosValid] = useState(true)
  const [vehiculoValid, setVehiculoValid] = useState(true)

  const [formValues1, handleInputChange1] = useForm({
    desde: '',
    hasta: '',
    fecha: now.toDate()
  })

  const { desde, hasta, fecha } = formValues1

  const [formValues2, handleInputChange2] = useForm({
    precio: '',
    asientos: '',
    vehiculo: '',
    detalles: ''
  })

  const { precio, asientos, vehiculo, detalles } = formValues2

  const handleDateChange = (e) => {
    handleInputChange1({
      target: {
        name: 'fecha',
        value: e
      }
    })
  }

  const validateForm1 = () => {
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

    if (selectedDate.diff(now, 'days') < 1) {
      setFechaValid(false)
      valid = valid && false
    } else setFechaValid(true)

    return valid
  }

  const validateForm2 = () => {
    let valid = true

    if (precio.trim().length < 1 || Number(precio.trim()) < 0) {
      setPrecioValid(false)
      valid = valid && false
    } else setPrecioValid(true)

    if (asientos.trim().length < 1 || Number(asientos.trim()) < 0) {
      setAsientosValid(false)
      valid = valid && false
    } else setAsientosValid(true)

    if (vehiculo.trim().length < 2) {
      setVehiculoValid(false)
      valid = valid && false
    } else setVehiculoValid(true)

    return valid
  }

  const handleSubmit1 = (e) => {
    e.preventDefault()
    const isValid = validateForm1()

    if (isValid) {
      setStep(2)
    } else return
  }

  const handleSubmit2 = (e) => {
    e.preventDefault()
    const isValid = validateForm2()

    if (isValid) {
      setStep(3)
    } else return
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleFinalSubmit = () => {
    console.log({ ...formValues1, ...formValues2 })
  }

  switch (step) {
    case 1:
      return (
        <div className="container mt-3 text-center">
          <div className="row align-items-center justify-content-center mt-5">
            <div className="col-lg-5">
              <form onSubmit={handleSubmit1}>
                <h3 className="mb-3">Encuentro</h3>

                <div className="form-group text-start mb-2">
                  <label className="form-label">Desde</label>
                  <input
                    type="text"
                    className={`form-control ${!desdeValid && 'is-invalid'}`}
                    placeholder="Desde"
                    name="desde"
                    value={desde}
                    onChange={handleInputChange1}
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
                    onChange={handleInputChange1}
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

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Continuar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )

    case 2:
      return (
        <div className="container mt-3 text-center">
          <div className="row align-items-center justify-content-center mt-5">
            <div className="col-lg-5">
              <form onSubmit={handleSubmit2}>
                <h3 className="mb-2">Detalle</h3>
                <h5 className="mb-3">Informacion del auto</h5>

                <div className="form-group text-start mb-2">
                  <label className="form-label">Precio</label>
                  <input
                    type="text"
                    className={`form-control ${!precioValid && 'is-invalid'}`}
                    placeholder="Precio"
                    name="precio"
                    value={precio}
                    onChange={handleInputChange2}
                    autoComplete="off"
                  />
                </div>

                <div className="form-group text-start mb-2">
                  <label className="form-label">Pasajeros</label>
                  <input
                    type="text"
                    className={`form-control ${!asientosValid && 'is-invalid'}`}
                    placeholder="Pasajeros"
                    name="asientos"
                    value={asientos}
                    onChange={handleInputChange2}
                    autoComplete="off"
                  />
                </div>

                <div className="form-group text-start mb-2">
                  <label className="form-label">Vehiculo</label>
                  <input
                    type="text"
                    className={`form-control ${!vehiculoValid && 'is-invalid'}`}
                    placeholder="Vehiculo"
                    name="vehiculo"
                    value={vehiculo}
                    onChange={handleInputChange2}
                    autoComplete="off"
                  />
                </div>

                <div className="form-group text-start mb-4">
                  <label className="form-label">Detalles</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Agrega cualquier información extra que creas relevante"
                    name="detalles"
                    value={detalles}
                    onChange={handleInputChange2}
                    autoComplete="off"
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Continuar
                  </button>

                  <button onClick={handleBack} className="btn btn-secondary">
                    Volver
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )

    case 3:
      return (
        <div className="container mt-3 text-center">
          <div className="row align-items-center justify-content-center mt-5">
            <div className="col-lg-5">
              <h3 className="mb-3">Resumen</h3>

              <p>{fecha.toString()}</p>
              <p>Imagen Mapa</p>
              <p>Información del auto</p>
              <p>{precio}</p>
              <p>Por pasajero</p>
              <p>{asientos}</p>
              <p>{vehiculo}</p>
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
          </div>
        </div>
      )

    default:
      return (
        <div className="container mt-3 text-center">
          <h1>Fail</h1>
        </div>
      )
  }
}
