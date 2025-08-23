import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import './Myorders.css'
import { assets } from '../../assets/assets';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Myorders = () => {
  const {url,token} = useContext(StoreContext);
  const [data,setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
    setData(response.data.data);
    console.log(response.data.data); // fixed typo here
  }

  useEffect(()=>{
    if (token) {
      fetchOrders();
    }
  },[token])

  return (
    <div className='my-orders'>
      <h2>My orders</h2>
      <div className="container">
        {data.map((order,index)=>{
          return ( // <-- added return here
            <div key={index} className='my-orders-order'>
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item,idx)=>{
                  if(idx === order.items.length-1){
                    return item.name+" X "+item.quantity;
                  }
                  else {
                    return item.name+" X "+item.quantity+", "
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span><b>{order.status}</b></p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Myorders
