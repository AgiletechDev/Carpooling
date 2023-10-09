import Swal from 'sweetalert2'

import { fetchConToken, fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types'
import { clearViajes } from './viajes'

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth/login', { email, password }, 'POST')
    const body = await resp.json()

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      console.log(body.user)
      dispatch(
        login({
          uid: body.user.us_id,
          name: body.user.us_nombre,
          rol: body.user.us_role,
          data: body.user
        })
      )
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

export const startLoginGoogle = (googleResponse) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      'auth/google',
      { id_token: googleResponse.tokenId },
      'POST'
    )
    const body = await resp.json()

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(
        login({
          uid: body.usuario.uid,
          name: body.usuario.nombre,
          rol: body.usuario.rol,
          data: body.usuario
        })
      )
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

export const startRegister = (values) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('users', { ...values }, 'POST')
    const body = await resp.json()

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(
        login({
          uid: body.user.us_id,
          name: body.user.us_nombre,
          rol: body.user.us_role,
          data: body.user
        })
      )
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken('auth/renew')
    const body = await resp.json()
    console.log(body)
    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      console.log(body.user.us_id, body.user.us_nombre)
      dispatch(
        login({
          uid: body.user.us_id,
          name: body.user.us_nombre,
        })
      )
    } else {
      dispatch(checkingFinish())
    }
  }
}

const checkingFinish = () => ({
  type: types.authCheckingFinish
})

const login = (user) => ({
  type: types.authLogin,
  payload: user
})

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(clearViajes())
    dispatch(logout())
  }
}

const logout = () => ({
  type: types.authLogout
})

export const startUpdateUser = (uid, data) => {
  return async (dispatch) => {
    const resp = await fetchConToken(`users/${uid}`, data, 'PUT')
    const body = await resp.json()
    if (body.ok) {
      dispatch(updateUser(body.user))
      Swal.fire('Success', 'Usuario actualizado', 'success')
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

const updateUser = (user) => ({
  type: types.authUpdate,
  payload: user
})
