import { Route, Routes } from 'react-router-dom';
import { HomeScreen } from '../components/HomeScreen';

export const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="home" element={<HomeScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </div>
  );
};
