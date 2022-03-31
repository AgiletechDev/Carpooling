import { Route, Routes } from 'react-router-dom'
import { AppScreen } from '../components/dashboard/AppScreen'

export const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppScreen />} />
      </Routes>
    </div>
  )
}
