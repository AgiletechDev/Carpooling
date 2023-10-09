import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { startChecking } from '../actions/auth'
import { Appbar } from '../components/appbar/Appbar'
import { HomeScreen } from '../components/HomeScreen'
import { AuthRoutes } from './AuthRoutes'
import { DashboardRoutes } from './DashboardRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
  const dispatch = useDispatch()
  // const { checking } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])

  /* if (checking) {
    return <h5>Espere...</h5>
  } */

  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route
          path="/home"
          element={
            <PublicRoute>
              <HomeScreen />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/*"
          element={
            <PublicRoute>
              <AuthRoutes />
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DashboardRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
