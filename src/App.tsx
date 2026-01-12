import { useState } from "react";
import Home from './pages/Home.js'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import Product from "./pages/Product.tsx";

function App() {
const [searchValue, setSearchValue] = useState('');
const [searchCuisine, setSearchCuisine] = useState('');
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Home
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchCuisine={searchCuisine}
            setSearchCuisine = {setSearchCuisine}
          />}
        />
        <Route path='/recipe/:id' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
