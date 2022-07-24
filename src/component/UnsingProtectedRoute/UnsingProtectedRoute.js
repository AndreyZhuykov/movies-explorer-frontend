import { Navigate } from "react-router-dom";

const UnsingProtectedRoute = ({loggedIn, children}) => {
  
  return (
    loggedIn === false ? null :
    loggedIn ? <Navigate to="/movies"/> : children
  );
};

export default UnsingProtectedRoute;
