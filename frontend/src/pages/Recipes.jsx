import React from "react";
import NBLogged from "../Componets/NBLogged/NBLogged";
import MealSearch from "../Componets/RecipeSearch/MealSearch";

function Recipes() {
  return (
    <div>
      <NBLogged />
      <br />
      <div className="Dashboard-container">
        <h1>Recipes</h1>
        {/* 
        <div>
          <h1>Welcome to the Dashboard</h1>
        </div> */}
      </div>
      <br />
      <MealSearch />
      <br />
    </div>
  );
}

export default Recipes;
