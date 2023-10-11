import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import es from 'date-fns/locale/es'
import moment from 'moment'
import 'moment/locale/es'

import { useForm } from '../../../hooks/useForm'
import { buscarViajes } from '../../../actions/viajes'
import { ViajesItem } from '../ViajesItem'

import 'react-datepicker/dist/react-datepicker.css'

moment.locale('es')
registerLocale('es', es)

export const BuscarScreen = () => {
  const dispatch = useDispatch()
  const { busqueda } = useSelector((state) => state.trip)

  const [formValues, handleInputChange] = useForm({
    desde: '',
    hasta: '',
    fecha: ''
  })

  const { desde, hasta, fecha } = formValues

  const handleDateChange = (e) => {
    handleInputChange({
      target: {
        name: 'fecha',
        value: e
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(buscarViajes(formValues))
  }

  return (
    <>
      <div className="container mt-3 text-center">
        <div className="row align-items-center justify-content-center mt-5">
          <div className="col-lg-5">
            <form onSubmit={handleSubmit}>
              <h3 className="mb-3">Buscar viaje</h3>

              <div className="form-group text-start mb-2">
                <label className="form-label">Desde</label>
                <input
                  type="text"
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {!!busqueda && busqueda.length !== 0  ? (
        <div className="row row-cols-lg-3 g-3 mt-2">
          {busqueda?.map((item) => {
            if(item) return <ViajesItem key={item.vi_id} {...item} />
            return null
          })}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '20vh' }}>
          <p className="text-muted">No hay resultados</p>
        </div>
      )}
    </>
  )
}