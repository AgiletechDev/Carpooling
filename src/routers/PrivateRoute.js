import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children }) => {
  const { uid } = useSelector((state) => {
    console.log(state.auth)
    return state.auth
  })
  console.log('priv', uid)
  return !!uid ? children : <Navigate to="/home" />
}
