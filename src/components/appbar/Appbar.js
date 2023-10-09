import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BsHouseDoorFill, BsPersonCircle, BsBellFill } from 'react-icons/bs'

import { startLogout } from '../../actions/auth'
import { openNotifications } from '../../actions/ui'

import './appbar.css'

export const Appbar = () => {
  const dispatch = useDispatch()
  const { uid, name } = useSelector((state) => {
    console.log(state.auth)
    return state.auth
  })
  const { notifications } = useSelector((state) => state.notify)

  const nombres = name !== undefined ? name.split(' ') : ['User']

  const handleLogout = () => {
    dispatch(startLogout())
  }

  const handleShowNotifications = () => {
    dispatch(openNotifications())
  }

  return (
    <div className="container-fluid">
      <div className="row bg-primary justify-content-center text-light py-3">
        <div className="col-auto col-sm-6 text-last">
          <Link to={'/'} className="text-light link-home">
            <BsHouseDoorFill />
            <span> Carpooling App</span>
          </Link>
        </div>
        <div className="col-auto">
          {!!uid ? (
            <Link to="/profile" className="text-light link-home">
              <BsPersonCircle />
              <span> {nombres[0]}</span>
            </Link>
          ) : (
            <Link to="/auth/login" className="text-light link-home">
              Login
            </Link>
          )}
        </div>
        <div className="col-auto">
          {!!uid ? (
            <button
              className="btn text-light link-home ms-2 p-0 position-relative"
              onClick={handleShowNotifications}
            >
              <BsBellFill />
              <span
                className={`position-absolute top-0 end-0 badge rounded rounded-circle bg-danger p-1 ${
                  notifications.length === 0 ? 'visually-hidden' : ''
                }`}
              >
                <span className="visually-hidden">+1</span>
              </span>
            </button>
          ) : (
            <Link to="/auth/register" className="text-light link-home">
              Registrarse
            </Link>
          )}
        </div>
        {!!uid ? (
          <div className="col-auto">
            <button
              className="btn text-light link-home ms-2 p-0"
              onClick={handleLogout}
            >
              Salir
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
