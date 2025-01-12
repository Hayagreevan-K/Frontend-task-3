// Elements
const recipeList = document.getElementById("recipe-list");
const searchBar = document.getElementById("search-bar");
const recipeModal = document.getElementById("recipe-modal");
const recipeDetails = document.getElementById("recipe-details");
const closeButton = document.querySelector(".close-button");

// Function to display recipes
function displayRecipes(recipesToDisplay) {
  recipeList.innerHTML = "";
  recipesToDisplay.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}">
      <h3>${recipe.name}</h3>
      <p>${recipe.description}</p>
    `;
    card.addEventListener("click", () => showRecipeDetails(recipe));
    recipeList.appendChild(card);
  });
}

// Function to show recipe details
function showRecipeDetails(recipe) {
  recipeDetails.innerHTML = `
    <h2>${recipe.name}</h2>
    <img src="${recipe.image}" alt="${recipe.name}">
    <p><strong>Category:</strong> ${recipe.category}</p>
    <p><strong>Cooking Time:</strong> ${recipe.cookingTime}</p>
    <h3>Ingredients</h3>
    <ul>${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}</ul>
    <h3>Instructions</h3>
    <p>${recipe.instructions}</p>
  `;
  recipeModal.classList.remove("hidden");
}

// Close modal on button click
closeButton.addEventListener("click", () => {
  recipeModal.classList.add("hidden");
});

// Fetch recipes from JSON and initialize
fetch('data/recipes.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }
    return response.json();
  })
  .then(data => {
    displayRecipes(data);

    // Search functionality
    searchBar.addEventListener("input", e => {
      const searchText = e.target.value.toLowerCase();
      const filteredRecipes = data.filter(recipe =>
        recipe.name.toLowerCase().includes(searchText) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchText)
        )
      );
      displayRecipes(filteredRecipes);
    });
  })
  .catch(error => console.error("Error fetching recipes:", error));
