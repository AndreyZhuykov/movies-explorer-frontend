import { Navigate } from "react-router-dom";

const ProtectedRoute = ({loggedIn, children, navigaite}) => {
  
  return (
    loggedIn ? children : <Navigate to={navigaite}/>
  );
};

export default ProtectedRoute;
