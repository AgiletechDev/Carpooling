import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import validator from 'validator';
import moment from 'moment';

import { useForm } from '../../hooks/useForm';

import 'react-datepicker/dist/react-datepicker.css';

import 'moment/locale/es';
moment.locale('es');
registerLocale('es', es);

const now = moment().minutes(0).seconds(0);

export const RegisterScreen = () => {
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
    console.log(e);
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
  };

  return (
    <div className="container text-center mt-5">
      <h1>Registro</h1>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="row form-group justify-content-center mb-3">
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              name="nombre"
              value={nombre}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="row form-group justify-content-center mb-3">
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Correo"
              name="correo"
              value={correo}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="row form-group justify-content-center mb-3">
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Nickname"
              name="nickname"
              value={nickname}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="row form-group justify-content-center mb-3">
          <div className="col-6">
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
        </div>
        <div className="row form-group justify-content-center mb-3">
          <div className="col-6">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row form-group justify-content-center mb-3">
          <div className="col-6">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row form-group justify-content-center mb-5">
          <div className="col-6">
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
        </div>
        <button className="btn btn-primary col-3" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
};
