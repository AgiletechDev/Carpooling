import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BsHouseDoorFill, BsPersonCircle, BsBellFill } from 'react-icons/bs'

import { startLogout } from '../../actions/auth'

import './appbar.css'

export const Appbar = () => {
  const dispatch = useDispatch()
  const { uid, name } = useSelector((state) => state.auth)

  const nombres = name !== undefined ? name.split(' ') : ['User']

  const handleLogout = () => {
    dispatch(startLogout())
  }

  return (
    <div className="container-fluid">
      <div className="row bg-primary justify-content-center text-light py-3">
        <div className="col-auto col-sm-6 text-last">
          <Link to={!!uid ? '/' : '/home'} className="text-light link-home">
            <BsHouseDoorFill />
            <span> Carpooling App</span>
          </Link>
        </div>
        <div className="col-auto">
          <Link
            to="/auth/login"
            className="text-light link-home"
            style={{
              display: `${!!uid ? 'none' : ''}`
            }}
          >
            Login
          </Link>
          <Link
            to="/profile"
            className="text-light link-home"
            style={{
              display: `${!!uid ? '' : 'none'}`
            }}
          >
            <BsPersonCircle />
            <span> {nombres[0]}</span>
          </Link>
        </div>
        <div className="col-auto position-relative">
          <Link
            to="/auth/register"
            className="text-light link-home"
            style={{
              display: `${!!uid ? 'none' : ''}`
            }}
          >
            Registrarse
          </Link>
          <Link
            to="/"
            className="text-light link-home"
            style={{
              display: `${!!uid ? '' : 'none'}`
            }}
          >
            <BsBellFill />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              +1
            </span>
          </Link>
        </div>
        <div className="col-auto">
          <button
            className="btn text-light link-home ms-2 p-0"
            style={{
              display: `${!!uid ? '' : 'none'}`
            }}
            onClick={handleLogout}
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  )
}
