import './App.css'
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";

import HomePage from './HomePage/HomePage';

import ProductPage from './productPage/ProductPage'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
      </Routes>
     <ProductPage/>
    </>
  )
}

export default App
