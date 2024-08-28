import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/delete-account.css";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await axios.delete(
          "https://spoontasty2-0.onrender.com/api/spooners/delete-account",
          { withCredentials: true }
        );
        navigate("/login");
      } catch (error) {
        console.error(
          "Delete account error:",
          error.response ? error.response.data.message : error.message
        );
      }
    }
  };

  return (
    <button className="DeleteAccount-button" onClick={handleDeleteAccount}>
      Delete Account
    </button>
  );
};

export default DeleteAccount;
