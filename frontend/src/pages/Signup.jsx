import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/signup.css";
import NavBar from "../Componets/NavBar/NavBar";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    spoonerName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5932/api/spooners/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error(
          "Error:",
          error.response.data.message || "An error occurred"
        );
        alert(
          error.response.data.message ||
            "An error occurred during registration."
        );
      } else if (error.request) {
        console.error("Error Request:", error.request);
        alert("No response received from the server.");
      } else {
        console.error("Error Message:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <br />
      <div className="Signup-container">
        <h1>Sign Up</h1>
        <h2>Welcome!</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="spoonerName"
              placeholder="Choose a Spooner Name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Choose a Password"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input id="Terms" type="checkbox" required />
            <label htmlFor="Terms">I accept the terms & conditions.</label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        {/* {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>} */}
        <p>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
      <br />
    </div>
  );
};

export default Signup;
