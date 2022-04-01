import React, { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

import { useForm } from '../../hooks/useForm'

import 'react-datepicker/dist/react-datepicker.css'

import 'moment/locale/es'
import { startUpdateUser } from '../../actions/auth'

moment.locale('es')
registerLocale('es', es)

const now = moment().minutes(0).seconds(0)

export const ProfileScreen = () => {
  const dispatch = useDispatch()
  const { data, uid } = useSelector((state) => state.auth)
  const fecha = moment(data.fechaNacimiento)
  const [fechaNacimientoValid, setFechaNacimientoValid] = useState(true)

  const [formValues, handleInputChange] = useForm({
    fechaNacimiento: fecha.toDate(),
    rol: data.rol
  })

  const { fechaNacimiento, rol } = formValues

  const handleDateChange = (e) => {
    handleInputChange({
      target: {
        name: 'fechaNacimiento',
        value: e
      }
    })
  }

  const validateForm = () => {
    let valid = true
    const selectedDate = moment(fechaNacimiento)

    if (Number(now.format('YYYY')) - Number(selectedDate.format('YYYY')) < 18) {
      setFechaNacimientoValid(false)
      valid = valid && false
    } else setFechaNacimientoValid(true)

    return valid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validateForm()

    if (isValid) {
      dispatch(startUpdateUser(uid, formValues))
    } else return
  }

  return (
    <div className="container text-center">
      <div className="row align-items-center justify-content-center mt-5">
        <div className="col-lg-5">
          <form onSubmit={handleSubmit} noValidate>
            <h3>Editar perfil</h3>

            <div className="form-group text-start mb-2">
              <label className="form-label">Date of birth</label>
              <DatePicker
                className={`form-control ${
                  !fechaNacimientoValid && 'is-invalid'
                }`}
                locale="es"
                dateFormat="dd/MM/yyyy"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={fechaNacimiento}
                onChange={handleDateChange}
              />
            </div>

            <div className="form-group text-start mb-4">
              <label className="form-label">Type of user</label>
              <select
                className="form-select"
                name="rol"
                defaultValue={rol}
                onChange={handleInputChange}
              >
                <option value="USER_ROLE">Pasajero</option>
                <option value="CONDUCTOR_ROLE">Conductor</option>
              </select>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-warning">
                Editar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
