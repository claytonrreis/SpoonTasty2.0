import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  //   const handleLogout = async () => {
  //     try {
  //       await axios.post(
  //         "http://localhost:5932/api/spooners/logout",
  //         {},
  //         { withCredentials: true }
  //       );
  //       navigate("/");
  //     } catch (error) {
  //       console.error(error.response.data.message);
  //     }
  //   };

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setLoading(true);
      try {
        await axios.post(
          "http://localhost:5932/api/spooners/logout",
          {},
          { withCredentials: true }
        );
        navigate("/");
      } catch (error) {
        console.error(
          "Logout error:",
          error.response ? error.response.data.message : error.message
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {/* <button onClick={handleLogout}>Logout</button>; */}
      <button onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default Logout;
