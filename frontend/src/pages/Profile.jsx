import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DeleteAccount from "./DeleteAccount";
import NBLogged from "../Componets/NBLogged/NBLogged";
import "../Styles/profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newPassword: "",
  });
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://spoontasty2-0.onrender.com/api/spooners/profile",
          {
            withCredentials: true,
          }
        );
        setUserData({
          name: response.data.name,
          email: response.data.email,
        });

        setFormData({
          name: "",
          email: "",
          newPassword: "",
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please log in again.");
          navigate("/login");
        } else {
          setError(
            error.response ? error.response.data.message : error.message
          );
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "https://spoontasty2-0.onrender.com/api/spooners/profile",
        formData,
        {
          withCredentials: true,
        }
      );
      alert("Profile updated successfully");

      const response = await axios.get(
        "https://spoontasty2-0.onrender.com/api/spooners/profile",
        {
          withCredentials: true,
        }
      );
      setUserData({
        name: response.data.name,
        email: response.data.email,
      });

      setFormData({
        name: "",
        email: "",
        newPassword: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        setError(error.response ? error.response.data.message : error.message);
      }
    }
  };

  return (
    <div>
      <NBLogged />
      <br />
      <div className="Profile-container">
        <h1>Profile Information</h1>
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="New name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="New Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <button type="submit">Update Profile</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

        <DeleteAccount />
      </div>
    </div>
  );
};

export default Profile;
