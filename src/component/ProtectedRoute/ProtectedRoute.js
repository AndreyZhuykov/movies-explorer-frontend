import { Navigate } from "react-router-dom";

const ProtectedRoute = ({loggedIn, children}) => {
  
  return (
    loggedIn === false ? null :
    loggedIn ? children : <Navigate to="/"/>
  );
};

export default ProtectedRoute;
