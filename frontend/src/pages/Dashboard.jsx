import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import NBLogged from "../Componets/NBLogged/NBLogged";

const Dashboard = () => (
  <div>
    <NBLogged />
    <h1>Dashboard</h1>

    <div>
      <h1>Welcome to the Dashboard</h1>
      <Link to="/profile">Go to Profile</Link>
      <br />
      <Logout />
    </div>
  </div>
);

export default Dashboard;
