import React, { useContext, useEffect } from 'react';
import './verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const sessionId = localStorage.getItem("session_id");
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId, sessionId });
      console.log("Verify Response:", response.data);

      if (response.data.success) {
        toast.success("✅ Payment successful! Order placed.", { autoClose: 3000 });
        setTimeout(() => {
          navigate("/myorders");
        }, 3000);
      } else {
        toast.error("❌ Payment failed! Order canceled.", { autoClose: 3000 });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("⚠️ Something went wrong! Try again.", { autoClose: 3000 });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <ToastContainer />
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
