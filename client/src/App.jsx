import './App.css'
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";

import HomePage from './HomePage/HomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
      </Routes>
    </>
  )
}

export default App
