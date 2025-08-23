import React from 'react'
import Navbar from './components/nav-bar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Cart from './pages/Cart/cart'
import PlaceOrder from './pages/place-order/placeOrder'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import Verify from './pages/verify/verify'
import Myorders from './pages/MyOrders/Myorders'


const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  return (
   <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        < Route path='/' element={<Home />} />
        < Route path='/cart' element={<Cart />} />
        < Route path='/order' element={<PlaceOrder />}/>
        <Route path='verify' element={<Verify/>}/>
        <Route path='/myorders' element={<Myorders/>}/>
      </Routes>
    </div>
    <Footer />
    </>
    
  )
}

export default App
