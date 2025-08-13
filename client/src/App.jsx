import './App.css'
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";

import HomePage from './HomePage/HomePage';
import Signin from './Components/Signin/Signin';
import Login from './Components/Signin/Login';
import Navbar from './Components/Navbar/Navbar';

function App() {

  return (
 
 <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
        <Route path='/welcome' element={<Signin></Signin>} ></Route>
        <Route path='/login' element={<Login></Login>} ></Route>
      </Routes>
    </>
  )
}

export default App
