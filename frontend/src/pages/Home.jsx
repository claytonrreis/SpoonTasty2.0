import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../Componets/NavBar/NavBar";

function Home() {
  return (
    <div>
      <NavBar />
      Home
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Sign up</Link>
    </div>
  );
}

export default Home;
