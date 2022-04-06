import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BsHouseDoorFill } from 'react-icons/bs'

import { startLogout } from '../../actions/auth'

import './appbar.css'

export const Appbar = () => {
  const dispatch = useDispatch()
  const { uid } = useSelector((state) => state.auth)

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-circle me-2"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            <span>USER</span>
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
            Register
          </Link>
          <Link
            to="/"
            className="text-light link-home"
            style={{
              display: `${!!uid ? '' : 'none'}`
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bell-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
            </svg>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              +99
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
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
