import { Route, Routes } from 'react-router-dom'
import { AppScreen } from '../components/dashboard/AppScreen'
import { ProfileScreen } from '../components/dashboard/ProfileScreen'

export const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/" element={<AppScreen />} />
      </Routes>
    </div>
  )
}
