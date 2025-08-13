import './App.css'
<<<<<<< HEAD
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";

import HomePage from './HomePage/HomePage';

=======
import ProductPage from './productPage/ProductPage'
>>>>>>> 748145c (product Page is created)
function App() {
  return (
    <>
<<<<<<< HEAD
      <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
      </Routes>
=======
     <ProductPage/>
>>>>>>> 748145c (product Page is created)
    </>
  )
}

export default App
