import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../Componets/NavBar/NavBar";
import MealSearch from "../Componets/RecipeSearch/MealSearch";

function Home() {
  return (
    <div>
      <NavBar />
      <br />
      <div className="Dashboard-container">
        <h1>
          SpoonTasty <i className="fa-solid fa-spoon"></i>
        </h1>
        <h2>Welcome to our homepage!</h2>
        <p>
          Unlock a world of flavors with RecipeMaster! Explore a treasure trove
          of recipes, save your favorites, and effortlessly manage your grocery
          lists.
        </p>
        <p>
          <b>Join our community today</b> to start discovering, saving, and
          creating amazing dishes. Sign up now and turn every meal into a
          culinary adventure!
        </p>

        <div>
          {/* <h1>
            Welcome to the SpoonTasty <i className="fa-solid fa-spoon"></i>
          </h1> */}
        </div>
      </div>
      <br />
      <MealSearch />
      <br />
    </div>
  );
}

export default Home;
