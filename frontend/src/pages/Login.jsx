import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ spoonerName: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post(
    //     "http://localhost:5932/api/spooners/login",
    //     formData
    //   );
    //   localStorage.setItem("token", response.data.token);
    //   navigate("/dashboard");
    // } catch (error) {
    //   console.error(error.response.data.message);
    // }
    try {
      await axios.post("http://localhost:5932/api/spooners/login", formData, {
        withCredentials: true, // This is necessary to include cookies in the request
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="spoonerName"
        placeholder="Spooner Name"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
