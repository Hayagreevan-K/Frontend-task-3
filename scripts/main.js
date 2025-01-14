const recipeList = document.getElementById("recipe-list");
const searchBar = document.getElementById("search-bar");
const recipeModal = document.getElementById("recipe-modal");
const recipeDetails = document.getElementById("recipe-details");
const closeButton = document.querySelector(".close-button");
const categoryFilters = document.getElementById("category-filters");

// Fetch and display recipes
fetch("data/recipes.json")
  .then(response => response.json())
  .then(data => {
    let recipes = data;

    const renderRecipes = (filteredRecipes) => {
      recipeList.innerHTML = "";
      filteredRecipes.forEach(recipe => {
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
    };

    const showRecipeDetails = (recipe) => {
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
    };

    closeButton.addEventListener("click", () => {
      recipeModal.classList.add("hidden");
    });

    categoryFilters.addEventListener("click", (e) => {
      const category = e.target.getAttribute("data-category");
      if (category === "All") {
        renderRecipes(recipes);
      } else {
        const filteredRecipes = recipes.filter(recipe => recipe.category === category);
        renderRecipes(filteredRecipes);
      }
    });

    searchBar.addEventListener("input", (e) => {
      const searchText = e.target.value.toLowerCase();
      const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchText) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchText)
        )
      );
      renderRecipes(filteredRecipes);
    });

    renderRecipes(recipes);
  })
  .catch(error => console.error("Error fetching recipes:", error));


