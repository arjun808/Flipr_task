import React from 'react'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import AdminPanel from './Pages/AdminHome'
function App() {
  const token=localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
  return (
    <Router>
    <Routes>
    {!token && <Route path='/' element={<Login/>}/>}
  <Route path='/login' element={<Login/>}/>
<Route path='/signup' element={<Signup/>}/>

<Route path='/admin'
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
    </Routes>

    </Router>
  )
}

export default App