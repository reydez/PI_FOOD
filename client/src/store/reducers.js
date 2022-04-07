const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  recipe: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RECIPE":
      return {
        ...state,
        recipe: action.payload,
      };
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case "GET_RECIPES_BY_TITLE":
      return {
        ...state,
        recipes: action.payload,
      };
    case "GET_RECIPE_DETAIL":
      return {
        ...state,
        recipe: action.payload,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "SORT_BY_DIET":
      const filtered =
        action.payload === "All"
          ? state.allRecipes
          : state.allRecipes.filter(
              (recipe) => recipe.diets.indexOf(action.payload) >= 0
            );
      return {
        ...state,
        recipes: filtered,
      };

    case "SORT_BY_ALPHABET":
      var sortedByAZ = state.recipes.slice();

      if (action.payload === "ASC") {
        sortedByAZ.sort((a, b) => {
          var textoA = a.title.toUpperCase();
          var textoB = b.title.toUpperCase();
          return textoA > textoB ? 1 : textoA < textoB ? -1 : 0;
        });
      } else if (action.payload === "DESC") {
        sortedByAZ.sort((a, b) => {
          var textoA = a.title.toUpperCase();
          var textoB = b.title.toUpperCase();
          return textoA > textoB ? -1 : textoA < textoB ? 1 : 0;
        });
      }

      return {
        ...state,
        recipes: sortedByAZ,
      };

    case "SORT_BY_PUNTOS":
      var sortByPoints = state.recipes.slice();

      if (action.payload === "BIGFIRST") {
        sortByPoints.sort((a, b) => {
          return b.healthScore - a.healthScore;
        });
      } else if (action.payload === "LOWFIRST") {
        sortByPoints.sort((a, b) => {
          return a.healthScore - b.healthScore;
        });
      }

      return {
        ...state,
        recipes: sortByPoints,
      };
    default:
      return state;
  }
};

export default rootReducer;
