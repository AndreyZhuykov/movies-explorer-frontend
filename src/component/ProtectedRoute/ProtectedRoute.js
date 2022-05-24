import { Navigate } from "react-router-dom";

const ProtectedRoute = ({loggedIn, children}) => {
  return loggedIn ? children : <Navigate to="/movies" />;
};

export default ProtectedRoute;
