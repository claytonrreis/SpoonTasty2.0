import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import NBLogged from "../Componets/NBLogged/NBLogged";
import GroceryList from "./GroceryList";
import GroceryForm from "./GroceryForm";
import "../Styles/dashboard.css";

const Dashboard = () => (
  <div>
    <NBLogged />
    <div className="Dashboard-container">
      <h1>Dashboard</h1>

      <div>
        <h1>Welcome to the Dashboard</h1>
        <Link to="/profile">Go to Profile</Link>
        <br />
        <Logout />
        <br />
        <GroceryForm />
        <GroceryList />
      </div>
    </div>
  </div>
);
export default Dashboard;
