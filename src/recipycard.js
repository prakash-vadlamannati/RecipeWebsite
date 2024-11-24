import React from "react";
import "./App";

const RecipeCard = ({ recipe }) => {
  const handleCardClick = () => {
    window.open(`https://www.google.com/search?q=${recipe.strMeal}`, "_blank");
  };

  return (
    <div className="recipe-card" onClick={handleCardClick}>
      <h3>{recipe.strMeal}</h3>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p>Rating: {recipe.strRating || "currently no"}</p>
    </div>
  );
};

export default RecipeCard;
