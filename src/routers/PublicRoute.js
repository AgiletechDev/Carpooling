import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ({ children }) => {
  
  const { id: uid } = useSelector((state) => state.auth)
  console.log(uid)
  return !!uid ? <Navigate to="/" /> : children
}
