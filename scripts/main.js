// Sample data for recipes
const recipes = [
  {
    id: 1,
    name: "Pancakes",
    category: "Breakfast",
    description: "Fluffy pancakes with syrup.",
    image: "images/pancakes.jpg",
    ingredients: ["Flour", "Milk", "Eggs", "Butter"],
    instructions: "Mix ingredients and cook on a skillet for 2 minutes each side.",
    cookingTime: "15 minutes"
  },
  {
    id: 2,
    name: "Spaghetti Bolognese",
    category: "Lunch",
    description: "Classic Italian pasta dish.",
    image: "images/spaghetti.jpg",
    ingredients: ["Spaghetti", "Tomato Sauce", "Ground Beef"],
    instructions: "Cook spaghetti and prepare sauce. Combine and serve hot.",
    cookingTime: "30 minutes"
  },
  {
    id: 3,
    name: "Chocolate Cake",
    category: "Dessert",
    description: "Rich and moist chocolate cake.",
    image: "images/chocolate_cake.jpg",
    ingredients: ["Flour", "Cocoa", "Sugar", "Eggs"],
    instructions: "Bake at 350°F for 25 minutes. Cool and serve.",
    cookingTime: "1 hour"
  }
];

// Elements
const recipeList = document.getElementById("recipe-list");
const searchBar = document.getElementById("search-bar");
const recipeModal = document.getElementById("recipe-modal");
const recipeDetails = document.getElementById("recipe-details");
const closeButton = document.querySelector(".close-button");

// Display recipes
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

// Show recipe details
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

// Close modal
closeButton.addEventListener("click", () => {
  recipeModal.classList.add("hidden");
});

// Search functionality
searchBar.addEventListener("input", e => {
  const searchText = e.target.value.toLowerCase();
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchText) ||
    recipe.ingredients.some(ingredient =>
      ingredient.toLowerCase().includes(searchText)
    )
  );
  displayRecipes(filteredRecipes);
});

// Initialize
displayRecipes(recipes);

fetch('data/recipes.json')
  .then(response => response.json())
  .then(data => {
    displayRecipes(data);

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
  .catch(error => console.error('Error fetching recipes:', error));
