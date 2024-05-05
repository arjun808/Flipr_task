

import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
    const token=localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
  
  

  if (token !== null) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoute
