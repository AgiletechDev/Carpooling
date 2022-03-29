import { Route, Routes } from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRoutes = () => {
  return (
    <div>
      <Routes>
        {/* <Route path='landing' element={<LandingScreen/>} /> */}
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
      </Routes>
    </div>
  );
};
