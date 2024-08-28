import React from "react";
import GroceryList from "./GroceryList";
import GroceryForm from "./GroceryForm";
import NBLogged from "../Componets/NBLogged/NBLogged";

function SpoonerGLists() {
  return (
    <div>
      <NBLogged />
      <br />
      <GroceryForm />
      <br />
      <GroceryList />
      <br />
    </div>
  );
}

export default SpoonerGLists;
