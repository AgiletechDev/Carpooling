import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes';
import { DashboardRoutes } from './DashboardRoutes';
//import { PrivateRoute } from './PrivateRoute';
//import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            // <PublicRoute>
            <AuthRoutes />
            // </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            // <PrivateRoute>
            <DashboardRoutes />
            // </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
