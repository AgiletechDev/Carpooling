import React from 'react';

import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
  const [formValues, handleInputChange] = useForm({ correo: '', password: '' });

  const { correo, password } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <div className="container text-center mt-5">
      <h1>Login</h1>
      <form className="mt-5" onSubmit={handleSubmit}>
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
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button className="btn btn-primary col-3" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
