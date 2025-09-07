import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function CaptainLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/captain/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/captain-login"); 
      }
    })
    .catch((error) => { 
      console.error("Logout failed:", error);
      navigate("/captain-login");
    });
  }, [navigate]);

  return <p>Logging out...</p>;
}