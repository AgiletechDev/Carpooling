import React, { useState } from 'react'
import moment from 'moment'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import 'moment/locale/es'

moment.locale('es')
registerLocale('es', es)

export const Form1 = ({ setStep, formValues1, handleInputChange1 }) => {
  const [desdeValid, setDesdeValid] = useState(true)
  const [hastaValid, setHastaValid] = useState(true)
  const [fechaValid, setFechaValid] = useState(true)

  const { desde, hasta, fecha } = formValues1

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

    if (!moment.isDate(fecha) || selectedDate.isBefore(moment())) {
      setFechaValid(false)
      valid = valid && false
    } else setFechaValid(true)

    return valid
  }

  const handleSubmit1 = (e) => {
    e.preventDefault()
    const isValid = validateForm1()

    if (isValid) {
      setStep(2)
    } else return
  }

  const handleDateChange = (e) => {
    handleInputChange1({
      target: {
        name: 'fecha',
        value: e
      }
    })
  }

  return (
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
          placeholderText="Fecha y hora"
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
  )
}
