import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    spoonerName: "", // Update to match the backend field name
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name" // Ensure this matches the backend field name
        placeholder="Enter your name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="spoonerName" // Ensure this matches the backend field name
        placeholder="Choose a Spooner Name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter your Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Choose a Password"
        onChange={handleChange}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
