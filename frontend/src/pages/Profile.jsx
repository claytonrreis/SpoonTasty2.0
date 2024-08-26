import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put("http://localhost:5932/api/spooners/profile", {
        ...formData,
        token,
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Link to="/Dashboard">Dashboard</Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="New name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="New Email"
          onChange={handleChange}
        />
        <p></p>
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={handleChange}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
