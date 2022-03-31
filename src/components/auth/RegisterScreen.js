import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import validator from 'validator';
import moment from 'moment';

import { useForm } from '../../hooks/useForm';

import 'react-datepicker/dist/react-datepicker.css';
import './form.css';

import 'moment/locale/es';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startRegister } from '../../actions/auth';
moment.locale('es');
registerLocale('es', es);

const now = moment().minutes(0).seconds(0);

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  // const [nameValid, setNameValid] = useState(true);
  // const [correoValid, setCorreoValid] = useState(true);
  // const [nicknameValid, setNicknameValid] = useState(true);
  // const [fechaNacimientoValid, setFechaNacimientoValid] = useState(true);
  // const [passwordValid, setPasswordValid] = useState(true);
  const [formValues, handleInputChange] = useForm({
    nombre: '',
    correo: '',
    nickname: '',
    fechaNacimiento: now.toDate(),
    password: '',
    password2: '',
    rol: 'USER_ROLE',
  });

  const {
    nombre,
    correo,
    nickname,
    fechaNacimiento,
    password,
    password2,
    rol,
  } = formValues;

  const handleDateChange = (e) => {
    handleInputChange({
      target: {
        name: 'fechaNacimiento',
        value: e,
      },
    });
  };

  // const validateForm = () => {
  //   const selectedDate = moment(fechaNacimiento);
  //   if (nombre.trim().length < 2) setNameValid(false);
  //   if (!validator.isEmail(correo)) setCorreoValid(false);
  //   if (nickname.trim().length < 2) setNicknameValid(false);
  //   if (Number(now.format('YYYY')) - Number(selectedDate.format('YYYY')) < 18)
  //     setFechaNacimientoValid(false);
  //   if (password !== password2 || password.length < 6) setPasswordValid(false);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validateForm();
    // if (
    //   nameValid &&
    //   correoValid &&
    //   nicknameValid &&
    //   fechaNacimientoValid &&
    //   passwordValid
    // )
    console.log(formValues);
    dispatch(startRegister(formValues));
  };

  return (
    <div className="container text-center">
      <div className="row align-items-center justify-content-center mt-5">
        <div className="col-lg-5">
          <form onSubmit={handleSubmit}>
            <h3>Registro</h3>

            <div className="form-group text-start mb-2">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name="nombre"
                value={nombre}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>

            <div className="form-group text-start mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="correo"
                value={correo}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>

            <div className="form-group text-start mb-2">
              <label className="form-label">Nickname</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter nickname"
                name="nickname"
                value={nickname}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>

            <div className="form-group text-start mb-2">
              <label className="form-label">Date of birth</label>
              <DatePicker
                className="form-control"
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

            <div className="form-group text-start mb-2">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
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
                className="form-control"
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
                name="rol"
                defaultValue={rol}
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
              Already registered{' '}
              <Link className="a-link" to="/auth/login">
                login?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
