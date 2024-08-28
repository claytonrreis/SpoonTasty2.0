import React from "react";
import "./meal-detail.css";

const MealDetail = ({ meal, onBack }) => {
  return (
    <div className="meal-detail">
      <button onClick={onBack}>Back to Search</button>
      <h2>{meal.strMeal}</h2>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>Ingredients:</h3>
      <ul>
        {Object.keys(meal)
          .filter((key) => key.startsWith("strIngredient") && meal[key])
          .map((ingredientKey, index) => (
            <li key={index}>
              {meal[ingredientKey]} - {meal[`strMeasure${index + 1}`]}
            </li>
          ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{meal.strInstructions}</p>
      <a href={meal.strSource} target="_blank" rel="noopener noreferrer">
        View Recipe Source
      </a>
    </div>
  );
};

export default MealDetail;
