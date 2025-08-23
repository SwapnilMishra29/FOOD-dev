import React from 'react'
import "./cart.css"
import { useContext,useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import LoginPopUp from '../../components/LoginPopUp/LoginPopUp'

const Cart = () => {

  const {cartItems, food_list, removeFromCart, getTotalCartAmount,url,token} = useContext(StoreContext);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  if (!token) {
    return (
      <div className="cart-login-message">
        <h2>Please login to access your cart</h2>
        <button onClick={() => setShowLogin(true)}>Login</button>
        {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      </div>
    );
  }

  return (
    <div>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Tota</p>
            <p>Remove</p>
          </div>
          <br></br>
          <hr></hr>
          {food_list.map((item, index)=>{
            if(cartItems[item._id]>0){


              return (
                <div>
                  <div className="cart-item-title cart-item-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price*cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>X</p>
                </div>
                <hr/>

                </div>
                
              )
            }
          })}
        </div>
      </div>
      <div className="card-bottom">
        <div className="card-total">
          <h2>Card Totals</h2>
          <div>
            <div className="card-total-detils">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr></hr>
            <div className="card-total-detils">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr></hr>
            <div className="card-total-detils">
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code enter here</p>
            <div className="card-promocode-input">
              <input type="text" placeholder='promo code'></input>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Cart
