import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth'

export const AppScreen = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(startLogout())
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
