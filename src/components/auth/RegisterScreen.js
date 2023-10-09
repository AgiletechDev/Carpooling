import React, { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
import validator from 'validator'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useForm } from '../../hooks/useForm'
import { startRegister } from '../../actions/auth'

import 'react-datepicker/dist/react-datepicker.css'
import './form.css'

import 'moment/locale/es'

moment.locale('es')
registerLocale('es', es)

export const RegisterScreen = () => {
  const dispatch = useDispatch()
  const [nameValid, setNameValid] = useState(true)
  const [correoValid, setCorreoValid] = useState(true)
  const [nicknameValid, setNicknameValid] = useState(true)
  const [fechaNacimientoValid, setFechaNacimientoValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [formValues, handleInputChange] = useForm({
    firstname: '',
    surname: 'empty',
    email: '',
    nickname: '',
    date_of_birth: '',
    password: '',
    password2: '',
    role: 'USER_ROLE'
  })

  const {
    firstname,
    email,
    nickname,
    date_of_birth,
    password,
    password2,
    role
  } = formValues

  const handleDateChange = (e) => {
    handleInputChange({
      target: {
        name: 'date_of_birth',
        value: e
      }
    })
  }

  const validateForm = () => {
    let valid = true
    const selectedDate = moment(date_of_birth)

    if (firstname.trim().length < 2) {
      setNameValid(false)
      valid = valid && false
    } else setNameValid(true)

    if (!validator.isEmail(email)) {
      setCorreoValid(false)
      valid = valid && false
    } else setCorreoValid(true)

    if (nickname.trim().length < 2) {
      setNicknameValid(false)
      valid = valid && false
    } else setNicknameValid(true)

    if (
      Number(moment().format('YYYY')) - Number(selectedDate.format('YYYY')) <
      18
    ) {
      setFechaNacimientoValid(false)
      valid = valid && false
    } else setFechaNacimientoValid(true)

    if (password !== password2 || password.length < 6) {
      setPasswordValid(false)
      valid = valid && false
    } else setPasswordValid(true)

    return valid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validateForm()

    if (isValid) {
      delete formValues.password2
      dispatch(startRegister(formValues))
    } else return
  }

  return (
    <div className="container text-center">
      <div className="row align-items-center justify-content-center mt-5">
        <div className="col-lg-5 shadow rounded form-container">
          <form onSubmit={handleSubmit} noValidate>
            <h3>Registro</h3>

            <div className="form-group text-start mb-2">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className={`form-control ${!nameValid && 'is-invalid'}`}
                placeholder="Enter name"
                name="firstname"
                value={firstname}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>

            <div className="form-group text-start mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${!correoValid && 'is-invalid'}`}
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>

            <div className="form-group text-start mb-2">
              <label className="form-label">Nickname</label>
              <input
                type="text"
                className={`form-control ${!nicknameValid && 'is-invalid'}`}
                placeholder="Enter nickname"
                name="nickname"
                value={nickname}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>

            <div className="form-group text-start mb-2">
              <label className="form-label">Fecha de Nacimiento</label>
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
                selected={date_of_birth}
                placeholderText="Fecha de Nacimiento"
                onChange={handleDateChange}
              />
            </div>

            <div className="form-group text-start mb-2">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${!passwordValid && 'is-invalid'}`}
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group text-start mb-2">
              <label className="form-label">Confirm password</label>
              <input
                type="password"
                className={`form-control ${!passwordValid && 'is-invalid'}`}
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group text-start mb-4">
              <label className="form-label">Type of user</label>
              <select
                className="form-select"
                name="role"
                defaultValue={role}
                onChange={handleInputChange}
              >
                <option value="USER_ROLE">Pasajero</option>
                <option value="CONDUCTOR_ROLE">Conductor</option>
              </select>
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-dark">
                Registrarse
              </button>
            </div>

            <p className="text-end">
              Ya registrado{' '}
              <Link className="a-link" to="/auth/login">
                login?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
