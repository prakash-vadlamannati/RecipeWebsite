import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./searchbar";
import RecipeCard from "./recipycard";
import Pagination from "./pagination";

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function Recipe() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  useEffect(() => {
    if (query) {
      searchRecipes();
    }
  }, [query, currentPage]);

  const searchRecipes = async () => {
    setIsLoading(true);
    const url = searchApi + query;
    const res = await fetch(url);
    const data = await res.json();
    setRecipes(data.meals || []);
    setIsLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    searchRecipes();
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2>Our Food Recipes</h2>
      <SearchBar
        isLoading={isLoading}
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
      />
      <div className="recipes">
        {isLoading ? (
          <p>Weight for the result</p>
        ) : currentRecipes.length ? (
          currentRecipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p>Enter the recipy</p>
        )}
      </div>
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Recipe;
