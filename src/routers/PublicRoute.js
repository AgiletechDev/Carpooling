import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const { uid } = useSelector((state) => state.auth);

  return !!uid ? <Navigate to="/" /> : children;
};
