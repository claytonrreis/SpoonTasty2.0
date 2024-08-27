import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
          "http://localhost:5932/api/spooners/delete-account",
          { withCredentials: true } // Ensure cookies are included in the request
        );
        navigate("/login"); // Redirect to login page after deletion
      } catch (error) {
        console.error(
          "Delete account error:",
          error.response ? error.response.data.message : error.message
        );
      }
    }
  };

  return <button onClick={handleDeleteAccount}>Delete Account</button>;
};

export default DeleteAccount;
