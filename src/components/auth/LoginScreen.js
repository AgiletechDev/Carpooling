import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { GoogleLoginButton } from 'react-social-login-buttons'

import { startLogin } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

import './form.css'
import GoogleLogin from 'react-google-login'

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const [correoValid, setCorreoValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [formValues, handleInputChange] = useForm({ correo: '', password: '' })

  const { correo, password } = formValues

  const validateForm = () => {
    let valid = true

    if (!validator.isEmail(correo)) {
      setCorreoValid(false)
      valid = valid && false
    } else setCorreoValid(true)

    if (password.length < 6) {
      setPasswordValid(false)
      valid = valid && false
    } else setPasswordValid(true)

    return valid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validateForm()

    if (isValid) {
      dispatch(startLogin(correo, password))
    } else return
  }

  const handleGoogleLogin = () => {
    console.log('click')
  }

  const responseGoogle = (response) => {
    console.log(response)
  }

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
                className={`form-control ${!correoValid && 'is-invalid'}`}
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
                className={`form-control ${!passwordValid && 'is-invalid'}`}
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

          <div className="mt-5">
            <h3 className="mb-3">Social Login</h3>
            <GoogleLoginButton onClick={handleGoogleLogin} />
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
