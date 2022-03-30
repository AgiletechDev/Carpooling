import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/auth';

import { useForm } from '../../hooks/useForm';

import './form.css';

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({ correo: '', password: '' });

  const { correo, password } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    dispatch(startLogin(correo, password));
  };

  return (
    <div className="container text-center">
      <div className="row align-items-center justify-content-center mt-5">
        <div className="col-lg-5">
          <form onSubmit={handleSubmit}>
            <h3 className="mb-3">Login</h3>

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

            <div className="form-group text-start mb-4">
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

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-dark">
                Login
              </button>
            </div>

            <p className="text-end">
              Don't have an account{' '}
              <Link className="a-link" to="/auth/register">
                register?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
