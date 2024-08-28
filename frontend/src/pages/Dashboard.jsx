import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NBLogged from "../Componets/NBLogged/NBLogged";
import GroceryList from "./GroceryList";
import GroceryForm from "./GroceryForm";
import "../Styles/dashboard.css";

const Dashboard = () => (
  <div>
    <NBLogged />
    <br />

    <div className="Dashboard-container">
      <h1>Dashboard</h1>

      <div>
        <h1>Welcome to the Dashboard</h1>
      </div>
    </div>
    <br />
    <GroceryForm />
    <br />
    <GroceryList />
    <br />
  </div>
);
export default Dashboard;
