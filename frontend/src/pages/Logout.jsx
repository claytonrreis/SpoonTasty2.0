import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5932/api/spooners/logout",
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data?.message || error.message
      );
      alert(
        error.response?.data?.message || "An error occurred during logout."
      );
    }
  };

  // return <button onClick={handleLogout}>Logout</button>;
  // return <p onClick={handleLogout}>Logout</p>;
  return (
    <a onClick={handleLogout}>
      <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
    </a>
  );
};

export default Logout;
