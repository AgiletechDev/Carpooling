import Swal from 'sweetalert2'

import { fetchConToken, fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types'

export const startLogin = (correo, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth/login', { correo, password }, 'POST')
    const body = await resp.json()

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(
        login({
          uid: body.usuario.uid,
          name: body.usuario.nombre
        })
      )
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

export const startLoginGoogle = (googleResponse) => {
  return async (dispatch) => {
    console.log(googleResponse.tokenId)
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
          name: body.usuario.nombre
        })
      )
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

export const startRegister = (values) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('usuarios', { ...values }, 'POST')
    const body = await resp.json()

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(
        login({
          uid: body.usuario.uid,
          name: body.usuario.nombre
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

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(
        login({
          uid: body.usuario.uid,
          name: body.usuario.nombre
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
    dispatch(logout())
  }
}

const logout = () => ({
  type: types.authLogout
})
