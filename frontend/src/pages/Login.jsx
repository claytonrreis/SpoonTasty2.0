import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/login.css";
import NavBar from "../Componets/NavBar/NavBar";

const Login = () => {
  const [formData, setFormData] = useState({ spoonerName: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting login with data:", formData);
      const response = await axios.post(
        "https://spoontasty2-0.onrender.com/api/spooners/login",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Login response:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div>
      <NavBar />
      <br />
      <div className="Login-container">
        <h1>Login</h1>
        <h2>Welcome back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="spoonerName"
              placeholder="Spooner Name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
          {/* {error && <p className="error-message">{error}</p>} */}
        </form>
        <p>
          Would you like to be part <br />
          of the SpoonTasty community?
        </p>
        <Link to="/signup">Sign up!</Link>
      </div>
      <br />
    </div>
  );
};

export default Login;
