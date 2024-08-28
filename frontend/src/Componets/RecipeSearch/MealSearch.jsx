import React, { useState } from "react";
import { searchMeals } from "./mealService";
import MealDetail from "./MealDetail";
import "./meal-search.css";

const MealSearch = () => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //if you have time create a systemm of fav recipes for each Spooner or so

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchMeals(query);
      setMeals(data.meals || []);
    } catch (error) {
      setError("Failed to fetch meals.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMeal = (mealId) => {
    const selected = meals.find((meal) => meal.idMeal === mealId);
    setSelectedMeal(selected);
  };

  return (
    <div className="meal-search-container">
      <h2>Meal Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for meals..."
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {selectedMeal ? (
        <MealDetail meal={selectedMeal} onBack={() => setSelectedMeal(null)} />
      ) : (
        <div>
          {meals.length > 0 ? (
            <ul>
              {meals.map((meal) => (
                <li key={meal.idMeal}>
                  <h3>{meal.strMeal}</h3>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    style={{ width: "100px" }}
                  />
                  <button onClick={() => handleSelectMeal(meal.idMeal)}>
                    View Recipe
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No meals found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MealSearch;
