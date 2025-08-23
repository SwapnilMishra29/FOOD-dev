import React, { useContext,useState } from 'react'
import "./placeOrder.css"
import { StoreContext } from '../../Context/StoreContext'
import axios  from 'axios'


const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
  const [data,setData] = useState ({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

const placeOrder = async (event) => {
  event.preventDefault();
  let orderItems = [];

  food_list.forEach((item) => {
    if (cartItems[item._id] > 0) {
      let itemInfo = { ...item, quantity: cartItems[item._id] };
      orderItems.push(itemInfo);
    }
  });

  let orderData = {
   
    address: data,
    items: orderItems,
    amount: getTotalCartAmount() + 2,
  };

  try {
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url, session_id } = response.data;
      localStorage.setItem("session_id", session_id);
      window.location.replace(session_url);
    } else {
      alert("Order placement failed");
      console.error(response.data);
    }
  } catch (err) {
    console.error("Error placing order:", err);
    alert("Something went wrong while placing your order");
  }
};

  
  return (
      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-oder-left">
           <p className="title">Delivery Information</p>
           <div className="multi-fields">
            <input required
            name="firstName" 
            onChange={onChangeHandler}
            value={data.firstName} 
            type="text" 
            placeholder='First Name'/>
            <input required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text" 
            placeholder='Last Name'/>
           </div>
          <input required
          name="email"
            onChange={onChangeHandler}
            value={data.email} 
          type="email" 
          placeholder='Email Address'/>
          <input required
          name="street"
            onChange={onChangeHandler}
            value={data.street}
          type="text" 
          placeholder='Street'/>
          <div className='multi-fields'>
            <input required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text" 
            placeholder='City'/>
            <input required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text" 
            placeholder='State'/>
          </div>
           <div className="multi-fields">
            <input required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text" 
            placeholder='Zip code'/>
            <input 
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text" 
            placeholder='Country'/>
           </div>
           <input required
           name="phone"
            onChange={onChangeHandler}
            value={data.phone}
           type="text" 
           placeholder='Phone'/>
          </div>
          <div className="place-order-right">
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
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
             
          </div>
      </form>
  )
}

export default PlaceOrder
